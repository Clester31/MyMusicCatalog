import { useEffect, useState } from "react";
import { catalog, catalogItem } from "@/app/types";
import MonthRow from "./MonthRow";

export default function MonthlyCatalog({ currentCatalog, editPermissions }: { currentCatalog: catalog, editPermissions: boolean }) {
    const [monthlyItems, setMonthlyItems] = useState<catalogItem[][]>(Array.from({ length: 12 }, () => []));
    const [defaultColors, setDefaultColors] = useState<string[]>(currentCatalog.catalogDefaultColors);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        function sortItemsByMonth() {
            const sortedItems: catalogItem[][] = Array.from({ length: 12 }, () => []);
            currentCatalog.catalogItems.forEach((item) => {
                const monthIndex = item.itemDate[0] - 1;
                sortedItems[monthIndex].push(item);
            });
            setMonthlyItems(sortedItems);
        }

        sortItemsByMonth();
    }, [currentCatalog.catalogItems]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-center mt-4 text-4xl items-center gap-8">
                <button className="disabled:text-blue-500/25 hover:text-main_1 transition 250 ease-in-out cursor-pointer" onClick={() => setYear((prev) => prev - 1)}><i className="fa-solid fa-caret-left "></i></button>
                <h1>{year}</h1>
                <button disabled={year === new Date().getFullYear()} className="disabled:text-blue-500/25 hover:text-main_1 transition 250 ease-in-out cursor-pointer" onClick={() => setYear((prev) => prev + 1)}><i className="fa-solid fa-caret-right "></i></button>
            </div>
            {monthlyItems.map((monthItems, monthIdx) => (
                <div key={monthIdx}>
                    <MonthRow
                        cid={currentCatalog.cid}
                        monthItems={monthItems}
                        month={monthIdx}
                        year={year}
                        color={defaultColors[monthIdx]}
                        setDefaultColors={setDefaultColors}
                        editPermissions={editPermissions}
                    />
                </div>
            ))}
        </div>
    );
}