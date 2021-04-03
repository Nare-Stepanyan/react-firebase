import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  //const [register, setValue] = useForm();
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    const docRef = firestore.collection("users").doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
      }
    });
    return unsubscribe;
  }, [user.uid]);
  if (!userDocument) {
    return null;
  }
  return (
    <div>
      <p>{JSON.stringify(userDocument)}</p>
    </div>
  );
};

export default Profile;
