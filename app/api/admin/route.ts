import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";

export async function GET() {
  await connectDB();
  const admins = await Admin.find().sort({createdAt: -1});
  return NextResponse.json({data: admins}, {status: 200});
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const {email, password, role} = body;

  if (!email || !password) {
    return NextResponse.json(
      {message: "Email and Password are required!!!"},
      {status: 400}
    );
  }

  const exists = await Admin.findOne({email});
  if (exists) {
    return NextResponse.json(
      {message: "Admin with this email already exists!!!"},
      {status: 409}
    );
  }

  const admin = await Admin.create({email, password, role: role || "admin"});
  return NextResponse.json({message: "New admin created!!!"}, {status: 201});
}
