"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteServicePage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
  
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const deleteService = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/services/${id}`, { method: "DELETE" })

        const resJSON = await res.json();

        if (!res.ok) {
          throw new Error(resJSON.message || "Failed to delete service");
        }

        setSuccess(true);

        setTimeout(() => {
          router.push("/admin/services");
          router.refresh();
        }, 1500);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    deleteService();
  }, [id, router]);

  if (loading) {
    return <p className="text-gray-600">Deleting service...</p>;
  }

  if (error) {
    return (
      <p className="bg-red-200 text-red-700 px-4 py-2 rounded-xl">
        {error}
      </p>
    );
  }

  if (success) {
    return (
      <p className="bg-green-200 text-green-700 px-4 py-2 rounded-xl">
        Service deleted successfully!
      </p>
    );
  }

  return null;
}