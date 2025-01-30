/* eslint-disable @next/next/no-img-element */
import { getMonth } from "@/app/app";
import { catalogItem } from "@/app/types";
import StarRating from "../search/StarRating";
import CatalogEntry from "./CatalogEntry";
import { useState } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from '@uiw/color-convert';
import { useAuth } from "@/app/lib/AuthContext";
import { fetchUserInfo } from "@/app/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function MonthRow({ cid, monthItems, month, color, setDefaultColors }: { cid:string, monthItems: catalogItem[], month: number, color: string, setDefaultColors: (colors: string[]) => void }) {
    const [editRow, setEditRow] = useState<boolean>(false);
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

    const { user } = useAuth();

    const changeRowColor = () => {
        const hexColor = hsvaToHex(hsva);
        let newColors: string[];
        //console.log(hexColor)
        setDefaultColors((prevColors: string[]) => {
            newColors = [...prevColors];
            newColors[month] = hexColor;
            return newColors;
        });
        if(user) {
            fetchUserInfo(user.uid).then(fetchedUserInfo => {
                const updatedCatalogs = fetchedUserInfo.catalogs.map(catalog => {
                    if (catalog.cid === cid) {
                        return { ...catalog, catalogDefaultColors: newColors };
                    }
                    return catalog;
                });
                // Assuming you have a function to update user info
                updateDoc(doc(db, "users", user.uid), { catalogs: updatedCatalogs });
            })
        }
        setEditRow(false);
    }

    return (
        <div className="w-full p-4 flex flex-col gap-2" style={{ backgroundColor: color }}>
            {
                editRow &&
                <div className="absolute bg-white rounded border-2 border-gray-200 flex flex-col z-10">
                    <div className="flex flex-row justify-between w-64 p-2">
                        <h1>Edit Color</h1>
                        <h1 className="font-bold hover:text-red-500" onClick={() => setEditRow(false)}>X</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <Wheel color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
                        <div style={{ width: '100%', height: 34, marginTop: 20, background: hsvaToHex(hsva) }}></div>
                    </div>
                    <div>
                        <button className="bg-main_1 px-4 py-2 roudned text-white w-full hover:bg-main_3 transition 250 ease-in-out" onClick={changeRowColor}>Update</button>
                    </div>
                </div>
            }
            <div className="text-2xl font-bold flex flex-row gap-4 items-center">
                <h1 className="text-3xl">{getMonth(month)}</h1>
                <button
                    className="bg-white hover:bg-gray-200 transition 250 ease-in-out roudned p-2 rounded-md h-8 flex items-center"
                    onClick={() => setEditRow(!editRow)}
                >
                    <i className="fa-solid fa-pencil text-sm"></i>
                </button>
            </div>
            <div className="flex flex-row gap-2">
                {
                    monthItems.length > 0 ?
                        monthItems.map((item, idx) => (
                            <CatalogEntry key={idx} item={item} />
                        ))
                        :
                        <div>
                            <h1>Nothing Here</h1>
                        </div>
                }
            </div>

        </div>
    )
}