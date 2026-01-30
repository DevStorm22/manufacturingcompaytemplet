import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT( req : Request, { params } : { params : Promise < { id : string } > }) {
    
    // Connecting Database
    await connectDB();

    // Declaration section
    const { id } = await params; // Extracting Id from params
    const body = await req.json(); // Extracting all content of request
    const { title, description, price, isAvailable } = body; // Destructing the content
    const updateData: any = {}; // An empty object creation with no type restrictions
    
    // Checking for the updations
    if(title) {
        updateData.title = title;
        updateData.slug = slugify(updateData.title);
    }
    if (description) {
        updateData.description = description;
    }
    if (price) {
        updateData.price = price;
    }
    if(typeof isAvailable === "boolean") {
        updateData.isAvailable = isAvailable;
    }

    // Checking for the PUT request with empty parameters
    /*
    Object.keys(array) is used to acces the list of the keys of the array.
    .length defines the number of keys present in the array (size).
    */
    if(Object.keys(updateData).length === 0) {
        return NextResponse.json( { message : "No valid updates!!!" }, { status : 400 } );
    }

    // CORE operation (Updation logic)
    try {
        const updatedProduct = await Product.findByIdAndUpdate( id, updateData, { new : true } );

        // Checking for product is updated or not
        if(!updatedProduct) {
            return NextResponse.json( { message : "Product not found!!!" }, { status : 404 } );
        }
        
        return NextResponse.json( { message : "Product updated successfully!!!" }, { status : 200 } );
    }
    catch (error : any) { // Catching error of any type
        return NextResponse.json( { message : error.message }, { status : 500 } );
    }
}