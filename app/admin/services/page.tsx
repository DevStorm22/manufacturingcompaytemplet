"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ServicePage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState ("");
    const fetchServices = async() => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/services");
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

    useEffect (() => {
            fetchServices();
        }, []
    );

    if(loading) {
        return (
            <p>Loading...</p>
        );
    }

    if(error) {
        <p className="text-red-600">{error}</p>
    }

    if(!services.length && !loading) {
        <p className="text-white">No services available</p>
    }

    return(
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Services</h1>
                <Link className="bg-blue-700 text-white px-4 py-2 rounded" href="/admin/services/new">Add Service</Link>
            </div>
            <div className="bg-white rounded shadow">
                <table className="w-full text-left bg-black border-white">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">State</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {services.map((service) => (
                                        <tr key={service._id} className="border-t">
                                            <td className="p-3">{service.title}</td>
                                            <td className="p-3">{service.slug}</td>
                                            <td className="p-3">{service.description}</td>
                                            <td className="p-3">{(service.isActive) ? "Active" : "Not Active"}</td>
                                            <td className="p-3"><span className="flex flex-col gap-5"><button className="text-white bg-blue-700 px-4 py-2">Edit</button><button className="text-white bg-red-700 px-4 py-2">Delete</button></span></td>
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