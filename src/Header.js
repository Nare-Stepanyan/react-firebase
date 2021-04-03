import React from "react";
import styles from "./header.module.css";
import { logout } from "./firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "./firebase/UserProvider";

function Header() {
  const history = useHistory();
  const { user } = useSession();
  const logoutUser = async () => {
    await logout();
    history.push("/signup");
  };
  return (
    <div className={styles.header}>
      <h2>Find Me</h2>
      {!!user && (
        <button className={styles.logout} onClick={logoutUser}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Header;
