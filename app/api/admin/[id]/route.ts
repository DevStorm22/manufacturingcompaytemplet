import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";

export async function GET(req: Request, {params}: {params: Promise<{id:string}>}) {
  await connectDB();
  const {id} = await params;

  const admin = await Admin.findById(id);
  if (!admin) {
    return NextResponse.json({message: "Admin not found"}, {status: 404});
  }

  return NextResponse.json({ data: admin }, { status: 200 });
}

export async function PUT(req: Request, {params}: {params: Promise<{id: string }>}) {
  await connectDB();
  const {id} = await params;
  const body = await req.json();
  const {email, password, role} = body;

  const updateData: any = {};
  if (email) updateData.email = email;
  if (password) updateData.password = password;
  if (role) updateData.role = role;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({message: "No valid fields to update"}, {status: 400});
  }

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {new: true});
    if (!updatedAdmin) {
      return NextResponse.json({message: "Admin not found"}, {status: 404});
    }

    return NextResponse.json({message: "Admin updated successfully!!!"}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}) {
  await connectDB();
  const { id } = await params;

  const deletedAdmin = await Admin.findByIdAndDelete(id);
  if (!deletedAdmin) {
    return NextResponse.json({message: "Admin not found"}, {status: 404});
  }

  return NextResponse.json({success: true, message: "Admin deleted successfully"});
}
