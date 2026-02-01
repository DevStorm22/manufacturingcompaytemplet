import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { slugify } from "@/lib/slugify";

export async function GET(req: Request, {params}: {params:Promise<{id:string}>}) {
  await connectDB();

  const {id} = await params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { data: blog },
    { status: 200 }
  );
}

export async function PUT(req: Request, {params}: {params:Promise<{id:string}>}) {
  await connectDB();

  const {id} = await params;

  const body = await req.json();
  const { title, excerpt, content, isActive } = body;

  const updateData: any = {};

  if (title) {
    updateData.title = title;
    updateData.slug = slugify(title);
  }
  if (excerpt) updateData.excerpt = excerpt;
  if (content) updateData.content = content;
  if (typeof isActive === "boolean") updateData.isActive = isActive;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!updatedBlog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Blog updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(req: Request, {params}: {params:Promise<{id:string}>}) {
  await connectDB();

  const {id} = await params;

  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Blog deleted successfully" },
    { status: 200 }
  );
}
