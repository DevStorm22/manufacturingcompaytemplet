import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema( {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        slug:{
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Float16Array,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        }
    }, {
        timestamps: true,
    },
);

export const Product = mongoose.models.Products || mongoose.model("Product", ProductSchema);