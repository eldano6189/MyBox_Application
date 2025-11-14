import { useState, useContext } from "react";
import CurrentToolCheckContextProvider from "../../context/currentToolCheckContext";
import Button from "../button/button";
import MissingIcon from "../../assets/svg/missingIcon/missingIcon";
import BrokenIcon from "../../assets/svg/brokenIcon/brokenIcon";
import styles from "./addToReportModal.module.css";

const AddToReportModal = ({ open, onClose, data }) => {
  const { setCurrentCheck } = useContext(CurrentToolCheckContextProvider);
  const [toggle, setToggle] = useState(false);

  const handleCloseModal = () => {
    onClose?.();
    setToggle(false);
  };

  const handleAddTool = (data) => {
    setCurrentCheck((prev) => ({
      ...prev,
      tools: [
        ...prev.tools,
        {
          toolDesc: data.toolDesc,
          toolNSN: data.toolNSN,
          toolQty: data.toolQty,
          toolPath: data.toolPath,
          status: toggle ? "Damaged" : "Missing",
        },
      ],
    }));
    handleCloseModal();
  };

  if (!open) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.container__info}>
          <h2>{data.toolDesc}</h2>
          <p>{data.toolNSN}</p>
          <p>Qty {data.toolQty}</p>
        </div>

        <div className={styles.container__toggle}>
          <div className={styles.toggle__img}>
            {toggle ? <BrokenIcon /> : <MissingIcon />}
          </div>
          <div className={styles.toggle__text}>
            <p>Mark as {toggle ? "Damaged" : "Missing"}</p>
          </div>
          <div
            className={styles.toggle__button}
            onClick={() => setToggle(!toggle)}
          >
            <button className={styles.toggle}>
              <div
                className={styles.slider}
                style={{ transform: toggle && "translateX(0.75rem)" }}
              ></div>
            </button>
          </div>
        </div>

        <div className={styles.container__buttons}>
          <Button text={"Cancel"} onClick={handleCloseModal} />
          <Button text={"Confirm"} fill onClick={() => handleAddTool(data)} />
        </div>
      </div>
    </div>
  );
};

export default AddToReportModal;
