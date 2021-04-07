import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import { ProfileImage } from "../ProfileImage";

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const docRef = firestore.collection("users").doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
        Object.entries(documentData).forEach(([key, val]) => {
          setValue(key, val);
        });
      }
    });
    return unsubscribe;
  }, [user.uid, setValue, params.id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUserDocument({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!userDocument) {
    return null;
  }

  const formClassName = `${isLoading ? "loading" : ""}`;
  return (
    <div className={styles.profilePage}>
      <div>
        <ProfileImage id={params.id} />
      </div>
      <div className={styles.formWrapper}>
        <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Name</label>
              <input type="text" name="name" {...register("name")} />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input type="text" name="email" {...register("email")} />
            </div>
            <div className={styles.field}>
              <label>Phone</label>
              <input type="text" name="phone" {...register("phone")} />
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Address</label>
              <input type="text" name="address" {...register("address")} />
            </div>
            <div className={styles.field}>
              <label>City</label>
              <input type="text" name="city" {...register("city")} />
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>State</label>
              <input type="text" name="state" {...register("state")} />
            </div>
            <div className={styles.field}>
              <label>Zip</label>
              <input type="text" name="zip" {...register("zip")} />
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Specialty</label>
              <select name="specialty" {...register("specialty")}>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="QA">QA</option>
                <option value="Project Manager">Project Manager</option>
              </select>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
