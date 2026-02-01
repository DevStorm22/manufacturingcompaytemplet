"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    const res = await fetch("/api/admin/case-studies");
    const data = await res.json();
    setCaseStudies(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-5 text-white">
      <div className="flex justify-between items-center mb-5 space-x-5">
        <h1 className="text-2xl font-bold underline">Case Studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          + Add Case Study
        </Link>
      </div>

      <table className="w-full border border-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {caseStudies.map((cs: any) => (
            <tr key={cs._id}>
              <td className="p-2 border">{cs.title}</td>
              <td className="p-2 border">
                {cs.isActive ? "Active" : "Inactive"}
              </td>
              <td className="p-2 border space-x-3">
                <Link
                  href={`/admin/case-studies/${cs._id}/edit`}
                  className="text-blue-400"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/case-studies/${cs._id}/delete`}
                  className="text-red-400"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
