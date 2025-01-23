"use client"

import { useState } from "react"
import LoginContainer from "../components/LoginContainer"
import SignUpContainer from "../components/SignUpContainer"

export default function Login() {
    const [loginMode, setLoginMode] = useState<boolean>(true)

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {
                loginMode ?
                    <LoginContainer />
                    :
                    <SignUpContainer />
            }
            <h1
                className="text-center text-blue-500 mt-4 cursor-pointer"
                onClick={() => setLoginMode(!loginMode)}
            >
                {
                    loginMode ?
                        "Create an account here"
                        :
                        "Log in instead"
                }
            </h1>
        </div>
    )
}