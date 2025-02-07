"use client";

import { fetchCatalog, fetchUserInfo } from '@/app/auth';
/* eslint-disable @next/next/no-img-element */
import { catalog, user } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CatalogItemProps {
    cid: string;
    canEdit: boolean;
    uid: string;
    removeCatalog: (uid: string, cid: string) => void;
    router: ReturnType<typeof useRouter>;
}

export default function CatalogItem({ cid, canEdit, uid, removeCatalog, router }: CatalogItemProps) {
    const [catalog, setCatalog] = useState<catalog | null>(null);
    const [userInfo, setUserInfo] = useState<user | null>(null);

    useEffect(() => {
        fetchCatalog(cid).then(fetchedCatalog => {
            if (fetchedCatalog) {
                setCatalog(fetchedCatalog);
                fetchUserInfo(fetchedCatalog.catalogCreatedBy).then(fetchedUserInfo => {
                    if (fetchedUserInfo) {
                        setUserInfo(fetchedUserInfo);
                    }
                });
            }
        });
    }, [cid]);

    return (
        <div
            className="flex flex-row p-4 bg-gray-200 border-4 border-gray-300 rounded-lg shadow-lg w-2/3 hover:border-main_1 transition 250 ease-in-out cursor-pointer items-center"
            onClick={() => router.push(`/catalog/${uid}/${cid}`)}
        >

            {catalog && (
                <>
                    <img
                        className="w-40 h-40 rounded"
                        src={catalog.catalogImage}
                        alt="catalog image"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="flex flex-col p-4 gap-2 w-3/5">
                        <h1 className="text-4xl font-semibold">{catalog.catalogTitle}</h1>
                        <p className="text-xl p-2">{catalog.catalogDescription}</p>
                    </div>
                    <div className="text-2xl items-center justify-center flex flex-col w-1/5">
                        <h1 className="flex flex-col">
                            Created By:<span className="font-semibold">{userInfo?.username}</span>
                        </h1>
                    </div>
                </>
            )}

            {canEdit && (
                <div className="flex justify-end w-1/5">
                    <button
                        className="bg-red-500 px-2 rounded text-lg text-white h-12 hover:bg-red-400 transition 250 ease-in-out"
                        onClick={() => {
                            if (catalog) {
                                removeCatalog(uid, catalog.cid);
                            }
                            router.push(`/catalog/${uid}`);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
            
        </div>
    );
}
