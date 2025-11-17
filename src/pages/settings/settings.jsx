import styles from "./settings.module.css";
import { useContext, useState } from "react";
import Button from "../../components/button/button";
import GlobalContextProvider from "../../context/globalContext";

const Settings = () => {
  const { user, setUser } = useContext(GlobalContextProvider);
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      servNo: formData.get("servNo"),
      rank: formData.get("rank"),
      surename: formData.get("surename"),
      uin: formData.get("uin"),
    };
    setEdit(false);
    setUser(user);
  };

  return (
    <div className={styles.container}>
      <h1>Your details</h1>
      <p>Please fill in the details below to allow use of this application.</p>
      {edit ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__item}>
            <p>Service Number*</p>
            <input
              required
              name="servNo"
              defaultValue={user.servNo}
              type="text"
            />
          </div>
          <div className={styles.form__item}>
            <p>Rank*</p>
            <input required name="rank" defaultValue={user.rank} type="text" />
          </div>
          <div className={styles.form__item}>
            <p>Surname*</p>
            <input
              required
              name="surename"
              defaultValue={user.surename}
              type="text"
            />
          </div>
          <div className={styles.form__item}>
            <p>UIN*</p>
            <input required name="uin" defaultValue={user.uin} type="text" />
          </div>
          <Button text="Save" fill />
        </form>
      ) : (
        <div className={styles.form}>
          <div className={styles.form__item}>
            <p>Service Number*</p>
            <h2>{user.servNo}</h2>
          </div>
          <div className={styles.form__item}>
            <p>Rank*</p>
            <h2>{user.rank}</h2>
          </div>
          <div className={styles.form__item}>
            <p>Surname*</p>
            <h2>{user.surename}</h2>
          </div>
          <div className={styles.form__item}>
            <p>UIN*</p>
            <h2>{user.uin}</h2>
          </div>
          <Button text="Edit" fill onClick={() => setEdit(true)} />
        </div>
      )}
    </div>
  );
};

export default Settings;
