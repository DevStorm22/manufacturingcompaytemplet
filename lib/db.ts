import mongoose, { Mongoose } from "mongoose";

declare global {
    var mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    } | undefined;
}

const MONGO_URI = process.env.DATABASE_URL as string;
if(!MONGO_URI)
{
    throw new Error("MONGO_URI is not defined");
}
let cached = global.mongoose;
if(!cached)
{
    cached = global.mongoose = {conn: null, promise: null};
}
export async function connectDB()
{
    if(!cached) {
        cached = global.mongoose = {conn: null, promise: null};
    }
    if(cached.conn) return cached.conn;
    if(!cached.promise)
    {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
