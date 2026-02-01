import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { slugify } from "@/lib/slugify";

export async function GET() {
  await connectDB();

  const blogs = await Blog.find().sort({ createdAt: -1 });

  return NextResponse.json(
    { data: blogs },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { title, excerpt, content, isActive } = body;

  if (!title || !excerpt || !content) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const slug = slugify(title);
  const exists = await Blog.findOne({ slug });

  if (exists) {
    return NextResponse.json(
      { message: "Blog with this title already exists" },
      { status: 409 }
    );
  }

  await Blog.create({
    title,
    slug,
    excerpt,
    content,
    isActive,
  });

  return NextResponse.json(
    { message: "Blog created successfully" },
    { status: 201 }
  );
}
