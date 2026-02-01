"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditAdminPage() {
  const { id } = useParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.data.email);
        setRole(data.data.role);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/admin/admins");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 underline">Edit Admin</h1>

        {error && <p className="bg-red-200 text-red-800 p-2 rounded mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="p-2 rounded bg-black border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="p-2 rounded bg-black border border-gray-600"
            placeholder="Enter new password if you want to change"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="p-2 rounded bg-black border border-gray-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>

          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded">Update</button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
