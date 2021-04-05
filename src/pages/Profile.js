import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";

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
    <div>
      <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label>
              Name
              <input type="text" name="name" {...register("name")} />
            </label>
          </div>
          <div>
            <label>
              Email
              <input type="text" name="email" {...register("email")} />
            </label>
          </div>
        </div>
        <div>
          <div>
            <label>
              Address
              <input type="text" name="address" {...register("address")} />
            </label>
          </div>
          <div>
            <label>
              City
              <input type="text" name="city" {...register("city")} />
            </label>
          </div>
          <div>
            <label>
              State
              <input type="text" name="state" {...register("state")} />
            </label>
          </div>
          <div>
            <label>
              Zip
              <input type="text" name="zip" {...register("zip")} />
            </label>
          </div>
        </div>
        <div>
          <div>
            <label>
              Phone
              <input type="text" name="phone" {...register("phone")} />
            </label>
          </div>
          <div>
            <label>
              Specialty
              <select name="specialty" {...register("specialty")}>
                <option value="field agent">Field Agent</option>
                <option value="covert operations">Covert Operations</option>
                <option value="intelligence officer">
                  Intelligence Officer
                </option>
              </select>
            </label>
          </div>
          <div>
            <label>
              ip
              <input type="text" name="ip" {...register("ip")} />
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
