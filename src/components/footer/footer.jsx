import styles from "./footer.module.css";
import { Link } from "react-router";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  return (
    <footer className={styles.container}>
      <p>
        Any issues, suggestions, incorrect or superceded NSN's, please{" "}
        <Link
          to={`mailto:daniel.hall375@mod.gov.uk?subject=${formattedDate}-MYBOX_APP_QUERY`}
        >
          contact Sgt D Hall
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
