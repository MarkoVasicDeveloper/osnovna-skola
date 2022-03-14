import { faComment, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useKviz } from "../../../Context/Kviz";
import { useMenu } from "../../../Context/Menu";
import "./MenuKviz.scss";
import { useNavigate } from "react-router-dom";

export default function MenuKviz() {
  const [grade, setGrade] = useState("");
  const [schoolSubject, setSchoolSubject] = useState("");
  const [optionsKviz, setOptionsKviz] = useState(false);

  const { setMenuEvent } = useMenu() as any;
  const { setKvizEvent } = useKviz() as any;

  const navigate = useNavigate();

  function getLesson(grade: number, schoolSubject: string) {
    if (!grade || !schoolSubject) return null;
    setMenuEvent({ menuLessons: false, menuKviz: false });

    axios(`http://localhost:3000/api/getAllLessonsByGrade`, {
      method: "POST",
      data: { grade: grade, schoolSubject: schoolSubject },
    }).then((res: AxiosResponse) => {
      setKvizEvent(res.data);
      navigate("/kvizArea");
    });
  }
  return (
    <div className="menuContainerKviz">
      <div
        className="close"
        onClick={() => setMenuEvent({ menuLessons: false, menuKviz: false })}
      >
        x
      </div>
      <div className="kvizItem" onClick={() => setOptionsKviz(true)}>
        <FontAwesomeIcon icon={faComment} />
        provezbaj posebnu oblast iz jednog predmeta
      </div>
      <div className="kvizItem">
        <FontAwesomeIcon icon={faComments} />
        pitanja iz ...
      </div>
      {optionsKviz ? (
        <div>
          <div className="optionsLessonsKviz">
            <label htmlFor="grade">Izaberi razred</label>
            <select
              id="grade"
              name="grade"
              onChange={(e) => setGrade(e.target.value)}
            >
              <option selected disabled hidden></option>
              <option value="5">5. razred</option>
              <option value="6">6. razred</option>
              <option value="7">7. razred</option>
              <option value="8">8. razred</option>
            </select>

            <label htmlFor="schoolSubject">Predmet</label>
            <select
              name="schoolSubject"
              id="schoolSubject"
              onChange={(e) => setSchoolSubject(e.target.value)}
            >
              <option selected disabled hidden></option>
              <option value="srpski">Srpski</option>
              <option value="matematika">Matematika</option>
              <option value="istorija">Istorija</option>
              <option value="geografija">Geografija</option>
              <option value="fizika">Fizika</option>
              <option value="hemija">Hemija</option>
              <option value="biologija">Biologija</option>
            </select>
          </div>
          <div className="getKviz">
            <button onClick={() => getLesson(Number(grade), schoolSubject)}>
              Posalji
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
