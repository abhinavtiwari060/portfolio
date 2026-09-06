import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  problem: string;
  solution: string;
  features: string[];
  images: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, default: "" },
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    features: [{ type: String }],
    images: [{ type: String }],
    technologies: [{ type: String }],
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    category: { type: String, default: "Full Stack" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ featured: 1, published: 1 });
ProjectSchema.index({ displayOrder: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
