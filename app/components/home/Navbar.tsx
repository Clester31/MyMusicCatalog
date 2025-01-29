/* eslint-disable @next/next/no-img-element */
"use client"

import { fetchUserInfo } from "@/app/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState<any>({});
    const router = useRouter();

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
        <div className="flex justify-between items-center bg-gradient-to-b from-gray-300 to-gray-100 text-white px-4 py-2 text-main_3 text-md border-b-4 border-b-main_2 hover:border-b-main_1 transition 250 ease-in-out">
            <h1
                className="text-xl font-semibold text-main_1 cursor-pointer"
                onClick={() => router.push('/')}
            >
                <img
                    src='mmc_logo.png'
                    alt='site logo'
                    className="w-16 h-16 hover:scale-110 transition 250 ease-in-out"
                    onClick={() => router.push('/')}
                />
            </h1>
            <div className="flex flex-row gap-16 w-max text-main_2 font-semibold text-2xl">
                <h1 onClick={() => router.push('/')} className="hover:text-main_1 transition 250 ease-in-out cursor-pointer">Explore</h1>
                <h1 onClick={() => router.push('/search')} className="hover:text-main_1 transition 250 ease-in-out cursor-pointer">Music Seach</h1>
                <h1 onClick={() => router.push(`/catalog/${user.uid}`)} className="hover:text-main_1 transition 250 ease-in-out cursor-pointer">Catalog</h1>
            </div>
            {
                !user ?
                    <div>
                        <button
                            className="bg-main_1 px-4 py-1 rounded-2xl text-white hover:bg-main_2 transition 250 ease-in"
                            onClick={() => router.push('/login')}
                        >
                            Log In / Sign Up
                        </button>
                    </div>
                    :
                    <div>
                        <img
                            alt="profile picture"
                            src={userInfo.profilePicture}
                            className="w-16 h-16 rounded-full cursor-pointer"
                            onClick={() => router.push('/usersettings')}
                        />
                    </div>
            }
        </div>
    )
}