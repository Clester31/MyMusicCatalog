"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../lib/AuthContext';
import { fetchAllCatalogs, fetchUserInfo } from '../auth';

import { catalog, user } from '../types';
import CatalogItem from '../components/catalog/CatalogItem';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<user | null>(null);
  const [userId, setUserId] = useState<string>('nouser');
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<catalog[]>([]);
  const [allCatalogs, setAllCatalogs] = useState<catalog[]>([]);

  const updateSearchPage = async (searchTerm: string) => {
    allCatalogs.map((catalog) => {
      if (catalog.catalogTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
        setSearchResults(prev => [...prev, catalog])
      }
    })
  }

  useEffect(() => {
    function getUserInfo() {
      if (user) {
        setUserId(user.uid);
        fetchUserInfo(user.uid).then(fetchedUserInfo => {
          if (fetchedUserInfo) {
            setUserInfo(fetchedUserInfo);
          }
        });
      }
    }

    function getAllCatalogs() {
      fetchAllCatalogs().then(Catalogs => {
        Catalogs.map((catalog) => {
          if (catalog.catalogCreatedBy !== userId) {
            setAllCatalogs(prev => [...prev, catalog])
          }
        })
      })
    }

    getUserInfo();
    getAllCatalogs();
  }, [user, userId])

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      {
        user ?
          <div className='text-center'>
            <h1>Welcome back, {userInfo?.username}!</h1>
          </div>
          :
          <div className='text-center'>
            <h1>Welcome back</h1>
          </div>
      }
      <div className='items-center justify-center flex w-5/6 mt-16'>
        <input
          type="text"
          placeholder={`search for catalogs`}
          name="search-bar"
          id="search-bar"
          className="border-main_2 focus:border-main_1 transition 250 ease-in-out border-2 rounded-3xl px-4 py-2 text-black text-2xl text-center w-1/2"
          onChange={async (e) => {
            const value = e.target.value;
            if (value.trim() === '') {
              setSearchActive(false);
              setSearchResults([]);
            } else {
              setSearchActive(true);
              setSearchResults([]);
              await updateSearchPage(value);
            }
          }}
        />
      </div>
      {
        searchActive &&
        <div className='flex flex-col items-center gap-4 w-5/6'>
          <h1 className='text-xl'>Search Results:</h1>
          {
            searchResults.map((catalog, index) => {
              return (
                <CatalogItem
                  key={index}
                  cid={catalog.cid}
                  canEdit={catalog.catalogCreatedBy === userId}
                  uid={userId}
                  removeCatalog={() => { }}
                  router={router}
                />
              )
            })
          }
        </div>
      }
      <div className='flex flex-col items-center text-2xl w-screen'>
        {
          !searchActive &&
          <div className='flex flex-col items-center gap-4 w-5/6'>
            <h1>Latest Catalog</h1>
            {
              allCatalogs.map((catalog, index) => {
                return (
                  <CatalogItem
                    key={index}
                    cid={catalog.cid}
                    canEdit={catalog.catalogCreatedBy === userId}
                    uid={userId}
                    removeCatalog={() => { }}
                    router={router}
                  />
                )
              })
            }
          </div>
        }
      </div>
    </div>
  )
}