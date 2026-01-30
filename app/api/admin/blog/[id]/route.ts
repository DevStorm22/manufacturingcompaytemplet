import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function PUT( req : Request, { params } : { params : Promise < { id : String } > } ) {
    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const { title, description, content, coverImage, tags, category, author, publishedDate, isActive, seoTitle, seoDescription, seoKeyword, views } = body;
    const updatedData: any = {};

    if( title ) {
        updatedData.title = title;
    }
    if( description ) {
        updatedData.description = description;
    }
    if( content ) {
        updatedData.content = content;
    }
    if( coverImage ) {
        updatedData.coverImage = coverImage;
    }
    if( tags ) {
        updatedData.tags = tags;
    }
    if( category ) {
        updatedData.category = category;
    }
    if( author ) {
        updatedData.author = author;
    }
    if( publishedDate ) {
        updatedData.publishedDate = publishedDate;
    }
    if( typeof isActive === "boolean") {
        updatedData.isActive = isActive;
    }
    if( seoTitle ) {
        updatedData.seoTitle = seoTitle;
    }
    if( seoDescription ) {
        updatedData.seoDescription = seoDescription;
    }
    if( seoKeyword ) {
        updatedData.seoKeyword = seoKeyword;
    }
    if( views ) {
        updatedData.views = views;
    }
    if( Object.keys( updatedData ).length === 0) {
        return NextResponse.json( { message : "No Blog found!!!" }, { status : 400 } );
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate( id, updatedData, { new : true } );
        if( !updatedBlog ) {
            return NextResponse.json( { message : "Blog not found!!!" }, { status : 404 } );
        }
        return NextResponse.json( { message : "Blog updated successfully!!!" }, { status : 200 } );
    }
    catch (error : any ) { 
        return NextResponse.json( { message: error.message }, { status : 500 } );
    }
}