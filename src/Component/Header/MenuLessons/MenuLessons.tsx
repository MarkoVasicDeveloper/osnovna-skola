import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faBook,
  faCalculator,
  faEarthEurope,
  faMonument,
  faTree,
  faVial,
} from "@fortawesome/free-solid-svg-icons";
import "./MenuLessons.scss";
import axios, { AxiosResponse } from "axios";
import { useLessons } from "../../../Context/Lessons";
import { useMenu } from "../../../Context/Menu";
import { useNavigate } from "react-router-dom";

export default function MenuLessons() {
  const labelArray = useRef() as any;
  const [grade, setGrade] = useState("");
  const { setDataEvent } = useLessons() as any;
  const { setMenuEvent } = useMenu() as any;

  const navigate = useNavigate();

  useEffect(() => {
    labelArray.current.childNodes.forEach(
      (item: any, index: number, arr: any) => {
        if (index < 7) {
          arr[index + 1].style.backgroundColor = "transparent";
          if (item.checked) {
            arr[index + 1].style.backgroundColor = "#793ea5";
          }
        }
      }
    );

    return () => {};
  }, [grade]);

  function getAllLessons(schollSubject: string) {
    setMenuEvent({ menuLessons: false, menuKviz: false });

    axios(`http://localhost:3000/api/getAllLessonsByGrade`, {
      method: "POST",
      data: { grade: grade, schoolSubject: schollSubject },
    }).then((res: AxiosResponse) => {
      setDataEvent(res.data);
      navigate("/lessons");
    });
  }

  return (
    <div className="menuContainer">
      <div className="optionsBox">
        <div
          className="close"
          onClick={() => setMenuEvent({ menuLessons: false, menuKviz: false })}
        >
          x
        </div>
        <h2>Izaberi razder</h2>
        {grade ? <p>{grade}. razred</p> : ""}

        <div className="pickGrade" ref={labelArray}>
          <input
            id="5grade"
            type="radio"
            name="grade"
            value={5}
            onChange={(e) => setGrade(e.target.value)}
          />
          <label htmlFor="5grade">5</label>

          <input
            id="6grade"
            type="radio"
            name="grade"
            value={6}
            onChange={(e) => setGrade(e.target.value)}
          />
          <label htmlFor="6grade">6</label>

          <input
            id="7grade"
            type="radio"
            name="grade"
            value={7}
            onChange={(e) => setGrade(e.target.value)}
          />
          <label htmlFor="7grade">7</label>

          <input
            id="8grade"
            type="radio"
            name="grade"
            value={8}
            onChange={(e) => setGrade(e.target.value)}
          />
          <label htmlFor="8grade">8</label>
        </div>
      </div>
      <div className="pickLessonsContainer">
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("srpski");
          }}
        >
          <FontAwesomeIcon icon={faBook} />
          Srpski
        </button>
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("matematika");
          }}
        >
          <FontAwesomeIcon icon={faCalculator} />
          Matematika
        </button>
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("istorija");
          }}
        >
          <FontAwesomeIcon icon={faMonument} />
          Istorija
        </button>
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("geografija");
          }}
        >
          <FontAwesomeIcon icon={faEarthEurope} />
          Geografija
        </button>
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("fizika");
          }}
        >
          <FontAwesomeIcon icon={faAtom} />
          Fizika
        </button>
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("hemija");
          }}
        >
          <FontAwesomeIcon icon={faVial} />
          Hemija
        </button>
        <button
          onClick={() => {
            setMenuEvent({ menuLessons: false, menuKviz: false });
            getAllLessons("biologija");
          }}
        >
          <FontAwesomeIcon icon={faTree} />
          Biologija
        </button>
      </div>
    </div>
  );
}
