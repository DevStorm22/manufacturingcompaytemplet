import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { CaseStudy } from "@/models/CaseStudy";
import { NextRequest, NextResponse } from "next/server";

export async function PUT( req : NextRequest, { params } : { params : Promise< { id : string } > } ) {
    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const { title, description, content, industry, clientName, featuredImage, gallery, technologyUsed, isFeatured, isActive, seoTitle, seoDescription } = body;
    const updatedData : any = {};

    if( title ) {
        updatedData.title = title;
        updatedData.slug = slugify(updatedData.title);
    }
    if( description ) {
        updatedData.description = description;
    }
    if( content ) {
        updatedData.content = content;
    }
    if( industry ) {
        updatedData.industry = industry;
    }
    if( clientName ) {
        updatedData.clientName = clientName;
    }
    if( featuredImage ) {
        updatedData.featuredImage = featuredImage;
    }
    if( gallery ) {
        updatedData.gallery = gallery;
    }
    if( technologyUsed ) {
        updatedData.technologyUsed = technologyUsed;
    }
    if( seoTitle ) {
        updatedData.seoTitle = seoTitle;
    }
    if( seoDescription ) {
        updatedData.seoDescription = seoDescription;
    }
    if( typeof isActive === "boolean" ) {
        updatedData.isActive = isActive;
    }
    if( typeof isFeatured === "boolean" ) {
        updatedData.isFeatured = isFeatured;
    }
    if ( Object.keys( updatedData ).length === 0 ) {
        return NextResponse.json( { message : "No valid updated!!!" }, { status : 400 } );
    }

    try {
        const updatedCaseStudy = await CaseStudy.findByIdAndUpdate( id, updatedData, { new : true } );
        if ( !updatedCaseStudy ) {
            return NextResponse.json( { message : "Case Study not found!!!" }, { status : 404 } );
        }
        return NextResponse.json( { message : "Case Study updated successfully!!!" }, { status : 200 } );
    }
    catch (error : any) {
        return NextResponse.json( { message : error.message }, { status : 500 } );
    }
}