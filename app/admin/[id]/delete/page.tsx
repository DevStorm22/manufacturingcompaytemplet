"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAdminPage() {
  const {id} = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    try {
      setLoading(true);

      const res = await fetch(`/api/admins/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete admin");
      }

      router.push("/admin/admins");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg border border-red-700">
        <h1 className="text-2xl font-bold text-red-500 mb-4 underline">Delete Admin</h1>

        <p className="mb-4 text-gray-300">
          Are you sure you want to delete this admin?
          <br />
          <span className="text-red-400 font-semibold">This action cannot be undone.</span>
        </p>

        {error && <p className="bg-red-200 text-red-800 p-2 rounded mb-3">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>

          <button
            onClick={() => router.back()}
            className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
