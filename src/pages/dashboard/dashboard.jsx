import styles from "./dashboard.module.css";
import { Link } from "react-router";
import NextIcon from "../../assets/svg/nextIcon/nextIcon";
import ToolboxIcon from "../../assets/svg/toolboxIcon/toolboxIcon";

import { toolboxes } from "../../data/toolboxes";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        <h1>Welcome to MyBox!</h1>
        <p>
          Your essential tool management companion. Select a toolbox, log your
          check, and generate forms with ease.
        </p>
      </div>

      <div className={styles.gridWrapper}>
        <h2>Select a box</h2>
        <ul>
          {toolboxes.map((box, i) => {
            const Icon = box.icon;
            return (
              <li key={i} style={{ animationDelay: `0.${i}s` }}>
                <Link
                  to={box.available ? `/toolbox/${box.url}` : "/"}
                  className={styles.container__link}
                >
                  <div className={styles.container__img}>
                    <Icon />
                  </div>
                  <div className={styles.container__text}>
                    <p>{box.name}</p>
                    <p
                      style={{
                        color: !box.available && "var(--success-clr-1)",
                      }}
                    >
                      {box.available ? box.nsn : "Coming soon!"}
                    </p>
                  </div>
                  <div className={styles.container__arrow}>
                    <NextIcon />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
