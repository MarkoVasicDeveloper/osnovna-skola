import { useContext, createContext, useState } from "react";

const LessonsContext = createContext({
  data: null,
  setValue: (value) => {},
});

export const useLessons = () => useContext(LessonsContext);

export default function Lessons({ children }) {
  const [data, setData] = useState([]);

  const setDataEvent = (data) => {
    setData(data);
  };

  const value = { data, setDataEvent };

  return (
    <LessonsContext.Provider value={value}>{children}</LessonsContext.Provider>
  );
}
