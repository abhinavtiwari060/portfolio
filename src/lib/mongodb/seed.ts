import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Admin, Profile, Project, Article, Skill, Testimonial } from "../../models";
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialArticles,
  initialTestimonials,
} from "./seedData";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/abhinav_portfolio";

async function seed() {
  console.log("[Seed] Connecting to MongoDB at:", MONGODB_URI);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("[Seed] Connected successfully.");

    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@abhinav.dev").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@Chai123";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await Admin.findOneAndUpdate(
      { email: adminEmail },
      { email: adminEmail, passwordHash, role: "admin" },
      { upsert: true, new: true }
    );
    console.log(`[Seed] Admin user created/updated: ${adminEmail}`);

    // 2. Seed Profile
    await Profile.deleteMany({});
    await Profile.create(initialProfile);
    console.log("[Seed] Profile seeded successfully.");

    // 3. Seed Skills
    await Skill.deleteMany({});
    await Skill.insertMany(initialSkills);
    console.log(`[Seed] ${initialSkills.length} skills seeded.`);

    // 4. Seed Projects
    await Project.deleteMany({});
    await Project.insertMany(initialProjects);
    console.log(`[Seed] ${initialProjects.length} projects seeded.`);

    // 5. Seed Articles
    await Article.deleteMany({});
    await Article.insertMany(initialArticles);
    console.log(`[Seed] ${initialArticles.length} articles seeded.`);

    // 6. Seed Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(initialTestimonials);
    console.log(`[Seed] ${initialTestimonials.length} testimonials seeded.`);

    console.log("\n✅ [Seed] Database seeding completed successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ [Seed Error] Could not complete database seeding:", error.message);
    process.exit(1);
  }
}

seed();
