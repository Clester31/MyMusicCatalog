import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "@/firebaseConfig";
import { catalog, catalogItem, user } from "./types";
import { storage } from '../firebaseConfig'

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
    } catch (error) {
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
                catalogItems: newCatalog.catalogItems,
                catalogImage: newCatalog.catalogImage
            })
        })
    } catch (error: any) {
        throw error.message;
    }
}

export const removeCatalog = async (uid: string, cid: string) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedCatalogs = userData.catalogs.filter((catalog: catalog) => catalog.cid !== cid);
            await updateDoc(doc(db, "users", uid), {
                catalogs: updatedCatalogs
            });
        }
    } catch (error: any) {
        throw error.message;
    }
}

export const addItemToCatalog = async (uid: string, newCatalogEntry: catalogItem, cid: string) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if(userDoc.exists()) {
            const userData = userDoc.data();
            const updatedCatalogs = userData.catalogs.map((catalog: catalog) => {
                if (catalog.cid === cid) {
                    return {
                        ...catalog,
                        catalogItems: [...catalog.catalogItems, newCatalogEntry]
                    };
                }
                return catalog;
            });
            await updateDoc(doc(db, "users", uid), {
                catalogs: updatedCatalogs
            });
        }
    } catch (error: any) {
        throw error.message;
    }
}

export const addImageToStorage = async (file: File, uid: string, location: string) => {
    const storageRef = ref(storage, `users/${uid}/${location}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}
