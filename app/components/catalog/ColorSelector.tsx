import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from '@uiw/color-convert';
import { useState } from "react";

import { HsvaColor } from '@uiw/color-convert';



interface ColorSelectorProps {
    setEditRow: (value: boolean) => void;
    changeRowColor: (hsva: HsvaColor) => void;
}

export default function ColorSelector({ setEditRow, changeRowColor }: ColorSelectorProps) {
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

    return (
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
                <button className="bg-main_1 px-4 py-2 roudned text-white w-full hover:bg-main_3 transition 250 ease-in-out" onClick={() => changeRowColor(hsva)}>Update</button>
            </div>
        </div>
    )

}