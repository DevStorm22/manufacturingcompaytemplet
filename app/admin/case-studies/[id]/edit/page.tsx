"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCaseStudyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/case-studies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const cs = data.data;
        setTitle(cs.title);
        setShortDescription(cs.shortDescription);
        setContent(cs.content);
        setIsActive(cs.isActive);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/admin/case-studies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        shortDescription,
        content,
        isActive,
      }),
    });

    router.push("/admin/case-studies");
    router.refresh();
  };

  return (
    <div className="p-5 text-white">
      <h1 className="text-2xl font-bold underline mb-4">
        Edit Case Study
      </h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-black border p-2 rounded"
        />

        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="bg-black border p-2 rounded"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-black border p-2 rounded h-32"
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
          {loading ? "Updating..." : "Update Case Study"}
        </button>
      </form>
    </div>
  );
}
