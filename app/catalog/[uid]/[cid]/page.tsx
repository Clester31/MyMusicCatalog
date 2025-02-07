/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { user, catalog } from "@/app/types";
import { fetchCatalog, fetchUserInfo } from "@/app/auth";
import MonthlyCatalog from "@/app/components/catalog/MonthlyCatalog";
import GeneralCatalog from "@/app/components/catalog/GeneralCatalog";

export default function CatalogPost() {
    const params = useParams();
    const uid = params.uid;
    const cid = params.cid;

    const [userInfo, setUserInfo] = useState<user | null>(null);
    const [currentCatalog, setCurrentCatalog] = useState<catalog | null>(null);
    const [catalogType, setCatalogType] = useState<string>("monthly");
    const [editPermissions, setEditPermissions] = useState<boolean>(false);

    useEffect(() => {
        if (uid && cid) {
            fetchCatalog(Array.isArray(cid) ? cid[0] : cid).then((fetchedCatalog) => {
                if (fetchedCatalog) {
                    if (fetchedCatalog.catalogCreatedBy === uid) {
                        setEditPermissions(true);
                    }
                    setCurrentCatalog(fetchedCatalog);
                    fetchUserInfo(Array.isArray(uid) ? uid[0] : uid).then((fetchedUserInfo) => {
                        if (fetchedUserInfo) {
                            setUserInfo(fetchedUserInfo);
                        }
                    });
                }
            });
        }
    }, [cid, uid, currentCatalog]);

    return (
        <div className="flex flex-col justify-center p-4">

            <div className="flex flex-row bg-gradient-to-r from-main_1 to-main_2 rounded p-4 gap-4 mt-32">

                <img
                    src={currentCatalog?.catalogImage}
                    alt="catalog cover"
                    className="w-32 rounded"
                />

                <div className="flex flex-col w-3/4">
                    <h1 className="text-3xl text-white font-semibold">
                        {currentCatalog?.catalogTitle}
                    </h1>
                    <h1 className="text-xl text-gray-200 w-3/4 mt-4">
                        {currentCatalog?.catalogDescription}
                    </h1>
                </div>

                <div className="w-1/3 flex flex-row text-2xl text-white justify-center items-center gap-8">

                    <div className="flex flex-col">
                        <h1>
                            <span className="font-semibold">Created by:</span>{" "}
                            {userInfo?.username}
                        </h1>
                        <h1>
                            <span className="font-semibold">Total items:</span>{" "}
                            {currentCatalog?.catalogItems.length}
                        </h1>
                    </div>

                    <div>
                        <img
                            src={userInfo?.profilePicture}
                            style={{
                                objectFit: "cover",
                                borderRadius: "100%",
                                width: "72px",
                                height: "72px",
                            }}
                        />
                    </div>

                </div>

            </div>

            <div className="flex flex-col items-center mt-8">

                <div>
                    
                    <button
                        className={`${
                            catalogType === "monthly" ? "bg-main_3" : "bg-main_1"
                        } transition 500 ease-in-out w-48 px-8 py-2 text-xl text-white rounded-l-3xl`}
                        onClick={() => {
                            setCatalogType("monthly");
                        }}
                    >
                        Monthly
                    </button>

                    <button
                        className={`${
                            catalogType === "general" ? "bg-main_3" : "bg-main_1"
                        } transition 500 ease-in-out w-48 px-8 py-2 text-xl text-white rounded-r-3xl`}
                        onClick={() => {
                            setCatalogType("general");
                        }}
                    >
                        All Items
                    </button>

                </div>

                {currentCatalog &&
                    (catalogType === "monthly" ? (
                        <MonthlyCatalog
                            currentCatalog={currentCatalog}
                            editPermissions={editPermissions}
                        />
                    ) : (
                        <GeneralCatalog
                            currentCatalog={currentCatalog}
                            editPermissions={editPermissions}
                        />
                    ))}

            </div>

        </div>
    );
}