"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Admin {
  _id: string;
  email: string;
  role: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white text-center">Loading admins...</p>;

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admins</h1>
        <Link
          href="/admin/admins/new"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          + Add Admin
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-t border-gray-700">
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.role}</td>
                <td className="p-3 text-center space-x-3">
                  <span className="space-x-5">
                    <Link href={`/admin/admins/${admin._id}/edit`} className="text-blue-400 hover:underline">
                      Edit
                    </Link>
                    <Link href={`/admin/admins/${admin._id}/delete`} className="text-red-400 hover:underline">
                      Delete
                    </Link>
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
