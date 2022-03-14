import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import KvizPage from "./Component/KvizPage/KvizPage";
import LessonsPage from "./Component/LessonsPage/LessonsPage";
import Main from "./Component/Main/Main";
import Kviz from "./Context/Kviz";
import Lessons from "./Context/Lessons";
import Menu from "./Context/Menu";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Lessons>
        <Menu>
          <Kviz>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/kvizArea" element={<KvizPage />} />
            </Routes>
          </Kviz>
        </Menu>
      </Lessons>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
