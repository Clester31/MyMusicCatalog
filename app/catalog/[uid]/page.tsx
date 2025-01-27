"use client"

import { fetchUserInfo } from '@/app/auth';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { catalog, user } from '@/app/types';
import AddCatalogDisplay from '@/app/components/catalog/AddCatalogDisplay';
import { useAuth } from '@/app/lib/AuthContext';

export default function Catalog() {
    const params = useParams();
    const uid = params.uid;

    const { user } = useAuth();

    const [userInfo, setUserInfo] = useState<user | null>(null);
    const [userCatalog, setUserCatalog] = useState<catalog[]>([]);
    const [showAddAlbumDisplay, setShowAddAlbumDisplay] = useState<boolean>(false);

    useEffect(() => {
        if (uid) {
            fetchUserInfo(uid).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                    console.log(fetchedUserInfo);
                }
            });
            if (userInfo?.catalogs) {
                setUserCatalog(userInfo.catalogs);
            }
        }
    }, [uid])

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {
                userCatalog.length > 0 ?
                    userCatalog.map((catalog, idx) => {
                        return (
                            <div key={idx} className='flex flex-row'>
                                <h1>{catalog.catalogTitle}</h1>
                                <p>{catalog.catalogDescription}</p>
                            </div>
                        )
                    })
                    :
                    <div className='flex flex-col text-center items-center gap-4'>
                        <h1 className='text-2xl'>Your catalog is empty. Create a new entry.</h1>
                        <button
                            className='bg-main_1 hover:bg-main_3 transition 250 ease-in-out px-8 py-6 text-6xl rounded text-white'
                            onClick={() => setShowAddAlbumDisplay(true)}
                        >
                            +
                        </button>
                    </div>
            }
            {
                showAddAlbumDisplay &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <AddCatalogDisplay setShowAddAlbumDisplay={setShowAddAlbumDisplay} uid={user.uid} />
                </div>
            }
        </div>
    );
};