import React, { useState } from "react";
import styles from "./signup.module.css";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";

function Login(props) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let user;
    setLoading(true);
    try {
      user = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }
    if (user) {
      props.history.push(`/profile/${user.uid}`);
    } else {
      setLoading(false);
    }
  };

  const formClassName = `${loading ? "loading" : ""}`;
  return (
    <>
      <div className={styles.formWrapper}>
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className={formClassName}>
          <div className={styles.formFields}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              defaultValue=""
              {...register("email")}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              defaultValue=""
              {...register("password")}
            />

            <input type="submit" value="Sign in" className={styles.btnSignIn} />
          </div>
          <div className={styles.loginedUser}>
            <span>New to FindMe? </span>
            <Link to="/signup">
              <span className={styles.alreadyLogined}>Join now</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
