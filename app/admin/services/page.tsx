"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ServicePage() {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

    const router = useRouter();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState ("");
    
    const fetchServices = async() => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/api/admin/services`);
            if(!res.ok) {
                throw new Error("Failed fetching services");
            }
            const resJson = await res.json();
            setServices(resJson.data || []);
        }
        catch (error:any) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleEdit = (id: string) => {
        router.push(`/admin/services/${id}/edit`);
    };

    const handleDelete = async(id: string) => {
        router.push(`/admin/services/${id}/delete`);
    }

    useEffect (() => {
            fetchServices();
        }, []
    );

    if(loading) {
        return (<p>Loading...</p>);
    }

    if(error) {
        return (<p className="text-red-600">{error}</p>)
    }

    if(!services.length && !loading) {
        return (<p className="text-white">No services available</p>)
    }

    return(
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Services</h1>
                <Link className="bg-blue-700 text-white px-4 py-2 rounded" href="/admin/services/new">Add Service</Link>
            </div>
            <div className="bg-white rounded shadow">
                <table className="w-full text-left bg-black border-black">
                    <thead className="border-2 border-white">
                        <tr className="border-2 border-white">
                            <th className="p-4 border-2 border-white">Title</th>
                            <th className="p-4 border-2 border-white">Slug</th>
                            <th className="p-4 border-2 border-white">Description</th>
                            <th className="p-4 border-2 border-white">State</th>
                            <th className="p-4 border-2 border-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {services.map((service) => (
                                        <tr key={service._id} className={`text-black ${service.isActive ? "bg-green-50" : "bg-red-50"}`}>
                                            <td className={`p-3 border-l-2 boder-t-2 border-b-2 border-r-2 border-black border-l-white ${service.isActive ? "text-green-700" : "text-red-700"}`}>{service.title}</td>
                                            <td className={`p-3 border-2 border-black ${service.isActive ? "text-green-700" : "text-red-700"}`}>{service.slug}</td>
                                            <td className={`p-3 border-2 border-black ${service.isActive ? "text-green-700" : "text-red-700"}`}>{service.description}</td>
                                            <td className={`p-3 border-2 border-black ${service.isActive ? "text-green-700" : "text-red-700"}`}>{(service.isActive) ? "Active" : "Not Active"}</td>
                                            <td className={`p-3 border-r-2 border-l-2 boder-t-2 border-b-2 boder-black border-r-white ${service.isActive ? "text-green-700" : "text-red-700"}`}>
                                                <span className="flex flex-col gap-5">
                                                    <button className="text-white bg-blue-700 px-4 py-2" onClick={() => handleEdit(service._id)}>Edit</button>
                                                    <button className="text-white bg-red-700 px-4 py-2" onClick={() => handleDelete(service._id)}>Delete</button>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                    </tbody>
                </table>
            </div>
        </div>
    );
}