import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CaseStudy } from "@/models/CaseStudy";
import { slugify } from "@/lib/slugify";

/* GET — all case studies */
export async function GET() {
  await connectDB();

  const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });

  return NextResponse.json(
    { data: caseStudies },
    { status: 200 }
  );
}

/* POST — create case study */
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { title, shortDescription, content, coverImage, isActive } = body;

  if (!title || !shortDescription || !content) {
    return NextResponse.json(
      { message: "Title, short description and content are required" },
      { status: 400 }
    );
  }

  const slug = slugify(title);

  const exists = await CaseStudy.findOne({ slug });
  if (exists) {
    return NextResponse.json(
      { message: "Case study with this title already exists" },
      { status: 409 }
    );
  }

  await CaseStudy.create({
    title,
    slug,
    shortDescription,
    content,
    coverImage,
    isActive: typeof isActive === "boolean" ? isActive : true,
  });

  return NextResponse.json(
    { message: "Case study created successfully" },
    { status: 201 }
  );
}
