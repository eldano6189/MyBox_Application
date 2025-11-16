import styles from "./cesEquipmentDeficiency.module.css";
import { useContext, useRef, Fragment } from "react";
import Button from "../../components/button/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import GlobalContextProvider from "../../context/globalContext";

const CESEquipmentDeficiency = ({ data }) => {
  const { user } = useContext(GlobalContextProvider);
  const cedPdfRef = useRef(null);

  const filenameFormat = `${data.checkedDate.replaceAll(
    "-",
    ""
  )}-${data.toolboxSerNo.replaceAll(" ", "").toUpperCase()}_AFB6530(${
    data.copy
  })`;

  const handleDownload = async () => {
    const element = cedPdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
    pdf.save(`${filenameFormat || "report"}.pdf`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paper} ref={cedPdfRef}>
        <ul className={styles.head}>
          <li style={{ gridColumn: "1 / 6" }}>
            <h1>CES Equipment Deficiency State</h1>
          </li>
          <li style={{ gridColumn: "6 / 7", justifyContent: "flex-end" }}>
            <h3 style={{ textAlign: "right" }}>
              Army Form B6530
              <br />
              (Revised 09/09)
            </h3>
          </li>
          <li style={{ gridColumn: "1 / 7" }}>
            <h2>For instructions see JSP 886 Volume 4 Part 201</h2>
          </li>
          <li style={{ gridColumn: "1 / 4" }}>
            <h3>Designation of Equipment</h3>
          </li>
          <li style={{ gridColumn: "4 / 7" }}>
            <div className={styles.box}>
              <p>{data.toolboxDesc}</p>
            </div>
          </li>
          <li style={{ gridColumn: "1 / 2" }}>
            <h3>CES No</h3>
          </li>
          <li style={{ gridColumn: "2 / 5" }}>
            <div className={styles.box}>
              <p>{data.toolboxNSN}</p>
            </div>
          </li>
          <li style={{ gridColumn: "5 / 6", justifyContent: "flex-end" }}>
            <h3>Registration No</h3>
          </li>
          <li style={{ gridColumn: "6 / 7" }}>
            <div className={styles.box}>
              <p>{data.toolboxSerNo}</p>
            </div>
          </li>
          <li style={{ gridColumn: "1 / 3" }}>
            <h3>Amendment No</h3>
          </li>
          <li style={{ gridColumn: "3 / 7" }}>
            <div
              className={styles.box}
              style={{ padding: "0", border: "none" }}
            >
              {Array.from({ length: 15 }).map((_, i) => {
                return (
                  <div className={styles.box} key={i}>
                    <p></p>
                  </div>
                );
              })}
            </div>
          </li>
        </ul>

        <ul className={styles.body}>
          <li>
            <h3>
              CES Item
              <br />
              Serial No
            </h3>
          </li>
          <li>
            <h3>Designation of Items Deficient</h3>
          </li>
          <li style={{ gridColumn: "3 / 9" }}>
            <h3>Quantity of Items Deficient</h3>
          </li>
          <li>
            <p>(a)</p>
          </li>
          <li>
            <p>(b)</p>
          </li>
          <li style={{ gridColumn: "3 / 5" }}>
            <p>(c)</p>
          </li>
          <li style={{ gridColumn: "5 / 7" }}>
            <p>(d)</p>
          </li>
          <li style={{ gridColumn: "7 / 9" }}>
            <p>(e)</p>
          </li>

          {data.tools.map((tool, i) => (
            <Fragment key={i}>
              <li>
                <p>{i + 1}</p>
              </li>
              <li>
                <p>{tool.toolNSN}</p>
                <p>{tool.toolDesc.toUpperCase()}</p>
              </li>
              <li style={{ gridColumn: "3 / 5" }}>
                <p>QTY 1</p>
                <p>{tool.status.toUpperCase()}</p>
              </li>
              <li style={{ gridColumn: "5 / 7" }}>
                <p></p>
              </li>
              <li style={{ gridColumn: "7 / 9" }}>
                <p></p>
              </li>
            </Fragment>
          ))}

          {data.tools.length === 0 && (
            <>
              <li>
                <p>{data.tools.length + 1}</p>
              </li>
              <li>
                <p></p>
                <p></p>
              </li>
              <li style={{ gridColumn: "3 / 5" }}>
                <p></p>
                <p>COMPLETE</p>
              </li>
              <li style={{ gridColumn: "5 / 7" }}>
                <p></p>
              </li>
              <li style={{ gridColumn: "7 / 9" }}>
                <p></p>
              </li>
            </>
          )}

          {data.tools.length < 12 && data.tools.length > 0 ? (
            <>
              <li>
                <p>{data.tools.length + 1}</p>
              </li>
              <li>
                <p></p>
                <p></p>
              </li>
              <li style={{ gridColumn: "3 / 5" }}>
                <p></p>
                <p>LAST ITEM</p>
              </li>
              <li style={{ gridColumn: "5 / 7" }}>
                <p></p>
              </li>
              <li style={{ gridColumn: "7 / 9" }}>
                <p></p>
              </li>
            </>
          ) : null}

          {/* fill empty rows to make 12 total */}
          {Array.from({ length: 11 - data.tools.length }).map((_, i) => (
            <Fragment key={i}>
              <li>
                <p>{data.tools.length + i + 2}</p>
              </li>
              <li>
                <p></p>
                <p></p>
              </li>
              <li style={{ gridColumn: "3 / 5" }}>
                <p></p>
                <p></p>
              </li>
              <li style={{ gridColumn: "5 / 7" }}>
                <p></p>
              </li>
              <li style={{ gridColumn: "7 / 9" }}>
                <p></p>
              </li>
            </Fragment>
          ))}

          <li style={{ gridColumn: "1 / 3", justifyContent: "flex-start" }}>
            <p>
              Signature as receipt for or acknowledgement of
              <br />
              equipment less items enumerated in column above
            </p>
          </li>
          <li>
            <p className={styles.checkedby}>
              {user.servNo} {user.rank} {user.surename}
            </p>
          </li>
          <li style={{ padding: "0" }}>
            <img
              src={data.signature}
              className={styles.signature}
              alt="signature"
            />
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li style={{ gridColumn: "1 / 3", justifyContent: "flex-start" }}>
            <p>Date:</p>
          </li>
          <li style={{ gridColumn: "3 / 5" }}>
            <p>{data.checkedDate}</p>
          </li>
          <li style={{ gridColumn: "5 / 7" }}></li>
          <li style={{ gridColumn: "7 / 9" }}></li>
        </ul>
      </div>
      <Button text={`AF B6530 (${data.copy})`} fill onClick={handleDownload} />
    </div>
  );
};

export default CESEquipmentDeficiency;
