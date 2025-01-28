/* eslint-disable @next/next/no-img-element */
"use client"

import { fetchUserInfo, removeCatalog } from '@/app/auth';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { catalog, user } from '@/app/types';
import AddCatalogDisplay from '@/app/components/catalog/AddCatalogDisplay';
import { useAuth } from '@/app/lib/AuthContext';

export default function Catalog() {
    const params = useParams();
    const uid = params.uid;

    const { user } = useAuth();
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<user | null>(null);
    const [userCatalog, setUserCatalog] = useState<catalog[]>([]);
    const [showAddAlbumDisplay, setShowAddAlbumDisplay] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);

    useEffect(() => {
        if (uid) {
            fetchUserInfo(uid).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                    setUserCatalog(fetchedUserInfo.catalogs);
                    console.log(fetchedUserInfo);
                }
            });
        }
    }, [uid]);

    useEffect(() => {
        if (user) {
            if (user.uid === uid) {
                setCanEdit(true);
                console.log('editing access granted');
            }
        }
    }, [uid, user])

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col justify-center items-center p-8'>
            <h1 className='font-semibold text-3xl mb-8'>{userInfo.username}&apos;s Catalogs</h1>
            {
                userCatalog.length > 0 ?
                    <div className='w-screen flex flex-col justify-center m-auto items-center gap-8'>
                        {
                            userCatalog.map((catalog, idx) => {
                                return (
                                    <div key={idx} className='flex flex-row p-4 bg-gray-200 border-4 border-gray-300 rounded-lg shadow-lg w-2/3 hover:border-main_1 transition 250 ease-in-out cursor-pointer items-center'>
                                        <img className='w-48 rounded' src={catalog.catalogImage} alt="catalog image" />
                                        <div className='flex flex-col p-4 gap-2 w-4/5'>
                                            <h1 className='text-4xl font-semibold'>{catalog.catalogTitle}</h1>
                                            <p className='text-xl p-2'>{catalog.catalogDescription}</p>
                                        </div>
                                        {
                                            canEdit &&
                                            <div>
                                                <button className='bg-red-500 px-4 py-2 rounded text-xl text-white h-16 hover:bg-red-400 transition 250 ease-in-out' onClick={() => {
                                                    removeCatalog(uid, catalog.cid)
                                                    router.push(`/catalog/${uid}`);
                                                }}>Delete</button>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                        <button
                            className='bg-main_1 hover:bg-main_3 transition 250 ease-in-out px-8 py-6 text-6xl rounded text-white'
                            onClick={() => setShowAddAlbumDisplay(true)}
                        >
                            +
                        </button>
                    </div>
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