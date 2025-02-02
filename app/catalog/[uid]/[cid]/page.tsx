/* eslint-disable @next/next/no-img-element */
"use client"

import { useAuth } from "@/app/lib/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { user, catalog } from "@/app/types";
import { fetchUserInfo } from "@/app/auth";
import MonthlyCatalog from "@/app/components/catalog/MonthlyCatalog";
import GeneralCatalog from "@/app/components/catalog/GeneralCatalog";

export default function CatalogPost() {
    const params = useParams();
    const uid = params.uid
    const cid = params.cid;

    const { user } = useAuth();
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<user | null>(null);
    const [currentCatalog, setCurrentCatalog] = useState<catalog | null>(null);
    const [catalogType, setCatalogType] = useState<string>('monthly');
    const [editPermissions, setEditPermissions] = useState<boolean>(false);

    useEffect(() => {
        if (uid && cid) {
            fetchUserInfo(uid).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                    const userCatalog = fetchedUserInfo.catalogs.find(item => item.cid === cid);
                    setCurrentCatalog(userCatalog || null);
                    if(uid === user.uid) {
                        setEditPermissions(true);
                    }
                }
            });
        }
    }, [cid, uid, currentCatalog])

    return (
        <div className="flex flex-col justify-center p-4">
            <div className=" flex flex-row bg-gradient-to-r from-main_1 to-main_2 border-4 border-main_2 rounded p-4 gap-4">
                <img src={currentCatalog?.catalogImage} alt="catalog cover" className="w-32 rounded border-2 border-main_2 "/>
                <div className="flex flex-col w-3/4">
                    <h1 className="text-3xl text-white font-semibold">{currentCatalog?.catalogTitle}</h1>
                    <h1 className="text-xl text-gray-200 w-3/4 mt-4">{currentCatalog?.catalogDescription}</h1>
                </div>
                <div className="w-1/4 flex flex-col text-2xl text-white justify-center items-start">
                    <h1><span className="font-semibold">Created by:</span> {userInfo?.username}</h1>
                    <h1><span className="font-semibold">Total items:</span> {currentCatalog?.catalogItems.length}</h1>
                </div>
            </div>
            <div className="flex flex-col items-center mt-8">
            <div>
                    <button
                        className={`${catalogType === 'monthly' ? 'bg-main_3' : 'bg-main_1'} transition 500 ease-in-out w-48 px-8 py-2 text-xl text-white rounded-l-3xl`}
                        onClick={() => {
                            setCatalogType('monthly')
                        }}
                    >
                        Monthly
                    </button>
                    <button
                        className={`${catalogType === 'general' ? 'bg-main_3' : 'bg-main_1'} transition 500 ease-in-out w-48 px-8 py-2 text-xl text-white rounded-r-3xl`}
                        onClick={() => {
                            setCatalogType('general')
                        }}
                    >
                        All Items
                    </button>
                </div>
                {
                    currentCatalog &&
                    (
                        catalogType === 'monthly' ?
                        <MonthlyCatalog currentCatalog={currentCatalog} editPermissions={editPermissions} />
                        :
                        <GeneralCatalog currentCatalog={currentCatalog} editPermissions={editPermissions} />
                    )
                }
            </div>
        </div>
    )
}