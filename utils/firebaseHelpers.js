// utils/firebaseHelpers.js
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

export async function getProfileById(id) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
