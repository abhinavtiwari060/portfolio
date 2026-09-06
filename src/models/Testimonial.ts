import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  profilePhoto: string;
  designation: string;
  organization: string;
  videoUrl: string;
  thumbnail: string;
  testimonialText: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    profilePhoto: { type: String, default: "" },
    designation: { type: String, default: "Peer / Collaborator" },
    organization: { type: String, default: "Tech Community" },
    videoUrl: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    testimonialText: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ published: 1, displayOrder: 1 });

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
