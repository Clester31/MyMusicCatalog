"use client"

import { fetchUserInfo, removeCatalog } from '@/app/auth';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { user } from '@/app/types';
import AddCatalogDisplay from '@/app/components/catalog/AddCatalogDisplay';
import { useAuth } from '@/app/lib/AuthContext';
import CatalogItem from '@/app/components/catalog/CatalogItem';
import CatalogInfo from '@/app/components/catalog/CatalogInfo';

export default function Catalog() {
    const params = useParams();
    const uid = params.uid;

    const { user } = useAuth();
    const router = useRouter();

    const [userId, setUserId] = useState<string>('nouser');
    const [userInfo, setUserInfo] = useState<user | null>(null);
    const [userCatalog, setUserCatalog] = useState<string[]>([]);
    const [showAddAlbumDisplay, setShowAddAlbumDisplay] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const [FAQOpen, setFAQOpen] = useState<boolean>(false);
    const [FAQType, setFAQType] = useState<string>('');

    useEffect(() => {
        if (uid) {
            console.log(uid)
            fetchUserInfo(Array.isArray(uid) ? uid[0] : uid).then(fetchedUserInfo => {
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
            setUserId(user.uid);
            if (userId === uid) {
                setCanEdit(true);
                console.log('editing access granted');
            }
        }
    }, [uid, user, userId])

    if (!userInfo) {
        return (
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col text-center justify-center items-center gap-8'>
                    <div className='flex flex-col gap-4 text-2xl items-center mt-32 bg-gray-100 px-32 shadow-lg py-4 rounded-xl'>
                        <h1 className='text-center text-black'>You must have an account to create catalogs</h1>
                        <button className='bg-main_1 w-1/2 text-white px-4 py-2 rounded hover:bg-main_3 transition 250 ease-in-out'>Log In / Sign Up</button>
                    </div>
                    <div className='flex flex-col gap-4 mt-16 text-2xl'>
                        <h1 className='text-gray-500'>Hover over an item to learn more</h1>
                        <div className='flex flex-row gap-4'>
                            <div onMouseEnter={() => { setFAQOpen(true); setFAQType('catalog') }} onMouseLeave={() => setFAQOpen(false)}>
                                <CatalogInfo text='What is in a catalog?' icon='folder' />
                            </div>
                            <div onMouseEnter={() => { setFAQOpen(true); setFAQType('add') }} onMouseLeave={() => setFAQOpen(false)}>
                                <CatalogInfo text='How do I add to my catalog?' icon='music' />
                            </div>
                            <div onMouseEnter={() => { setFAQOpen(true); setFAQType('customize') }} onMouseLeave={() => setFAQOpen(false)}>
                                <CatalogInfo text='How can I customize my catalog?' icon='gear' />
                            </div>
                        </div>
                    </div>
                    {FAQOpen && (
                        <div className='bg-gray-100 rounded-xl shadow-lg text-2xl p-4 flex justify-center w-1/2' style={{ width: '800px', height: '160px'}}>
                            {
                                FAQType === 'catalog' ?
                                    <h1>Catalogs contain your album ratings, reviews, and track ratings for each album you add to your catalog. You can hover over a catalog item to expand it to see additional details.</h1>
                                    :
                                    FAQType === 'add' ?
                                        <h1>Head over to the &apos;music search&apos; page to search for an artist or album. Once you find something you want to add, click on it and fill in your rating details. Don&apos;t forget to set the date you listened to an item before you submit!</h1>
                                        :
                                        FAQType === 'customize' &&
                                        <h1>You can edit all contents of a catalog item after you have added it, such as the album rating, track rating, or review. You can also edit the colors of the months as well</h1>
                            }
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center p-8'>
            <div className='mt-24'>
                <h1 className='font-semibold text-3xl mb-8 text-center'>{userInfo.username}&apos;s Catalogs</h1>
                {
                    userCatalog.length > 0 ?
                        <div className='w-screen flex flex-col justify-center m-auto items-center gap-8'>
                            {
                                userCatalog.map((catalog, idx) => (
                                    <CatalogItem
                                        key={idx}
                                        cid={catalog}
                                        canEdit={canEdit}
                                        uid={Array.isArray(uid) ? uid[0] : uid || ''}
                                        removeCatalog={removeCatalog}
                                        router={router}
                                    />
                                ))
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
                        <AddCatalogDisplay setShowAddAlbumDisplay={setShowAddAlbumDisplay} uid={userId} />
                    </div>
                }
            </div>

        </div>
    );

};