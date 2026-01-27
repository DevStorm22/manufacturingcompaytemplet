import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";
export async function GET() {
    try {
        await connectDB();

        const existingAdmin = await Admin.findOne({
            email: "admin@example.com",
        });

        if (existingAdmin) {
            return NextResponse.json({message: "Admin already exist"}, {status: 200});
        }

        const hashPassword = await bcrypt.hash("admin123", 10);

        await Admin.create({
            email: "admin@example.com",
            password: hashPassword,
            role: "admin",
        });

        return NextResponse.json({message: "Admin Created"}, {status: 201});
    }
    catch(error) {
        console.error(error);
        return NextResponse.json({error: "Failed to seed admin"}, {status: 500})
    }
}