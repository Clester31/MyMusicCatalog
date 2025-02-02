import { catalog, catalogItem } from "@/app/types"
import { useEffect, useState } from "react"
import CatalogEntry from "./CatalogEntry";
import { useAuth } from "@/app/lib/AuthContext";

export default function GeneralCatalog({ currentCatalog, editPermissions }: { currentCatalog: catalog, editPermissions: boolean }) {
    const [allCatalogItems, setAllCatalogItems] = useState<catalogItem[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        setAllCatalogItems(currentCatalog.catalogItems);
    }, [currentCatalog])

    return (
        <div className="w-full flex flex-row gap-4 mt-8">
            {
                allCatalogItems.map((catalogItem, idx) => {
                    return (
                        <CatalogEntry key={idx} cid={currentCatalog.cid} item={catalogItem} editPermissions={editPermissions} user={user} />
                    )
                })
            }
        </div>
    )
}