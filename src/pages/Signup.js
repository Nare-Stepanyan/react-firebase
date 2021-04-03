import React, { useState } from "react";
import styles from "./signup.module.css";
import { useForm } from "react-hook-form";
import { signup } from "../firebase/auth";

function Signup(props) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
      reset();
    } catch (error) {
      console.log(error);
    }
    if (newUser) {
      props.history.push(`/profile/${newUser.uid}`);
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
            <label>Firstname</label>
            <input
              type="text"
              name="firstName"
              defaultValue=""
              {...register("firstName")}
            />
            <label>Lastname</label>
            <input
              type="text"
              name="lastName"
              defaultValue=""
              {...register("lastName")}
            />
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

            <input type="submit" value="Join" className={styles.btnSignIn} />
          </div>
          <div className={styles.loginedUser}>
            <span>Already on FindMe?</span>
            <span className={styles.alreadyLogined}>Sign in</span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
