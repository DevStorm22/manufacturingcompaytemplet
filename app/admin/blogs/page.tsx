"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
  const router = useRouter();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const resJSON = await res.json();
      setBlogs(resJSON.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          + Add Blogs
        </Link>
      </div>

      <table className="w-full bg-black text-white border">
        <thead>
          <tr>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Slug</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog._id}
              className={blog.isActive ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}
            >
              <td className="p-3 border">{blog.title}</td>
              <td className="p-3 border">{blog.slug}</td>
              <td className="p-3 border">
                {blog.isActive ? "Active" : "Inactive"}
              </td>
              <td className="p-3 border">
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-blue-600 px-3 py-1 text-white"
                    onClick={() => router.push(`/admin/blogs/${blog._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 text-white"
                    onClick={() => router.push(`/admin/blogs/${blog._id}/delete`)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
