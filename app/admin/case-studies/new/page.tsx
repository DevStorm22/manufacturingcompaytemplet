"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCaseStudyPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          shortDescription,
          content,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push("/admin/case-studies");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 text-white">
      <h1 className="text-2xl font-bold underline mb-4">
        Create Case Study
      </h1>

      {error && (
        <p className="bg-red-200 text-red-800 p-2 rounded mb-3">
          {error}
        </p>
      )}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          className="bg-black border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Short description"
          className="bg-black border p-2 rounded"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />

        <textarea
          placeholder="Full content"
          className="bg-black border p-2 rounded h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>

        <button className="bg-blue-600 py-2 rounded">
          {loading ? "Creating..." : "Create Case Study"}
        </button>
      </form>
    </div>
  );
}
