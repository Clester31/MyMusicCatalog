import { createCatalog } from "@/app/auth";
import { catalog } from "@/app/types";
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export default function AddCatalogDisplay({ setShowAddAlbumDisplay, uid }) {
    const [catalogTitle, setCatalogTitle] = useState<string>('');
    const [catalogDescription, setCatalogDescription] = useState<string>('');

    const addNewCatalog = async () => {
        const newCatalog: catalog = {
            cid: uuidv4(),
            catalogTitle: catalogTitle,
            catalogDescription: catalogDescription,
            catalogItems: []
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
                <h1 className="font-semibold text-xl">Catalog Description (max: 200)</h1>
                <textarea className="resize-none w-4/5 border-2 border-gray-200 p-4" rows={7} maxLength={200} onChange={(e) => setCatalogDescription(e.target.value)} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded py-4 gap-2 w-full border-gray-200 border-2">
                <h1 className="font-semibold text-xl">Upload Image</h1>
            </div>
            <button className="flex justify-center m-auto bg-main_1 hover:bg-main_3 transition 250 ease-in-out w-1/2 py-2 items-center text-white rounded" onClick={addNewCatalog}>Create Catalog</button>
        </div>
    )
}