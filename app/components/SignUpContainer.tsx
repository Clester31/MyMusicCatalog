import { useState } from "react";
import { useRouter } from "next/navigation";

import { signUpWithEmail } from "../auth"

export default function SignUpContainer() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');

    const handleSubmit = () => {
        if (password === confPassword && password !== '' && confPassword !== '') {
            signUpWithEmail(email, username, password);
            router.push('/');
        } else {
            alert("Passwords do not match");
        }
    }

    return (
        <div className="flex flex-col w-1/3 gap-4 px-16 py-8 text-center bg-gray-100 rouded">
            <h1>Sign Up</h1>
            <input
                className="px-2 py-2 rounded"
                type="text"
                name="email-input"
                id="email-input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="px-2 py-2 rounded"
                type="text"
                name="username-input"
                id="username-input"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="px-2 py-2 rounded"
                type="password"
                name="password-input"
                id="password-input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="px-2 py-2 rounded"
                type="password"
                name="confirm-password-input"
                id="confirm-password-input"
                placeholder="Confirm Password"
                onChange={(e) => setConfPassword(e.target.value)}
            />
            <button
                className="bg-green-600 px-4 py-2 rounded text-white"
                onClick={handleSubmit}
            >
                Sign Up
            </button>
        </div>
    )
}