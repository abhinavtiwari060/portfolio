import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  name: string;
  icon: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  proficiency: number;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "Code" },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "Tools"],
      default: "Frontend",
    },
    proficiency: { type: Number, default: 85, min: 0, max: 100 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1, displayOrder: 1 });

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
