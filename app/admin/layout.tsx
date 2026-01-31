import { ReactNode } from "react";
import AdminSideBar from "@/components/admin/AdminSideBar";

export default async function AdminLayout({ children, }: { children: ReactNode; }) {
    return (
        <div className="flex min-h-screen">
            <AdminSideBar />
            <main className="p-6">{children}</main>
        </div>
    );
}