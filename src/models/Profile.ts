import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface IProfile extends Document {
  name: string;
  profilePhoto: string;
  headline: string;
  shortBio: string;
  detailedBio: string;
  resumeUrl: string;
  email: string;
  location: string;
  availability: string;
  education: IEducation[];
  careerInformation: string;
  devPhilosophy: string;
  whatILikeBuilding: string;
  learningNow: string[];
  careerGoals: string;
  socialLinks: ISocialLink[];
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String },
});

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
});

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, default: "Abhinav Kumar Tiwari" },
    profilePhoto: { type: String, default: "" },
    headline: {
      type: String,
      default: "Developer • Builder • Problem Solver",
    },
    shortBio: {
      type: String,
      default:
        "I build practical, user-focused web experiences and enjoy turning ideas into high-performance, resilient products.",
    },
    detailedBio: { type: String, default: "" },
    resumeUrl: { type: String, default: "#" },
    email: { type: String, default: "abhinavtiwari@example.com" },
    location: { type: String, default: "India" },
    availability: { type: String, default: "Open to opportunities" },
    education: [EducationSchema],
    careerInformation: { type: String, default: "" },
    devPhilosophy: {
      type: String,
      default:
        "Write clean, readable code that solves real problems. Keep systems simple, test thoroughly, and craft experiences that feel fast, intuitive, and delightful.",
    },
    whatILikeBuilding: {
      type: String,
      default:
        "Full-stack web applications, scalable backend APIs, developer tools, and tactile, high-craft user interfaces.",
    },
    learningNow: [{ type: String }],
    careerGoals: {
      type: String,
      default:
        "To collaborate with world-class engineering teams building products that millions of users rely on daily.",
    },
    socialLinks: [SocialLinkSchema],
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
