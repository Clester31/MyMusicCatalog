import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "@/firebaseConfig";
import { catalog, catalogItem, user } from "./types";

export const signUpWithEmail = async (email: string, username: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const storage = getStorage();
        const imageRef = ref(storage, 'defaultItems/defaultpfp.png');
        const imageUrl = await getDownloadURL(imageRef);

        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            profilePicture: imageUrl,
            catalogs: [],
            lists: []
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

export const fetchUserInfo = async (uid: string): Promise<user | null> => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        const data = userDoc.data();
        if (data) {
            return {
                uid: data.uid,
                username: data.username,
                email: data.email,
                profilePicture: data.profilePicture,
                catalogs: data.catalogs,
                lists: data.lists
            }
        }
        return null;
    } catch (error: any) {
        throw error.message;
    }
}

export const updateUsername = async (uid: string, newUsername: string) => {
    try {
        await updateDoc(doc(db, "users", uid), {
            username: newUsername
        });
    } catch (error: any) {
        throw error.message;
    }
}

export const updateProfilePicture = async (uid: string, newProfilePicture: string) => {
    // try {
    //     await updateDoc(doc(db, "users", uid), {

    //     })
    // } catch (error) {
        
    // }
}

export const createCatalog = async (uid: string, newCatalog: catalog) => {
    try {
        await updateDoc(doc(db, "users", uid), {
            catalogs: arrayUnion({
                cid: newCatalog.cid,
                catalogTitle: newCatalog.catalogTitle,
                catalogDescription: newCatalog.catalogDescription,
                catalogItems: newCatalog.catalogItems
            })
        })
    } catch (error: any) {
        throw error.message;
    }
}

export const updateCatalog = async (uid: string, newCatalogEntry: catalogItem) => {

}
