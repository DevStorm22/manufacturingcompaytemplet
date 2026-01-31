"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateServicePage() {
    const router=useRouter();

    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [isActive, setIsActive]=useState(true);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState("");
    const handleStubmit=async(e:React.FormEvent) => {
        e.preventDefault();
        setError("");

        if(!title || !description) {
            setError("Title and description are required");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/admin/services", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    isActive,
                }),
            });
            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message || "Failed to create service");
            }
            router
        } catch(error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full items-center justify-center">
            <div className="flex flex-col gap-5 border-3 border-white items-center justify-center text-center rounded-lg">
                <h1 className="mt-3 font-bold text-2xl text-white text-center text-underline">Create Service</h1>
                {error && (<p className="bg-red-200 text-red-700 px-4 py-2 rounded-xl">{error}</p>)}
                <form className="flex flex-col gap-2 text-white p-3" onSubmit={handleStubmit}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-black border-2 border-white p-2 rounded-xl" placeholder="Title"  required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-black border-2 border-white p-2 rounded-xl" placeholder="Description" required />
                    <span className="flex items-center gap-2">Status:<input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="bg-black border-2 border-white rounded-xl" placeholder="Title" required />Active</span>
                    <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl">{loading ? "Creating..." : "Create Service"}</button>
                    <button type="button" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl" onClick={() => router.back()}>Cancel</button>
                </form>
            </div>
        </div>
    );
}