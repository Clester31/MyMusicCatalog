import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmail } from "../auth"

export default function LoginContainer() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = () => {
        signInWithEmail(email, password);
        router.push('/');
    }

    return (
        <div className="flex flex-col w-1/3 gap-4 px-16 py-8 text-center bg-gray-100 rouded">
            <h1>Log In</h1>
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
                type="password"
                name="password-input"
                id="password-input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-green-600 px-4 py-2 rounded text-white"
                onClick={handleSubmit}
            >
                Log In
            </button>
        </div>
    )
}