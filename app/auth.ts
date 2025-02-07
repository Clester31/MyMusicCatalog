import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "@/firebaseConfig";
import { catalog, catalogItem, track, user } from "./types";
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials.user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const updateUsername = async (uid: string, newUsername: string) => {
    try {
        await updateDoc(doc(db, "users", uid), {
            username: newUsername
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

// export const updateProfilePicture = async (uid: string, newProfilePicture: string) => {
//     // try {
//     //     await updateDoc(doc(db, "users", uid), {

//     //     })
//     // } catch (error) {

//     // }
// }

export const fetchCatalog = async (cid: string) => {
    try {
        const catalogData = await getDoc(doc(db, "catalogs", cid));
        return catalogData.data() as catalog;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const fetchAllCatalogs = async () => {
    try {
        const catalogsCollection = await getDocs(collection(db, "catalogs"));
        return catalogsCollection.docs.map(doc => doc.data() as catalog);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const createCatalog = async (uid: string, newCatalog: catalog) => {
    try {
        // Add the new catalog to the catalogs collection
        await setDoc(doc(db, "catalogs", newCatalog.cid), {
            cid: newCatalog.cid,
            catalogCreatedBy: newCatalog.catalogCreatedBy,
            catalogTitle: newCatalog.catalogTitle,
            catalogDescription: newCatalog.catalogDescription,
            catalogItems: newCatalog.catalogItems,
            catalogImage: newCatalog.catalogImage,
            catalogDefaultColors: newCatalog.catalogDefaultColors,
        });

        // Update the user's document to include only the catalog ID
        await updateDoc(doc(db, "users", uid), {
            catalogs: arrayUnion(newCatalog.cid)
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const removeCatalog = async (uid: string, cid: string) => {
    try {
        // Delete the catalog document from the catalogs collection
        await deleteDoc(doc(db, "catalogs", cid));

        // Update the user's document to remove the catalog ID
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedCatalogs = userData.catalogs.filter((catalogId: string) => catalogId !== cid);
            await updateDoc(doc(db, "users", uid), {
                catalogs: updatedCatalogs
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const addItemToCatalog = async (newCatalogEntry: catalogItem, cid: string) => {
    try {
        const catalogDoc = await getDoc(doc(db, "catalogs", cid));
        if (catalogDoc.exists()) {
            const catalogData = catalogDoc.data();
            const updatedCatalogItems = [...catalogData.catalogItems, newCatalogEntry];
            await updateDoc(doc(db, "catalogs", cid), {
                catalogItems: updatedCatalogItems
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const updateCatalogAlbumRating = async (cid: string, iid: string, newAlbumRating: number ) => {
    try {
        const catalogDoc = await getDoc(doc(db, "catalogs", cid));
        if (catalogDoc.exists()) {
            const catalogData = catalogDoc.data();
            const updatedCatalogItems = catalogData.catalogItems.map((item: catalogItem) => {
                if (item.iid === iid) {
                    return {
                        ...item,
                        itemRating: newAlbumRating
                    };
                }
                return item;
            });
            await updateDoc(doc(db, "catalogs", cid), {
                catalogItems: updatedCatalogItems
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const deleteAlbumFromCatalog = async (uid: string, cid: string, iid: string) => {
    try {
        const catalogDoc = await getDoc(doc(db, "catalogs", cid));
        if (catalogDoc.exists()) {
            const catalogData = catalogDoc.data();
            const updatedCatalogItems = catalogData.catalogItems.filter((item: catalogItem) => item.iid !== iid);
            await updateDoc(doc(db, "catalogs", cid), {
                catalogItems: updatedCatalogItems
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const updateCatalogTrackRating = async (cid: string, iid: string, trackNo: number, newTrackRating: number) => {
    try {
        const catalogDoc = await getDoc(doc(db, "catalogs", cid));
        if (catalogDoc.exists()) {
            const catalogData = catalogDoc.data();
            const updatedCatalogItems = catalogData.catalogItems.map((item: catalogItem) => {
                if (item.iid === iid) {
                    const updatedTracks = item.itemTracks.map((track: track, index: number) => {
                        if (index === trackNo) {
                            return {
                                ...track,
                                trackRating: newTrackRating
                            }
                        }
                        return track;
                    });
                    return {
                        ...item,
                        itemTracks: updatedTracks
                    }
                }
                return item;
            });
            await updateDoc(doc(db, "catalogs", cid), {
                catalogItems: updatedCatalogItems
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const addImageToStorage = async (file: File, uid: string, location: string) => {
    const storageRef = ref(storage, `users/${uid}/${location}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}
