import styles from "./report.module.css";
import { useParams } from "react-router";
import { useContext } from "react";
import GlobalContext from "../../context/globalContext";
import Button from "../../components/button/button";

import CESEquipmentDeficiency from "../../pdf/cesEquipmentDeficiency/cesEquipmentDeficiency";
import DefenceMaterialRequest from "../../pdf/defenceMaterialRequest/defenceMaterialRequest";

const Report = () => {
  const { uid } = useParams();
  const { allChecks } = useContext(GlobalContext);
  const report = allChecks.find((r) => String(r.uid) === String(uid));

  const CED_PDF_LIMIT = 12;
  const DMR_PDF_LIMIT = 10;

  const chunkArray = (arr, size) => {
    if (!Array.isArray(arr) || size <= 0) return [];
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const CEDforms = chunkArray(report.tools, CED_PDF_LIMIT);
  const DMRforms = chunkArray(report.tools, DMR_PDF_LIMIT);

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
      <div>
        {CEDforms.map((page, i) => (
          <CESEquipmentDeficiency
            key={i}
            data={{ ...report, tools: page, copy: i + 1 }}
          />
        ))}
        {DMRforms.map((page, i) => (
          <DefenceMaterialRequest
            key={i}
            data={{ ...report, tools: page, copy: i + 1 }}
          />
        ))}
      </div>
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
    </div>
  );
};

export default Report;
