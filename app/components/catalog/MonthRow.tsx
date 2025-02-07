import { getMonth } from "@/app/app";
import { catalogItem } from "@/app/types";
import CatalogEntry from "./CatalogEntry";
import { useState } from "react";
import { HsvaColor, hsvaToHex } from '@uiw/color-convert';
import { useAuth } from "@/app/lib/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ColorSelector from "./ColorSelector";

export default function MonthRow({ cid, monthItems, month, year, color, setDefaultColors, editPermissions }: 
    { cid: string, monthItems: catalogItem[], month: number, year: number, color: string, setDefaultColors: (colors: string[]) => void, editPermissions: boolean }) {
    const [editRow, setEditRow] = useState<boolean>(false);
    const { user } = useAuth();

    const changeRowColor = async (hsva: HsvaColor) => {
        const hexColor = hsvaToHex(hsva);
        let newColors: string[] = [];
        newColors = [...color];
        newColors[month] = hexColor;
        setDefaultColors(newColors);
        if (user) {
            const catalogDoc = await getDoc(doc(db, 'catalogs', cid));
            if(catalogDoc.exists()) {
                const catalogData = catalogDoc.data();
                const updatedColors = catalogData.catalogDefaultColors;
                updatedColors[month] = hexColor;
                await updateDoc(doc(db, 'catalogs', cid), {
                    catalogDefaultColors: updatedColors
                });
            }
        }
        setEditRow(false);
    };

    return (
        <div className="w-full p-4 flex flex-col gap-2" style={{ backgroundColor: color }}>
            {editRow && <ColorSelector setEditRow={setEditRow} changeRowColor={changeRowColor} />}
            <div className="text-2xl font-bold flex flex-row gap-4 items-center">
                <h1 className="text-3xl">{getMonth(month)}</h1>
                {editPermissions && (
                    <button
                        className="bg-white hover:bg-gray-200 transition 250 ease-in-out rounded p-2 rounded-md h-8 flex items-center"
                        onClick={() => setEditRow(!editRow)}
                    >
                        <i className="fa-solid fa-pencil text-sm"></i>
                    </button>
                )}
            </div>
            <div className="flex flex-row gap-4">
                {monthItems.length > 0 ? (
                    monthItems
                        .filter(item => item.itemDate[2] === year)
                        .map((item, idx) => user && <CatalogEntry key={idx} cid={cid} item={item} editPermissions={editPermissions} uid={user.uid} />)
                ) : (
                    <div>
                        
                    </div>
                )}
            </div>
        </div>
    );
}
