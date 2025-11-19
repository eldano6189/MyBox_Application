import styles from "./card.module.css";

const Card = () => {
  return <li className={styles.container} style={{animationDelay: `0.${i}s`}}>
  <Link
    to={box.available ? `/toolbox/${box.url}` : "/"}
    className={styles.container__link}
  >
    <div className={styles.container__img}>
      <Icon />
    </div>
    <div className={styles.container__text}>
      <p>{box.name}</p>
      <p style={{ color: !box.available && "var(--main-clr)" }}>
        {box.available ? box.nsn : "Coming soon!"}
      </p>
    </div>
    <div className={styles.container__arrow}>
      <NextIcon />
    </div>
  </Link>
</li>;
};

export default Card;
