import axios from "axios";
import { useState } from "react";
import { useLessons } from "../../Context/Lessons";
import Header from "../Header/Header";
import "./LessonsPage.scss";

export default function LessonsPage() {
  const { data } = useLessons() as any;
  const [lessonBody, setLessonsBody] = useState("");

  function getLesson(grade: number, schoolSubject: string, title: string) {
    axios(
      `http://localhost:3000/assets/lessons/${grade}/${schoolSubject}/${title}`
    ).then((res) => setLessonsBody(res.data));
  }

  return (
    <>
      <Header />
      <section className="lessonsSection">
        <div className="lessonsChoice">
          <div className="title-div">
            <h2>Izaberi Lekciju</h2>
          </div>
          <div className="lessonsDiv">
            <h3>{data[0].schoolSubject}</h3>
          </div>
          <div>
            {data.map((lesson: any, index: number) => {
              return (
                <button
                  key={index}
                  className="button"
                  onClick={() =>
                    getLesson(lesson.class, lesson.schoolSubject, lesson.title)
                  }
                >
                  {lesson.title}
                </button>
              );
            })}
          </div>
        </div>
        <div className="lessonPreview">
          <div
            className="lessonView"
            dangerouslySetInnerHTML={{ __html: lessonBody }}
          ></div>
          <div className="comercial"></div>
        </div>
      </section>
    </>
  );
}
