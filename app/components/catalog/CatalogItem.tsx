"use client"

/* eslint-disable @next/next/no-img-element */
import { catalog } from '@/app/types';
import { useRouter } from 'next/navigation';

interface CatalogItemProps {
    catalog: catalog;
    canEdit: boolean;
    uid: string;
    removeCatalog: (uid: string, cid: string) => void;
    router: ReturnType<typeof useRouter>;
}

export default function CatalogItem({ catalog, canEdit, uid, removeCatalog, router }: CatalogItemProps) {
    return (
        <div className='flex flex-row p-4 bg-gray-200 border-4 border-gray-300 rounded-lg shadow-lg w-2/3 hover:border-main_1 transition 250 ease-in-out cursor-pointer items-center'
        onClick={() => router.push(`/catalog/${uid}/${catalog.cid}`)}>
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
    );
}
