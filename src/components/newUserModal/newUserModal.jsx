import styles from "./newUserModal.module.css";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import GlobalContextProvider from "../../context/globalContext";
import Button from "../button/button";

const NewUserModal = () => {
  const { user } = useContext(GlobalContextProvider);
  const navigate = useNavigate();
  const location = useLocation();

  const isNewUser = !user || Object.keys(user).length === 0;

  const navigateToSettings = () => {
    navigate("/settings");
  };

  console.log(location);

  if (!isNewUser || location.pathname === "/settings") return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1>Looks like your new here!</h1>
        <p>
          To use this application, you’ll need to provide some basic information
          so we can automatically populate your forms.
        </p>
        <p>
          All information is stored only in your device’s localStorage. No
          external database or server is used, so your details stay on your
          device and are not shared with anyone.
        </p>
        <Button text="Settings" fill onClick={navigateToSettings} />
      </div>
    </div>
  );
};

export default NewUserModal;
