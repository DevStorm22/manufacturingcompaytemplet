import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { CaseStudy } from "@/models/CaseStudy";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    await connectDB();
    const caseStudies = await CaseStudy.find().sort( { createdAt : -1 } );
    return NextResponse.json( { data : caseStudies }, { status : 200 } );
}

export async function POST(req : NextRequest) {
    await connectDB();
    const body = await req.json();
    const { title, description, content, industry } = body;
    
    if ( !title || !description || !industry || !content) {
        return NextResponse.json( { message : "title, description, content, industry, are required" }, { status : 400 } );
    }
    
    const slug = slugify(title);
    
    const exits = await CaseStudy.findOne( { slug } );
    if( exits ) {
        return NextResponse.json( { message : "Slug already exits!!!" }, { status : 409 } );
    }
    
    return NextResponse.json( { message : "New case study added!!!" }, { status : 200 } );
}