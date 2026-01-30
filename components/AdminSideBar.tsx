"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const links = [
    {href: "/admin/dashboard", label: "Dashboard"},
    {href: "/admin/services", label: "Services"},
    {href: "/admin/products", label: "Products"},
    {href: "/admin/blog", label: "Blog"},
    {href: "/admin/case-studies", label: "Case Studies"},
];
export default function AdminSidebar() {
    const pathName = usePathname();

    return (
        <aside className="bg-black text-white p-6 space-y-3 m-5">
            <h2 className="text-xl font-bold mb-10">Admin Panel</h2>
            <nav className="flex space-y-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`p-3 rounded ${pathName === link.href ? "bg-gray-800" : "hover:bg-gray-700"}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <button onClick={() => signOut({callbackUrl: "/admin/login"})} className="bg-red-600 p-2 rounded hover:bg-red-700">
                Logout
            </button>
        </aside>
    );
}
