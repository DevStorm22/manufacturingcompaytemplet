import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema( {
        title : {
            type : String,
            required : true,
            unique : true,
        },
        slug : {
            type : String,
            required : true,
            unique : true,
        },
        description : {
            type : String,
            required : true,
        },
        content : {
            type : String,
            required : true,
        },
        coverImage : {
            type : String,
            required : true,
        },
        tags : {
            type : [ String ],
            required : true,
        },
        category : {
            type : String,
        },
        author : {
            type : String,
        },
        publishedDate : {
            type : Date,
            required : true,
        },
        isActive : {
            type : Boolean,
            required : true,
        },
        seoTitle : {
            type : String,
            required : true,
            default : function() {
                return this.title;
            },
        },
        seoDescription : {
            type : String,
            required : true,
            default : function() {
                return this.description;
            },
        },
        seoKeyword : {
            type : [String],
        },
        views : {
            type : Number,
        },
    }, {
        timestamps : true,
    },
);

export const Blog = mongoose.models.BlogSchema || mongoose.model( "Blog", BlogSchema );