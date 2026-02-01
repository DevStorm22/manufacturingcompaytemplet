"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !excerpt || !content) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, isActive }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTitle("");
      setExcerpt("");
      setContent("");
      alert("Blog created successfully");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-white text-center">Create Blog</h1>

        {error && <p className="bg-red-200 text-red-700 p-2">{error}</p>}

        <input
          placeholder="Title"
          className="p-2 border bg-black text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Excerpt"
          className="p-2 border bg-black text-white"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="p-2 border bg-black text-white h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>

        <button className="bg-blue-600 text-white p-2">
          {loading ? "Creating..." : "Create Blog"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="bg-red-600 text-white p-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
