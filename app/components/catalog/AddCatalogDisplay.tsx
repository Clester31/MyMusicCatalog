/* eslint-disable @next/next/no-img-element */
import { addImageToStorage, createCatalog } from "@/app/auth";
import { catalog } from "@/app/types";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'

export default function AddCatalogDisplay({ setShowAddAlbumDisplay, uid }: { uid: string }) {
    const [catalogTitle, setCatalogTitle] = useState<string>('');
    const [catalogDescription, setCatalogDescription] = useState<string>('');
    const [imageURL, setImageUrl] = useState<File | null>(null);

    const router = useRouter();

    const addNewCatalog = async () => {
        if (imageURL === null) {
            throw new Error("Image URL cannot be null");
        }
        const catalogImageURL: string = await addImageToStorage(imageURL, uid, '/catalogImages');
        const newCatalog: catalog = {
            cid: uuidv4(),
            catalogTitle: catalogTitle,
            catalogDescription: catalogDescription,
            catalogItems: [],
            catalogImage: catalogImageURL
        };

        createCatalog(uid, newCatalog);
        setCatalogTitle('');
        setCatalogDescription('');
        setShowAddAlbumDisplay(false);
    }

    return (
        <div className="flex flex-col w-1/3 bg-white p-8 text-center text-lg gap-4 overflow-y-auto h-3/5 rounded border-2 border-gray-300">
            <p
                onClick={() => setShowAddAlbumDisplay(false)}
                className="flex justify-end text-xl hover:text-red-500 w-min cursor-pointer font-bold"
            >
                X
            </p>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded py-4 gap-2 w-full border-gray-200 border-2">
                <h1 className="font-semibold text-xl">Catalog Title</h1>
                <input type="text" className="w-4/5 border-2 border-gray-300 text-2xl h-16 px-4" onChange={(e) => setCatalogTitle(e.target.value)} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded py-4 gap-2 w-full border-gray-200 border-2">
                <h1 className="font-semibold text-xl">Catalog Description (max: 250)</h1>
                <textarea className="resize-none w-4/5 border-2 border-gray-200 p-4" rows={7} maxLength={250} onChange={(e) => setCatalogDescription(e.target.value)} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded py-4 gap-2 w-full border-gray-200 border-2">
                <h1 className="font-semibold text-xl">Upload Image</h1>
                <div className="flex flex-row gap-16 items-center mt-4">
                    <input type="file" id="fileInput" className="hidden" onChange={(e) => setImageUrl(e.target.files[0])} />
                    <button
                        className="bg-main_1 hover:bg-main_3 transition 250 ease-in-out py-2 px-4 text-white rounded h-1/3"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        Choose File
                    </button>
                    {
                        imageURL ?
                        <img className="w-48" src={URL.createObjectURL(imageURL)} alt="uploaded catalog image rounded"/>
                        :
                        <div className="flex h-48 w-48 text-center justify-center items-center border-gray-300 border-4 rounded">
                            <h1>No Image Uploaded</h1>
                        </div>
                    }
                </div>

            </div>
            <button className="disabled:bg-blue-500/25 flex justify-center m-auto bg-main_1 hover:bg-main_3 transition 250 ease-in-out w-1/2 py-2 items-center text-white rounded" onClick={() => {
                addNewCatalog();
                router.push(`/catalog/${uid}`);
            }} disabled={!catalogTitle || !imageURL}>Create Catalog</button>
        </div>
    )
}