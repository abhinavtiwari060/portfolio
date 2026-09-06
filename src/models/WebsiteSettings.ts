import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebsiteSettings extends Document {
  showHero: boolean;
  showAbout: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showArticles: boolean;
  showTestimonials: boolean;
  showContact: boolean;
  siteTitle: string;
  siteDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    showHero: { type: Boolean, default: true },
    showAbout: { type: Boolean, default: true },
    showSkills: { type: Boolean, default: true },
    showProjects: { type: Boolean, default: true },
    showArticles: { type: Boolean, default: true },
    showTestimonials: { type: Boolean, default: true },
    showContact: { type: Boolean, default: true },
    siteTitle: {
      type: String,
      default: "Abhinav Kumar Tiwari (Abhi) • Full Stack Developer & Builder",
    },
    siteDescription: {
      type: String,
      default:
        "Developer • Builder • Problem Solver. Building practical, high-performance web experiences with modern architecture.",
    },
  },
  { timestamps: true }
);

export const WebsiteSettings: Model<IWebsiteSettings> =
  mongoose.models.WebsiteSettings ||
  mongoose.model<IWebsiteSettings>("WebsiteSettings", WebsiteSettingsSchema);
