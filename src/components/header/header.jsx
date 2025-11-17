import { Link, useLocation } from "react-router";
import LogoIcon from "../../assets/svg/logoIcon/logoIcon";
import ToolboxIcon from "../../assets/svg/toolboxIcon/toolboxIcon";
import ChecksIcon from "../../assets/svg/checksIcon/checksIcon";
import SettingsIcon from "../../assets/svg/settingsIcon/settingsIcon";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();

  const navLinks = [{to: "/", icon: <ToolboxIcon />},{to: "/checkout", icon: <ChecksIcon />},{to: "/settings", icon: <SettingsIcon />}];

  return (
    <header className={styles.container}>
      <LogoIcon />
      <ul>
        {navLinks.map((link, i) => (
          <li key={i} className={location.pathname === link.to && styles.active}>
            <Link to={link.to}>
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
