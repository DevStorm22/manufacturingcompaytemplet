"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
export default function AdminLoginPage()
{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/admin/dashboard",
            redirect: false,
        });
        setLoading(false);
        
        if(res?.error) {
            setError("Invalid Credentials");
        }
        else {
            window.location.href = "/admin/dashboard";
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-sxl font-semibold mb-4 text-center">
                    Admin Login
                </h1>
                {
                    error && (
                        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                    )
                }
                <input type="email" placeholder="Email" className="w-full mb-3 px-3 py-2 border rounded placeholder:text-black" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full mb-3 px-3 py-2 border rounded placeholder:text-black" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50">{loading? "Signing in...": "Login"}</button>
            </form>
        </div>
    );
}