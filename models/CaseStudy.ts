import mongoose, { Schema, models } from "mongoose";

const CaseStudySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String, // URL or path
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const CaseStudy =
  models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);
