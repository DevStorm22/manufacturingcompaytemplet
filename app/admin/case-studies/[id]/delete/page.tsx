"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCaseStudyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    router.push("/admin/case-studies");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-900 p-6 rounded border border-red-600">
        <h1 className="text-xl font-bold text-red-500 mb-3 underline">
          Delete Case Study
        </h1>

        <p className="mb-4">
          Are you sure? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
