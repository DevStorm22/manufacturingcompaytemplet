import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { slugify } from "@/lib/slugify";

export async function GET() {
    await connectDB();
    const services = await Service.find().sort({ createdAt: -1 });

    return NextResponse.json(services);
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const slug = slugify(body.title);
    const exists = await Service.findOne({slug});
    if(exists) {
        return NextResponse.json({error: "Slug is already defined"}, {status: 400});
    }
    const service = await Service.create({
        title: body.title,
        slug,
        description: body.description,
    });

    return NextResponse.json(service, { status: 201 });
}

export async function PUT(req:Request) {
    await connectDB();
    const body = await req.json();
    const slug = slugify(body.title);
    const updated = await Service.findByIdAndUpdate(body.id, {
        title: body.title,
        slug,
        description: body.description,
    },
    { new: true, });
    return NextResponse.json(updated);
}

export async function DELETE(req:Request) {
    await connectDB();
    const { id } = await req.json();
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Service deleted successfully", success: true });
}