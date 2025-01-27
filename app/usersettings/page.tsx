"use client"

import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { fetchUserInfo, updateUsername } from "../auth";

export default function UserSettings() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState<any>({});

    const [newUserName, setNewUserName] = useState<string>('');

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
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className="text-xl font-semibold mb-8">User Settings</h1>
            <div className="flex flex-col gap-4 border-2 bg-gray-100 border-gray-200 rounded">
                <div className="flex flex-row gap-8 items-center px-16 py-4">
                    <div className="w-2/5">
                        <label htmlFor="changeUsername">Change Username:</label>
                    </div>
                    <div className="w-2/5">
                        <input
                            type="text"
                            name="changeUsername"
                            onChange={(e) => setNewUserName(e.target.value)}
                            className="px-2 py-1 border-gray-200 border-2 rounded-"
                            placeholder={userInfo.username}
                        />
                    </div>
                    <div className="w-1/5">
                        <button
                            className="bg-main_positive px-4 py-1 rounded text-white hover:bg-main_positive_hover transition 250 ease-in-out disabled:opacity-50"
                            onClick={() => updateUsername(user.uid, newUserName)}
                            disabled={newUserName.length === 0}
                        >
                            Update
                        </button>
                    </div>
                </div>
                <div className="flex flex-row gap-8 items-center px-16 py-4">
                    <div className="w-2/5">
                        <label htmlFor="changeUsername">Change Profile Picture:</label>
                    </div>
                    <div className="w-2/5">
                        <input
                            type="text"
                            name="changeUsername"
                            onChange={(e) => setNewUserName(e.target.value)}
                            className="px-2 py-1 border-gray-200 border-2 rounded-"
                            placeholder={userInfo.username}
                        />
                    </div>
                    <div className="w-1/5">
                        <button
                            className="bg-main_positive px-4 py-1 rounded text-white hover:bg-main_positive_hover transition 250 ease-in-out"
                            onClick={() => updateUsername(user.uid, newUserName)}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}