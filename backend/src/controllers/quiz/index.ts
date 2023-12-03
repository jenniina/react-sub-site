import { Response, Request } from 'express'
import { Quiz } from '../../models/quiz'
import { IQuiz } from '../../types'

const getQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await Quiz.find()
    res.status(200).json({ quizzes })
  } catch (error) {
    throw error
  }
}

const getUserQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, type } = req.params
    const quiz = await Quiz.findOne({ user: id, type: type })
    res.status(200).json(quiz)
  } catch (error) {
    throw error
  }
}

const addQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IQuiz, 'highscore' | 'type' | 'user'>
    console.log('body: ', body)

    const existingQuiz = (await Quiz.findOne({
      user: body.user,
      type: body.type,
    })) as IQuiz
    console.log('existingQuiz: ', existingQuiz)
    if (!existingQuiz) {
      const quiz = new Quiz({
        highscore: body.highscore,
        type: body.type,
        user: body.user,
      }) as IQuiz

      const newQuiz: IQuiz = await quiz.save()
      console.log('newQuiz: ', newQuiz)

      res.status(201).json({ message: 'Quiz added', quiz: newQuiz })
    } else if (!body.type || !body.user) {
      res.status(400).json({ message: 'type and user fields are required' })
    } else {
      existingQuiz.highscore = body.highscore
      existingQuiz.type = body.type
      existingQuiz.user = body.user
      try {
        const updatedQuiz: IQuiz = await existingQuiz.save()
        console.log('updatedQuiz: ', updatedQuiz)
        res.status(200).json({ message: 'Quiz updated', quiz: updatedQuiz })
      } catch (validationError) {
        console.error(validationError)
        res.status(400).json({ message: 'Quiz not updated', error: validationError })
      }
    }
  } catch (error) {
    throw error
  }
}

// const updateQuiz = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       params: { id },
//       body,
//     } = req
//     // const updateQuiz: IQuiz | null = await Quiz.findByIdAndUpdate({ _id: id }, body)
//     // const allQuiz: IQuiz[] = await Quiz.find()
//     // res.status(200).json({
//     //   message: 'Quiz updated',
//     //   quiz: updateQuiz,
//     //   quizzes: allQuiz,
//     // })

//     const quiz = await Quiz.findOneAndUpdate({ user: body.user, type: body.type })
//     if (!quiz) {
//       throw new Error('Quiz not found')
//     }
//     quiz.highscore = body.highscore
//     await quiz.save()
//     console.log(quiz)
//     res.status(200).json({ message: 'Quiz updated', quiz })
//   } catch (error) {
//     throw error
//   }
// }

export { getQuizzes, getUserQuiz, addQuiz }