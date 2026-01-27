"use client"
import { useEffect, useState } from "react";

export default function ServicePage() {
    const [services, setServices] = useState<any[]>([]);
    const [editing, setEditing] = useState<any>("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchServices = async () => {
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        setServices(data || []);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEdit = (service: any) => {
        setTitle(service.title);
        setDescription(service.description);
        setEditing(service._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this service?")) {
            return;
        }
        await fetch("/api/admin/services", {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        fetchServices();
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch("/api/admin/services", {
            method: editing ? "PUT" : "POST",
            body: JSON.stringify({
                id: editing,
                title,
                description,
            }),
        });
        setTitle("");
        setDescription("");
        setEditing("");
        fetchServices();
    };
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Services</h1>
            <form onSubmit={handleSubmit} className="mb-6 sapce-y-3 p-5 gap-5">
                <input type="text" placeholder="Service Title" value={title} className="border p-2 w-full mb-10" required onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Service description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" required></textarea>
                <button type="submit" className="bg-white text-black px-4 py-20">{editing ? "Update Service" : "Add Service"}</button>
            </form>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left">Title</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service: any) => (
                        <tr key={service._id} className="border-t">
                            <td className="p-2">{service.title}</td>
                            <td className="p-2 text-center">
                                {service.status ? "Active" : "Inactive"}
                            </td>
                            <td className="p-2">{service.description}</td>
                            <td className="p-2"><button className="text-blue-600" onClick={() => handleEdit(service)}>Edit</button></td>
                            <td className="p-2"><button className="text-red-600" onClick={() => handleDelete(service._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}