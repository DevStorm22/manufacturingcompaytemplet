import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CaseStudy } from "@/models/CaseStudy";
import { slugify } from "@/lib/slugify";

export async function GET(req: Request,{params}: {params: Promise<{id: string}>}) {
  await connectDB();

  const {id} = await params;

  const caseStudy = await CaseStudy.findById(id);

  if (!caseStudy) {
    return NextResponse.json(
      {message: "Case study not found"},
      {status: 404}
    );
  }

  return NextResponse.json(
    {data: caseStudy},
    {status: 200}
  );
}

export async function PUT(req: Request, {params}: {params: Promise<{id:string}>}) {
  await connectDB();

  const {id} = await params;
  const body = await req.json();

  const updateData:any = {};

  if (body.title) {
    updateData.title = body.title;
    updateData.slug = slugify(body.title);
  }

  if (body.shortDescription) {
    updateData.shortDescription = body.shortDescription;
  }

  if (body.content) {
    updateData.content = body.content;
  }

  if (body.coverImage) {
    updateData.coverImage = body.coverImage;
  }

  if (typeof body.isActive === "boolean") {
    updateData.isActive = body.isActive;
  }

  if (Object.keys(updateData).length===0) {
    return NextResponse.json(
      {message: "No valid fields to update"},
      {status: 400}
    );
  }

  const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
    id,
    updateData,
    {new: true}
  );

  if (!updatedCaseStudy) {
    return NextResponse.json(
      {message: "Case study not found"},
      {status: 404}
    );
  }

  return NextResponse.json(
    {message: "Case study updated successfully"},
    {status: 200}
  );
}

export async function DELETE(req: Request,{params}:{params: Promise<{id:string}>}) {
  await connectDB();

  const {id} = await params;

  const deleted = await CaseStudy.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      {message: "Case study not found"},
      {status: 404}
    );
  }

  return NextResponse.json(
    {message: "Case study deleted successfully"},
    {status: 200}
  );
}  