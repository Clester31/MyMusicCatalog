import { useEffect, useState } from "react";
import { catalog, catalogItem, user } from "@/app/types";
import MonthRow from "./MonthRow";

export default function MonthlyCatalog({ currentCatalog }: { currentCatalog: catalog }) {
    const [monthlyItems, setMonthlyItems] = useState<catalogItem[][]>(Array.from({ length: 12 }, () => []));
    const [defaultColors, setDefaultColors] = useState<string[]>(currentCatalog.catalogDefaultColors)

    useEffect(() => {
        function sortItemsByMonth() {
            const sortedItems: catalogItem[][] = Array.from({ length: 12 }, () => []);
            currentCatalog.catalogItems.map((item) => {
                const monthIndex = item.itemDate[0] - 1;
                sortedItems[monthIndex].push(item);
            })
            setMonthlyItems(sortedItems);
        }

        sortItemsByMonth();
    }, [currentCatalog.catalogItems])

    return (
        <div className="w-full flex flex-col gap-4">
            <h1>Monthly</h1>
            {
                monthlyItems.map((monthItems, monthIdx) => {
                    return (
                        <div key={monthIdx}>
                            <MonthRow cid={currentCatalog.cid} monthItems={monthItems} month={monthIdx} color={defaultColors[monthIdx]} setDefaultColors={setDefaultColors} />
                        </div>
                    );
                })
            }
        </div>
    )
}