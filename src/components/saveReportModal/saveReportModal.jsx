import styles from "./saveReportModal.module.css";
import { useNavigate } from "react-router";
import { useRef, useContext, useState } from "react";
import GlobalContextProvider from "../../context/globalContext";
import CurrentToolCheckContextProvider from "../../context/currentToolCheckContext";
import SignatureCanvas from "react-signature-canvas";

import Button from "../button/button";

const SaveReportModal = ({ open, onClose, data }) => {
  const navigate = useNavigate();
  const canvasRef = useRef();
  const [details, setDetails] = useState({ serNo: "", checker: "", date: "" });
  const { allChecks, setAllChecks } = useContext(GlobalContextProvider);
  const { currentCheck } = useContext(CurrentToolCheckContextProvider);

  const handleCloseModal = () => {
    onClose?.();
  };

  const handleSaveToolboxCheck = () => {
    const signature = canvasRef.current?.toDataURL("image/png") ?? "";
    setAllChecks([
      ...allChecks,
      {
        uid: Math.random(),
        toolboxSerNo: details.serNo,
        toolboxNSN: data.nsn,
        toolboxDesc: data.name,
        checkedBy: details.checker,
        checkedDate: details.date,
        signature: signature,
        tools: currentCheck.tools,
      },
    ]);
    handleCloseModal();
    navigate("/checkout");
  };

  const clearSignature = () => {
    canvasRef.current.clear();
  };

  if (!open) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1>Save check</h1>

        <ul className={styles.container__inputs}>
          <li>
            <p>Toolbox Ser No</p>
            <input
              type="text"
              onChange={(e) =>
                setDetails({ ...details, serNo: e.target.value })
              }
            />
          </li>
          <li>
            <p>Checked by</p>
            <input
              type="text"
              onChange={(e) =>
                setDetails({ ...details, checker: e.target.value })
              }
            />
          </li>
          <li>
            <p>Date</p>
            <input
              type="date"
              onChange={(e) => setDetails({ ...details, date: e.target.value })}
            />
          </li>
          <li>
            <p>Signature</p>
            <div className={styles.container__signature}>
              <SignatureCanvas penColor="black" ref={canvasRef} />
            </div>
            <Button text={"Clear signature"} onClick={clearSignature} />
          </li>
        </ul>

        <div className={styles.container__buttons}>
          <Button text={"Cancel"} onClick={handleCloseModal} />
          <Button text={"Save"} fill onClick={handleSaveToolboxCheck} />
        </div>
      </div>
    </div>
  );
};

export default SaveReportModal;
