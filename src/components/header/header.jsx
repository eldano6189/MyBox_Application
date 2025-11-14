import { Link } from "react-router";
import LogoIcon from "../../assets/svg/logoIcon/logoIcon";
import ToolboxIcon from "../../assets/svg/toolboxIcon/toolboxIcon";
import ChecksIcon from "../../assets/svg/checksIcon/checksIcon";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.container}>
      <LogoIcon />
      <ul>
        <li>
          <Link to={"/"}>
            <ToolboxIcon />
          </Link>
        </li>
        <li>
          <Link to={"/checkout"}>
            <ChecksIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
