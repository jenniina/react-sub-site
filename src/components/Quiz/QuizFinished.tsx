import {
  useEffect,
  useState,
  FormEvent,
  lazy,
  Suspense,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IQuizHighscore } from "./types";
import { ELanguages, ReducerProps } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addQuiz, getUserQuiz, deleteDuplicates } from "./reducers/quizReducer";
import { initializeUser } from "../../reducers/authReducer";
import { createUser } from "../../reducers/usersReducer";
import { notify } from "../../reducers/notificationReducer";
import styles from "../../components/Quiz/css/quiz.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";

const LoginRegisterCombo = lazy(
  () => import("./components/LoginRegisterCombo")
);

interface Props {
  language: ELanguages;
}

const QuizFinished = ({ language }: Props) => {
  const { t } = useContext(LanguageContext)!;

  const { points, highscores, finalSeconds } = useSelector(
    (state: ReducerProps) => state.questions
  );
  const { mode } = useSelector((state: ReducerProps) => state.difficulty);

  const percentage = +((points * 100) / 300).toFixed(1);
  const navigate = useNavigate();

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const sec = finalSeconds % 60;
  const mins = Math.floor(finalSeconds / 60);

  const dispatch = useAppDispatch();

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user;
  });

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    if (finalSeconds === 0) {
      navigate("/portfolio/quiz");
    }
  }, []);

  useEffect(() => {
    if (
      (!user && points !== 0 && finalSeconds !== 0) ||
      finalSeconds === undefined
    )
      localStorage.setItem(`quiz-highscores`, JSON.stringify(highscores));
    if (
      (user?._id && points !== 0 && finalSeconds !== 0) ||
      (user?._id && finalSeconds !== undefined)
    ) {
      dispatch(getUserQuiz(user._id)).then((r) => {
        if (r === null) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...highscores,
              [mode]: { score: points, time: finalSeconds },
            },
            user: user._id,
          };
          dispatch(notify(t("NewHighscore"), false, 3));

          dispatch(addQuiz(quizScore)).then((r) => {
            //console.log('r1: ', r)
            dispatch(deleteDuplicates(user._id)).then((r) => {
              //console.log('r5: ', r)
            });
          });
        } else if (r !== null && r.highscores[mode].score <= points) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...r.highscores,
              [mode]: { score: points, time: r.highscores[mode].time },
            },
            user: user._id,
          };

          if (r.highscores[mode].score < points) {
            dispatch(notify(t("NewHighscore"), false, 3));
            quizScore.highscores[mode].time = finalSeconds; // Update time if new score is higher
          } else if (
            r.highscores[mode].score === points &&
            r.highscores[mode].time > finalSeconds
          ) {
            dispatch(notify(t("FasterThanBefore"), false, 3));
            quizScore.highscores[mode].time = finalSeconds; // Update time if score is equal and time is faster
          }

          dispatch(addQuiz(quizScore)).then((r) => {
            //console.log('r2: ', r)
          });
        }
      });
    }
  }, []);

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(notify(t("PasswordsDoNotMatch"), true, 8));
      return;
    }
    dispatch(createUser({ name, username, password, language: "en" }))
      .then(async () => {
        dispatch(notify(t("RegistrationSuccesful"), false, 8));
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.data?.message)
          dispatch(notify(err.response.data.message, true, 8));
        else dispatch(notify(`${t("Error")}: ${err.message}`, true, 8));
      });
  };

  let congrats;

  switch (true) {
    case percentage === 100:
      congrats = t("Perfect");
      break;
    case percentage >= 80 && percentage < 100:
      congrats = t("Excellent");
      break;
    case percentage >= 50 && percentage < 80:
      congrats = t("GoodJob");
      break;
    case percentage >= 0 && percentage < 50:
      congrats = t("BadLuck");
      break;
    default:
      congrats = "";
  }

  useEffect(() => {
    const loginWrapOpen = document.querySelector(
      ".login-wrap .open"
    ) as HTMLButtonElement;
    const loginWrapClose = document.querySelector(
      ".login-wrap .close"
    ) as HTMLButtonElement;
    const registerWrapOpen = document.querySelector(
      ".register-wrap .open"
    ) as HTMLButtonElement;
    const registerWrapClose = document.querySelector(
      ".register-wrap .close"
    ) as HTMLButtonElement;

    loginWrapOpen?.addEventListener("click", () => {
      setLoginOpen(true);
    });
    loginWrapClose?.addEventListener("click", () => {
      setLoginOpen(false);
    });
    registerWrapOpen?.addEventListener("click", () => {
      setRegisterOpen(true);
    });
    registerWrapClose?.addEventListener("click", () => {
      setRegisterOpen(false);
    });
  }, []);

  const goToMainPage = () => {
    navigate("/portfolio/quiz");
  };

  return (
    <>
      {finalSeconds !== 0 && (
        <>
          <section className={`card ${styles.top}`}>
            <div>
              <div className={`${styles.quiz}`}>
                <h1 className={styles.h1}>
                  <a href="#" onClick={goToMainPage}>
                    &laquo;&nbsp;{t("QuizApp")}
                  </a>
                </h1>
                <h2>{congrats}</h2>
                <p className="result">
                  {t("YouScored")} <strong>{points}</strong>{" "}
                  {t("OutOf300Points")} ({percentage}%)
                </p>
                <p>
                  {t("Difficulty")}:{" "}
                  {(() => {
                    switch (mode) {
                      case "easy":
                        return t("Easy");
                      case "medium":
                        return t("Medium");
                      case "hard":
                        return t("Hard");
                      default:
                        return mode;
                    }
                  })()}
                </p>
                <p>
                  {finalSeconds === 0 ? (
                    <>
                      {t("Speed")}: {t("NA")}
                    </>
                  ) : (
                    <>
                      {t("Speed")}: {mins < 10 && "0"}
                      {mins}:{sec < 10 && "0"}
                      {sec}
                    </>
                  )}
                </p>
                <p className="highscore">
                  ({t("Highscore")}: {highscores[mode].score} {t("Points")})
                </p>
                <div className={`${styles.reset}`}>
                  <button
                    className="btn"
                    onClick={() => navigate(`/portfolio/quiz`)}
                  >
                    {t("BackToMenu")}
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      navigate(`/portfolio/quiz/difficulty/${mode}`)
                    }
                  >
                    {t("TryAgain")}
                  </button>
                </div>
              </div>
              <Suspense
                fallback={
                  <div className="flex center margin0auto textcenter">
                    {t("Loading")}...
                  </div>
                }
              >
                <LoginRegisterCombo
                  language={language}
                  user={user}
                  highscoresLocal={highscores}
                  text="quizfinish"
                />
              </Suspense>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default QuizFinished;
