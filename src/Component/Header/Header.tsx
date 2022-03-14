import "./Header.scss";
import logo from "../../Img/logo.png";
import MenuLessons from "./MenuLessons/MenuLessons";
import MenuKviz from "./MenuKviz/MenuKviz";
import { useMenu } from "../../Context/Menu";

export default function Header() {
  const { menu, setMenuEvent } = useMenu() as any;
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navContainer">
        <div className="div-button">
          <button
            onClick={() => {
              setMenuEvent({
                menuLessons: true,
                menuKviz: false,
              });
            }}
          >
            Izaberi lekciju
          </button>
          <div className={menu.menuLessons ? "menuLessons" : "hidden"}>
            <MenuLessons />
          </div>
        </div>
        <div className="div-button">
          <button
            onClick={() => {
              setMenuEvent({
                menuLessons: false,
                menuKviz: true,
              });
            }}
          >
            Kviz
          </button>
          <div className={menu.menuKviz ? "menuLessons" : "hidden"}>
            <MenuKviz />
          </div>
        </div>
      </div>
    </header>
  );
}
