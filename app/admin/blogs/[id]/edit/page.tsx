"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBlogPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/blogs/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.data.title);
        setExcerpt(res.data.excerpt);
        setContent(res.data.content);
        setIsActive(res.data.isActive);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, isActive }),
    });

    router.push("/admin/blogs");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 underline">
          Edit Service
        </h1>

        {error && (
          <p className="bg-red-200 text-red-800 p-2 rounded mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="p-2 rounded bg-black border border-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="p-2 rounded bg-black border border-gray-600"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
          
          <textarea
            className="p-2 rounded bg-black border border-gray-600"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          /><label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span>Active</span>
        </label>

        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded">
            Update
          </button>
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
