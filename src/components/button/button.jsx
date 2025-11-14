import styles from "./button.module.css";

const Button = ({ text, fill, onClick }) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      style={{
        background: fill && "var(--main-clr)",
      }}
    >
      <p
        style={{
          color: fill && "var(--bkgrd-clr-1)",
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
