"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditServicePage() {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchService = async() => {
        try {
            const res = await fetch(`/api/admin/services/${id}`);
            if(!res.ok) {
                throw new Error("Failed to fetch services");
            }
            const resJSON = await res.json();
            
            setTitle(resJSON.data.title);
            setDescription(resJSON.data.description);
            setIsActive(resJSON.data.isActive);
            setLoading(false);
        } catch(error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    },[id])

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/api/admin/services/${id}`, {
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    title,
                    description,
                    isActive,
                }),
            });
            const resJSON = await res.json();
            if(!res.ok) {
                throw new Error(resJSON.message || "Fail to Upload");
            }
            router.push("/admin/services");
            router.refresh();
        } catch(error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full items-center justify-center">
            <h1 className="m-5 font-bold text-2xl text-white text-center text-underline">Edit Service</h1>
            {error && (<p className="bg-red-200 text-red-700 px-4 py-2 rounded-xl">{error}</p>)}
            <form className="flex flex-col gap-2 text-white p-3" onSubmit={handleSubmit}>
                <span className="flex items-center gap-2">Title:<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-black border-2 border-white p-2 rounded-xl" placeholder="Title" required /></span>                
                <span className="flex items-center gap-2">Description:<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-black border-2 border-white p-2 rounded-xl" placeholder="Description" required /></span>
                <span className="flex items-center gap-2">Status:<input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="bg-black border-2 border-white rounded-xl" required />Active</span>
                <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl">{loading ? "Updating..." : "Update Service"}</button>
                <button type="button" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl" onClick={() => router.back()}>Cancel</button>
            </form>
        </div>
    )
}