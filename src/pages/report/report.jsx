import styles from "./report.module.css";
import { useParams } from "react-router";
import { useContext } from "react";
import GlobalContext from "../../context/globalContext";

import CESDefFrom from "../../components/cesDefForm/cesDefForm";

const Report = () => {
  const { uid } = useParams();
  const { allChecks } = useContext(GlobalContext);
  const report = allChecks.find((r) => String(r.uid) === String(uid));

  return (
    <div className={styles.container}>
      <ul className={styles.container__head}>
        <li>
          <h1>{report.toolboxDesc}</h1>
          <p>{report.toolboxNSN}</p>
        </li>
        <li>
          <h2>{report.toolboxSerNo}</h2>
          <p>{report.checkedDate}</p>
          <p>Total issues: {report.tools.length}</p>
        </li>
      </ul>
      <ul className={styles.container__tools}>
        {report.tools.map((tool, i) => {
          return (
            <li key={i}>
              <p>{tool.toolDesc}</p>
              <p>{tool.toolNSN}</p>
              <p>{tool.status}</p>
              <p>Qty: {tool.toolQty}</p>
            </li>
          );
        })}
      </ul>
      <CESDefFrom data={report} />
    </div>
  );
};

export default Report;
