import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useKviz } from "../../Context/Kviz";
import Header from "../Header/Header";
import "./KvizPage.scss";

export default function KvizPage() {
  const { kvizData } = useKviz() as any;
  const [question, setQuestion] = useState({}) as any;
  const [explanation, setExplanation] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [answerArray, setAnswerArray] = useState([]) as any;
  const [disabled, setDisabled] = useState(false);
  const [currentClass, setCurrentClass] = useState(5);
  const [currentSchoolSubject, setCurrentSchoolSubject] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [corect, setCorect] = useState(0);
  const [incorect, setIncorect] = useState(0);

  function getQuestion(grade: number, schoolSubject: string, lesson: string) {
    axios(`http://localhost:3000/api/getQuestion`, {
      data: {
        grade: grade,
        schoolSubject: schoolSubject,
        lessons: lesson,
      },
      method: "POST",
    }).then((response) => {
      setQuestion(response.data);
      setDisabled(false);
      const answer = [
        response.data.corectAnswer,
        response.data.incorectAnswer_1,
        response.data.incorectAnswer_2,
        response.data.incorectAnswer_3,
      ];
      setAnswerArray(shuffleArray(answer));
    });
  }
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function corectAnswer(item: any) {
    if (question.corectAnswer === item) {
      setWrongAnswer(false);
      setExplanation(true);
      setDisabled(true);
      setCorect((prev) => prev + 1);
      return;
    }
    setExplanation(true);
    setWrongAnswer(true);
    setDisabled(true);
    setIncorect((prev) => prev + 1);
  }

  return (
    <>
      <Header />
      <section className="kvizSection">
        <div className="kvizLessons">
          <div className="kvizTitle">
            <h2>
              <span>Cool School</span> <em>kviz</em>
            </h2>
          </div>
          <div className="kvizSubtitle">
            <h3>
              <span>{kvizData[0].schoolSubject} </span> | {kvizData[0].class}
              .razred
            </h3>
          </div>
          <div className="kvizLessonsOptions">
            {kvizData.map((lesson: any, index: number) => (
              <button
                key={index}
                className="button"
                onClick={() => {
                  setCurrentTitle(lesson.title);
                  setCurrentSchoolSubject(lesson.schoolSubject);
                  setCurrentClass(Number(lesson.class));
                  getQuestion(
                    Number(lesson.class),
                    lesson.schoolSubject,
                    lesson.title
                  );
                }}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        </div>
        <div className="kvizPreview">
          <div className="kvizView">
            <div className="question">
              <p>{question.question}</p>
            </div>
            <div className="choiceAnswer">
              <div>
                <button
                  className="button"
                  onClick={() => corectAnswer(answerArray[0])}
                  disabled={disabled}
                >
                  {answerArray[0]}
                </button>
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => corectAnswer(answerArray[1])}
                  disabled={disabled}
                >
                  {answerArray[1]}
                </button>
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => corectAnswer(answerArray[2])}
                  disabled={disabled}
                >
                  {answerArray[2]}
                </button>
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => corectAnswer(answerArray[3])}
                  disabled={disabled}
                >
                  {answerArray[3]}
                </button>
              </div>
            </div>
            <div className="nextButton">
              <button
                className="button"
                onClick={() => {
                  getQuestion(currentClass, currentSchoolSubject, currentTitle);
                  setExplanation(false);
                  setWrongAnswer(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <div
              className={
                !explanation ? "explanation" : "explanation displayExplanation"
              }
            >
              <button
                className="button"
                onClick={() => {
                  setExplanation(false);
                  setWrongAnswer(false);
                }}
              >
                x
              </button>
              <p>
                {!wrongAnswer
                  ? "Cestitamo! Odgovor je tacan!"
                  : question.explanation}
              </p>
            </div>
          </div>

          <div className="comercial">
            <div className="result">
              <h3>
                Tacno: <span>{corect}</span>
              </h3>
              <h3>
                Netacno: <span>{incorect}</span>
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
