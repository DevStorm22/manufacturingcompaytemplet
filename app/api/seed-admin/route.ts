import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {connectDB} from "../../../lib/db";
import {Admin} from "../../../models/Admin";
export async function GET()
{
    await connectDB();
    const existingAdmin = await Admin.findOne({
        email: "admin@example.com",
    });
    if (existingAdmin)
    {
        return NextResponse.json({message: "Admin already exist"});
    }
    const hashPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({
        email: "admin@example.com",
        password: hashPassword,
    });
    return NextResponse.json({message: "Admin Created"});
}