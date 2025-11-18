import styles from "./button.module.css";

const Button = ({ text, fill, onClick }) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      style={{
        background: !fill && "var(--bkgrd-clr-2)",
      }}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
