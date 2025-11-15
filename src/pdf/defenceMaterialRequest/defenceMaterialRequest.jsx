import styles from "./defenceMaterialRequest.module.css";
import { useContext, useRef } from "react";
import Button from "../../components/button/button";
import PhoneIcon from "../../assets/svg/phoneIcon/phoneIcon";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import GlobalContextProvider from "../../context/globalContext";

const DefenceMaterialRequest = ({ data }) => {
  const { user } = useContext(GlobalContextProvider);
  const dmrPdfRef = useRef(null);

  const filenameFormat = `${data.checkedDate.replaceAll(
    "-",
    ""
  )}-${data.toolboxSerNo.replaceAll(" ", "").toUpperCase()}_MODForm2251`;

  const handleDownload = async () => {
    const element = dmrPdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("l", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
    pdf.save(`${filenameFormat || "report"}.pdf`);
  };

  const condenseNSN = (nsn) => {
    return nsn.replaceAll("-", "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.paper} ref={dmrPdfRef}>
        <ul className={styles.head}>
          <li style={{ gridColumn: "1 / 2", border: "4px solid #000000" }}>
            <h1 className={styles.large}>
              <strong>DEFENCE MATERIEL REQUEST</strong>
            </h1>
          </li>
          <li
            style={{
              gridColumn: "2 / 6",
              alignItems: "flex-end",
              border: "none",
            }}
          >
            <h2 className={styles.medium}>
              <strong>MOD Form 2251</strong>
            </h2>
            <p className={styles.small}>(Revised 08/13)</p>
          </li>
          <li style={{ gridRow: "2 / 4", display: "block" }}>
            <h3
              className={styles.large}
              style={{
                background: "#000000",
                color: "#ffffff",
              }}
            >
              <strong>To:</strong>
            </h3>
          </li>
          <li style={{ background: "#EAEAEA" }}>
            <h3 className={styles.medium}>
              <strong>Unit Title / UIN</strong>
            </h3>
          </li>
          <li>
            <p className={styles.small} style={{ textTransform: "uppercase" }}>
              {user.uin}
            </p>
          </li>
          <li style={{ background: "#EAEAEA" }}>
            <h3 className={styles.medium}>
              <strong>AinU Title / Name</strong>
            </h3>
          </li>
          <li>
            <p className={styles.small} style={{ textTransform: "uppercase" }}>
              {data.toolboxSerNo}
            </p>
          </li>
          <li style={{ background: "#EAEAEA" }}>
            <h3 className={styles.medium}>
              <strong>Platform Type</strong>
            </h3>
          </li>
          <li>
            <p className={styles.small} style={{ textTransform: "uppercase" }}>
              {data.toolboxDesc}
            </p>
          </li>
          <li style={{ background: "#EAEAEA" }}>
            <h3 className={styles.medium}>
              <strong>Authorised Demander</strong>
            </h3>
          </li>
          <li></li>
          <li
            style={{
              display: "block",
              gridColumn: "1 / 6",
              borderWidth: "4px",
            }}
          >
            <h3
              className={styles.large}
              style={{
                background: "#000000",
                color: "#ffffff",
              }}
            >
              Customer Reference:
            </h3>
            <p className={styles.medium}>
              <strong>
                State end use i.e. Embodiment on Issue, Earmark on Receipt etc.
              </strong>
            </p>
          </li>
        </ul>

        <ul className={styles.body__headers}>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p
              className={styles.medium}
              style={{ transform: "rotate(270deg)" }}
            >
              <strong>Line</strong>
            </p>
          </li>
          <li
            style={{
              background: "#EAEAEA",
              gridColumn: "2 / 15",
              gridRow: "1 / 2",
            }}
          >
            <p className={styles.medium}>
              <strong>NSN</strong>
            </p>
          </li>
          <li
            style={{
              background: "#EAEAEA",
              gridColumn: "2 / 6",
              gridRow: "2 / 3",
            }}
          >
            <p className={styles.medium}>
              <strong>NSC</strong>
            </p>
          </li>
          <li
            style={{
              background: "#EAEAEA",
              gridColumn: "6 / 15",
              gridRow: "2 / 3",
            }}
          >
            <p className={styles.medium}>
              <strong>NIIN</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>Description</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>Unit of Issue</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>Qty</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>RDD</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>CLC</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>RFD</strong>
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "1 / 3" }}>
            <p className={styles.medium}>
              <strong>Supply Response</strong>
            </p>
            <p className={styles.medium}>
              <strong>Voucher / Demand No</strong>
            </p>
          </li>
        </ul>

        {data.tools.map((tool, i) => {
          return (
            <ul className={styles.body__content} key={i}>
              <li>{i + 1}</li>
              {condenseNSN(tool.toolNSN)
                .split("")
                .map((nsn, i) => {
                  return (
                    <li key={i}>
                      <p className={styles.small}>{nsn}</p>
                    </li>
                  );
                })}
              <li>
                <p className={styles.small}>{tool.toolDesc}</p>
              </li>
              <li></li>
              <li>
                <p className={styles.small}>{tool.toolQty}</p>
              </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          );
        })}

        {data.tools.length < 10 && data.tools.length > 0 ? (
          <ul className={styles.body__content}>
            <li>{data.tools.length + 1}</li>
            {Array.from({ length: 13 }).map((_, i) => {
              return <li key={i}></li>;
            })}
            <li>
              <p className={styles.small}>Last Item</p>
            </li>
            {Array.from({ length: 6 }).map((_, i) => {
              return <li key={i}></li>;
            })}
          </ul>
        ) : null}

        {Array.from({ length: 9 - data.tools.length }).map((_, i) => (
          <ul key={i} className={styles.body__content}>
            <li>{data.tools.length + i + 2}</li>
            {Array.from({ length: 20 }).map((_, i) => {
              return <li key={i}></li>;
            })}
          </ul>
        ))}

        <ul className={styles.foot}>
          <li
            style={{
              display: "block",
              gridColumn: "1 / 8",
            }}
          >
            <h3
              className={styles.large}
              style={{
                background: "#000000",
                color: "#ffffff",
              }}
            >
              Special Instructions:
            </h3>
          </li>
          <li
            style={{
              display: "block",
              gridColumn: "1 / 8",
            }}
          >
            <h3
              className={styles.large}
              style={{
                background: "#000000",
                color: "#ffffff",
              }}
            >
              Remarks:
            </h3>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "3 / 5" }}>
            <h3 className={styles.medium}>
              <strong>Signature</strong>
            </h3>
          </li>
          <li style={{ gridRow: "3 / 5" }}>
            <img
              src={data.signature}
              alt="signature"
              className={styles.signature}
            />
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "3 / 4" }}>
            <h3 className={styles.medium}>
              <strong>Name</strong>
            </h3>
          </li>
          <li style={{ gridRow: "3 / 4" }}>
            <p className={styles.small} style={{ textTransform: "uppercase" }}>
              {user.surename}
            </p>
          </li>
          <li style={{ background: "#EAEAEA", gridRow: "4 / 5" }}>
            <h3 className={styles.medium}>
              <strong>Rank / Grade</strong>
            </h3>
          </li>
          <li style={{ gridRow: "4 / 5" }}>
            <p className={styles.small} style={{ textTransform: "uppercase" }}>
              {user.rank}
            </p>
          </li>

          <li style={{ background: "#EAEAEA", gridRow: "3 / 4" }}>
            <PhoneIcon />
            <h3 className={styles.medium}>
              <strong>Extension</strong>
            </h3>
          </li>
          <li style={{ gridRow: "3 / 4" }}></li>
          <li style={{ background: "#EAEAEA", gridRow: "4 / 5" }}>
            <h3 className={styles.medium}>
              <strong>Date</strong>
            </h3>
          </li>
          <li style={{ gridRow: "4 / 5" }}>
            <p className={styles.small} style={{ textTransform: "uppercase" }}>
              {data.checkedDate}
            </p>
          </li>
        </ul>
        <p className={styles.small}>(MJDI Compliant Version)</p>
      </div>
      {data.tools.length > 0 && (
        <Button
          text={`MOD Form 2251 (${data.copy})`}
          onClick={handleDownload}
        />
      )}
    </div>
  );
};

export default DefenceMaterialRequest;
