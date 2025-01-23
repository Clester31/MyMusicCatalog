import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const signUpWithEmail = async (email: string, username: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
        });
    } catch (error: any) {
        throw error.message;
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials.user;
    } catch (error: any) {
        throw error.message;
    }
}

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error: any) {
        throw error.message;
    }
}

export const fetchUserInfo = async (uid: string) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if(userDoc.exists()) {
            //console.log(userDoc.data().username);
            return userDoc.data();
        }
    } catch (error: any) {
        throw error.message;
    }
}
