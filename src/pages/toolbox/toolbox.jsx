import styles from "./toolbox.module.css";
import { useState, useContext } from "react";
import { useParams } from "react-router";
import { toolboxes } from "../../data/toolboxes";

import Toast from "../../components/toast/toast";
import CurrentToolCheckContextProvider from "../../context/currentToolCheckContext";
import AddToReportModal from "../../components/addToReportModal/addToReportModal";
import Button from "../../components/button/button";
import SaveReportModal from "../../components/saveReportModal/saveReportModal";

const Toolbox = () => {
  const { url } = useParams();
  const toolbox = toolboxes.find((t) => t.url === url);
  const { currentCheck } = useContext(CurrentToolCheckContextProvider);

  const [addToolModalOpen, setAddToolModalOpen] = useState(false);
  const [saveCheckModalOpen, setSaveCheckModalOpen] = useState(false);
  const [toolData, setToolData] = useState({});

  const handleAddToolModalOpen = (toolData) => {
    setAddToolModalOpen(true);
    setToolData(toolData);
  };

  const handleSaveCheckModalOpen = () => {
    setSaveCheckModalOpen(true);
  };

  const handleCheckedToolPrevious = (tool) => {
    return currentCheck.tools.find((t) => t.toolPath === tool.toolPath);
  };

  if (!toolbox) return <p>Toolbox not found</p>;

  return (
    <div className={styles.container}>
      <Toast />
      <AddToReportModal
        open={addToolModalOpen}
        onClose={() => setAddToolModalOpen(false)}
        data={toolData}
      />
      <SaveReportModal
        open={saveCheckModalOpen}
        onClose={() => setSaveCheckModalOpen(false)}
        data={toolbox}
      />
      <div className={styles.heading}>
        <h1>{toolbox.name}</h1>
        <p>{toolbox.nsn}</p>
        <p>
          Select a tool &gt; select if missing or damaged &gt; add to report,
          its that simple! Once you are complete and save the report, you will
          have the option to download a copy of either the MOD Form 2251 or Army
          Form B6530.
        </p>
      </div>
      <ul className={styles.container__tray}>
        {toolbox.data[0].trays.map((tray, i) => {
          return (
            <li key={i} className={styles.tray}>
              <div>
                <p>Tray {tray.trayNo}</p>
                <p>{tray.trayNSN}</p>
              </div>
              <svg viewBox={toolbox.data[0].viewBox} fill="none">
                <path d={tray.trayPath} />
                {tray.trayTools.map((tool, i) => {
                  return (
                    <path
                      key={i}
                      className={styles.tool}
                      d={tool.toolPath}
                      style={{
                        pointerEvents:
                          handleCheckedToolPrevious(tool) && "none",
                        fill:
                          handleCheckedToolPrevious(tool) &&
                          "var(--toolbox-clr-slot)",
                      }}
                      onClick={() => {
                        handleAddToolModalOpen(tool);
                      }}
                    />
                  );
                })}
              </svg>
            </li>
          );
        })}
      </ul>
      <Button text={"Save"} fill onClick={handleSaveCheckModalOpen} />
    </div>
  );
};

export default Toolbox;
