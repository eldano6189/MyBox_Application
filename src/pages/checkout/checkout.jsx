import styles from "./checkout.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import GlobalContextProvider from "../../context/globalContext";
import NextIcon from "../../assets/svg/nextIcon/nextIcon";
import ToolboxIcon from "../../assets/svg/toolboxIcon/toolboxIcon";

const Checkout = () => {
  const { allChecks } = useContext(GlobalContextProvider);

  return (
    <div className={styles.container}>
      <h1>Tool checks</h1>
      <p>
        All your tool checks will be stored here, you can come back at any time
        to produce the Army Form B6530 or the MOD Form 2251 as required.
      </p>
      <h2>Select a check</h2>
      <ul>
        {allChecks.length === 0 ? (
          <p>No previous checks.</p>
        ) : (
          allChecks
            .sort((a, b) => (a.checkedDate < b.checkedDate ? 1 : -1))
            .map((check, i) => {
              return (
                <li key={i} style={{ animationDelay: `0.${i}s` }}>
                  <Link
                    to={`/report/${check.uid}`}
                    className={styles.container__link}
                  >
                    <div className={styles.container__img}>
                      <ToolboxIcon />
                    </div>
                    <div className={styles.container__text}>
                      <p>{check.toolboxSerNo}</p>
                      <p>{check.checkedDate}</p>
                      <p>Tool issues: {check.tools.length}</p>
                    </div>
                    <div className={styles.container__arrow}>
                      <NextIcon />
                    </div>
                  </Link>
                </li>
              );
            })
        )}
      </ul>
    </div>
  );
};

export default Checkout;
