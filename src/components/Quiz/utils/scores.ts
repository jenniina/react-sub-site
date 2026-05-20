import { IHighscore } from '../types'

export const QUIZ_QUESTION_COUNT = 20
export const QUIZ_POINTS_PER_CORRECT = 5
export const QUIZ_MAX_SCORE = 100
export const QUIZ_DEFAULT_TIME = 280
const QUIZ_LEGACY_MAX_SCORE = 300

interface StoredQuizHighscores {
  highscores: IHighscore
  scoreScale?: number
}

const defaultQuizHighscoreEntry = {
  score: 0,
  time: QUIZ_DEFAULT_TIME,
}

export const defaultQuizHighscores: IHighscore = {
  easy: { ...defaultQuizHighscoreEntry },
  medium: { ...defaultQuizHighscoreEntry },
  hard: { ...defaultQuizHighscoreEntry },
}

const roundQuizScore = (score: number): number => Math.round(score)

const getStoredScoreScale = (
  highscores?: Partial<IHighscore> | null,
  scoreScale?: number
): number => {
  if (typeof scoreScale === 'number') {
    return scoreScale
  }

  const scores = [
    highscores?.easy?.score,
    highscores?.medium?.score,
    highscores?.hard?.score,
  ]

  return scores.some((score) => (score ?? 0) > QUIZ_MAX_SCORE)
    ? QUIZ_LEGACY_MAX_SCORE
    : QUIZ_MAX_SCORE
}

export const formatQuizScore = (score: number): string =>
  String(roundQuizScore(score))

export const normalizeQuizStoredScore = (
  score: number,
  scoreScale: number = QUIZ_MAX_SCORE
): number => {
  if (scoreScale === QUIZ_MAX_SCORE) {
    return roundQuizScore(score)
  }

  return roundQuizScore((score / scoreScale) * QUIZ_MAX_SCORE)
}

export const normalizeQuizHighscores = (
  highscores?: Partial<IHighscore> | null,
  scoreScale?: number
): IHighscore => {
  const resolvedScoreScale = getStoredScoreScale(highscores, scoreScale)

  return {
    easy: {
      ...defaultQuizHighscores.easy,
      ...(highscores?.easy ?? {}),
      score: normalizeQuizStoredScore(
        highscores?.easy?.score ?? defaultQuizHighscores.easy.score,
        resolvedScoreScale
      ),
    },
    medium: {
      ...defaultQuizHighscores.medium,
      ...(highscores?.medium ?? {}),
      score: normalizeQuizStoredScore(
        highscores?.medium?.score ?? defaultQuizHighscores.medium.score,
        resolvedScoreScale
      ),
    },
    hard: {
      ...defaultQuizHighscores.hard,
      ...(highscores?.hard ?? {}),
      score: normalizeQuizStoredScore(
        highscores?.hard?.score ?? defaultQuizHighscores.hard.score,
        resolvedScoreScale
      ),
    },
  }
}

export const parseQuizHighscores = (value: string): IHighscore | null => {
  const parsed = JSON.parse(value) as IHighscore | StoredQuizHighscores

  if ('highscores' in parsed) {
    return normalizeQuizHighscores(parsed.highscores, parsed.scoreScale)
  }

  return normalizeQuizHighscores(parsed)
}
