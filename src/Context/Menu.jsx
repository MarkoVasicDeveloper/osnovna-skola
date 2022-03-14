import { createContext, useContext, useState } from "react";

const MenuContext = createContext({
  data: null,
  setValue: (value) => {},
});

export const useMenu = () => useContext(MenuContext);

export default function Menu({ children }) {
  const [menu, setMenu] = useState({ menuLessons: false, menuKviz: false });

  const setMenuEvent = (menu) => setMenu(menu);

  const value = { menu, setMenuEvent };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
