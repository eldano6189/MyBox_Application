import CurrentToolCheckContextProvider from "../../context/currentToolCheckContext";
import styles from "./toast.module.css";
import { useState, useEffect, useContext } from "react";

const Toast = () => {
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const { currentCheck } = useContext(CurrentToolCheckContextProvider);

  const timer = 2000;

  useEffect(() => {
    if (currentCheck.tools.length === 0) return;

    setToastDisplayed(true);

    const handleCountDown = setTimeout(() => {
      setToastDisplayed(false);
    }, timer);

    return () => clearTimeout(handleCountDown);
  }, [currentCheck]);

  return (
    <div
      className={styles.container}
      style={{ display: !toastDisplayed && "none" }}
    >
      <div className={styles.toast}>
        <p>Tool added to check!</p>
        <div className={styles.container__slider}>
          <div className={styles.slider}></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
