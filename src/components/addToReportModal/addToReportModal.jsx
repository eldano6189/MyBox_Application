import { useState, useContext } from "react";
import CurrentToolCheckContextProvider from "../../context/currentToolCheckContext";
import Button from "../button/button";
import styles from "./addToReportModal.module.css";

const AddToReportModal = ({ open, onClose, data }) => {
  const { currentCheck, setCurrentCheck } = useContext(
    CurrentToolCheckContextProvider,
  );
  const [toggle, setToggle] = useState(false);

  const existingTool = currentCheck.tools.find(
    (t) => t.toolPath === data.toolPath,
  );

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

  const handleRemoveTool = () => {
    setCurrentCheck((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.toolPath !== data.toolPath),
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
        {!existingTool && (
          <div
            className={styles.container__toggle}
            onClick={() => setToggle(!toggle)}
          >
            <div
              className={styles.toggle__slider}
              style={{ transform: toggle && "translateX(100%)" }}
            ></div>
            <p>Damaged</p>
            <p>Lost</p>
          </div>
        )}

        <div className={styles.container__buttons}>
          <Button text={"Cancel"} onClick={handleCloseModal} />
          {existingTool ? (
            <Button text={"Remove"} fill onClick={handleRemoveTool} />
          ) : (
            <Button text={"Confirm"} fill onClick={() => handleAddTool(data)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToReportModal;
