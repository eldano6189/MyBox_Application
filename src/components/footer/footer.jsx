import styles from "./footer.module.css";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p>
        Any issues, suggestions, incorrect or superceded NSN's, please{" "}
        <Link to="/">contact Sgt D Hall</Link>
      </p>
    </footer>
  );
};

export default Footer;
