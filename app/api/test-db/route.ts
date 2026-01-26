import {connectDB} from "../../../lib/db";
import { NextResponse } from "next/server";
export async function GET()
{
    try
    {
        await connectDB();
        return NextResponse.json({ message: "Database Connected Successfully"},
            {status: 200}
        );
    }
    catch(error)
    {
        return NextResponse.json({message:"Database Connection Failed"},
            {status: 500}
        );
    }
}