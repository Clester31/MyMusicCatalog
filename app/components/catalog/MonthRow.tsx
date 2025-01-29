/* eslint-disable @next/next/no-img-element */
import { getMonth } from "@/app/app";
import { catalogItem } from "@/app/types";
import StarRating from "../search/StarRating";
import CatalogEntry from "./CatalogEntry";

export default function MonthRow({ monthItems, month, color }: { monthItems: catalogItem[], month: number, color: string }) {
    return (
        <div className="w-full p-4 flex flex-col gap-2" style={{ backgroundColor: color }}>
            <div className="text-2xl font-bold">
                <h1>{getMonth(month)}</h1>
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