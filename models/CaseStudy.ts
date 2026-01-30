import mongoose, { Schema } from "mongoose";

const CaseStudySchema = new Schema( {
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
            unique : true,
        },
        content : {
            type : String,
            required : true,
            unique : true,
        },
        industry : {
            type : String,
            required : true,
            unique : true,
        },
        clientName : {
            type : String,
        },
        featuredImage : {
            type : String,
            required : true,
            unique : true,
        },
        gallery : {
            type : [String],
        },
        technologyUsed : {
            type : [String],
        },
        isFeatured : {
            type : Boolean,
            required : true,
            default : false,
        },
        isActive : {
            type : Boolean,
            required : true,
            default : true,
        },
        seoTitle : {
            type : String,
            required : true,
            unique : true,
            default : function () {
                return this.title;
            },
        },
        seoDescription : {
            type : String,
            required : true,
            default: function () {
                return this.description;
            },
        },
    },
    { timestamps : true},
);

export const CaseStudy = mongoose.models.CaseStudies || mongoose.model("CaseStudy", CaseStudySchema);