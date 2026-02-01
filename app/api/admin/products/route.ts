import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { slugify } from "@/lib/slugify";

export async function GET() {
    await connectDB();
    const Products = await Service.find().sort({createdAt: -1});
    return NextResponse.json({data: Products}, {status: 200});
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const {title, description} = body;
    if(!title || !description) {
        return NextResponse.json({message: "Title and Description required!!!"}, {status: 400});
    }
    const slug = slugify(title);
    const exists = await Service.findOne({slug});
    if(exists) {
        return NextResponse.json({message: "Slug already exists!!!"}, {status: 409});
    }
    const service = await Service.create({title, slug, description, isActive: true});
    return NextResponse.json({message: "New service created!!!"}, {status:201});
}