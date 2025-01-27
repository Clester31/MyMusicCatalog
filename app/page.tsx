"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from './lib/AuthContext';
import { fetchUserInfo, signOut } from './auth';

import { user } from './types';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<user | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.uid).then(fetchedUserInfo => {
        if (fetchedUserInfo) {
          setUserInfo(fetchedUserInfo);
        }
      });
    }
  })

  return (
    <div className='flex justify-center items-center h-screen'>
      {
        user ?
          <div className='text-center'>
            <h1>Welcome back, {userInfo?.username}!</h1>
            <button
              className='bg-main_danger py-4 px-2 rounded text-lg mt-4 text-white'
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
          :
          <div className='text-center'>
            <button
              className='bg-main_positive py-4 px-2 rounded text-lg text-white'
              onClick={() => router.push('/login')}
            >
              Sign In
            </button>
          </div>
      }
    </div>
  )
}