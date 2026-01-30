import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { slugify } from "@/lib/slugify";

export async function PUT(
  req: Request,
  { params }: { params: Promise< { id: string } > }
) {
  await connectDB();

  const { id } = await params;

  const body = await req.json();
  const { title, description, isActive } = body;

  const updateData: any = {};
  if (title) {
    updateData.title = title;
    updateData.slug = slugify(title);
  }
  if (description) {
    updateData.description = description;
  }
  if (typeof isActive === "boolean") {
    updateData.isActive = isActive;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedService) {
      return NextResponse.json( { message: "Service not found" }, { status: 404 } );
    }

    return NextResponse.json( { message : "Service updated successfully!!!" }, { status : 200 } );
  } catch (error: any) {
    return NextResponse.json( { message: error.message }, { status: 500 } );
  }
}
