"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => setServices(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading services...</p>;
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link
          href="/admin/services/new"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          + Add Service
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t border-gray-700">
                <td className="p-3">{service.title}</td>
                <td className="p-3">
                  {service.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-3 text-center space-x-3">
                  <span className="space-x-5">
                    <Link href={`/admin/services/${service._id}/edit`} className="text-blue-400 hover:underline">Edit</Link>
                    <Link href={`/admin/services/${service._id}/delete`} className="text-red-400 hover:underline">Delete</Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
