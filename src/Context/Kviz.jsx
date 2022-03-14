import { createContext, useContext, useState } from "react";

const KvizContext = createContext({
  data: null,
});

export const useKviz = () => useContext(KvizContext);

export default function Kviz({ children }) {
  const [kvizData, setKvizData] = useState([]);

  const setKvizEvent = (kvizData) => setKvizData(kvizData);

  const value = { kvizData, setKvizEvent };

  return <KvizContext.Provider value={value}>{children}</KvizContext.Provider>;
}
