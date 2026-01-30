import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const products = await Product.find().sort( { createdAt : -1} );
    return NextResponse.json( { data : products }, { status : 200 } );
}

export async function POST(req : Request) {
    await connectDB();
    const body = await req.json();
    const { title, description, price } = body;
    if(!title || !description || !price) {
        return NextResponse.json( { message : "Please enter title, description and price" }, { status : 400 } );
    }
    const slug = slugify(title);
    const exists = await Product.findOne( { slug });
    if(exists) {
        return NextResponse.json( { message: "Slug already exists!!!" }, { status : 409});
    }
    const product = Product.create( { title, slug, description, price, isAvailable : true});
    return NextResponse.json( { message: "New Product added!!!" }, { status: 200 } );
}