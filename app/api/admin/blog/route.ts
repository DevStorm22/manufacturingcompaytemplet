import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { Blog } from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const blogs = await Blog.find().sort( { createdAt : -1});
    return NextResponse.json( { data : blogs }, { status : 200 } );
}

export async function POST( req : Request) {
    await connectDB();
    const body = await req.json();
    const { title, description, content, coverImage, tags, publishedDate } = body;

    if( !title || !description || !content || !coverImage || !tags || !publishedDate ) {
        return NextResponse.json( { message : "title, description, content, coverImage, tags, publishDate" }, { status : 400 } );
    }
    
    const slug = slugify( title );

    const exits = await Blog.findOne( { slug } );
    if( exits ) {
        return NextResponse.json( { message : "Slug already exits!!!" }, { status : 409 } );
    }
    
    return NextResponse.json( { message : "New Blog added!!!" }, { status : 200 } );
}