import { useEffect, useState } from "react";
import { catalog, catalogItem } from "@/app/types";
import MonthRow from "./MonthRow";

export default function MonthlyCatalog({ currentCatalog }: { currentCatalog: catalog }) {
    const [monthlyItems, setMonthlyItems] = useState<catalogItem[][]>(Array.from({ length: 12 }, () => []));
    const [defaultColors, setDefaultColors] = useState<string[]>(
        [
            "#FF6666", // Light Red
            "#FF7F50", // Coral
            "#FFA500", // Orange
            "#FFEC8B", // Light Goldenrod Yellow
            "#BFFF00", // Lime
            "#66CD66", // Pale Green
            "#66FFB2", // Aquamarine
            "#66D9E8", // Sky Blue
            "#63B8FF", // Light Sky Blue
            "#AB82FF", // Light Purple
            "#FFB6C1", // Light Pink
            "#FF6EB4"  // Pale Violet Red
        ]
    )

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
                            <MonthRow monthItems={monthItems} month={monthIdx} color={defaultColors[monthIdx]} />
                        </div>
                    );
                })
            }
        </div>
    )
}