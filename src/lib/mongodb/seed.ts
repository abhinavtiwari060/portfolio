import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Admin, Profile, Project, Article, Skill, Testimonial, WebsiteSettings } from "../../models";
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialArticles,
  initialTestimonials,
} from "./seedData";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/abhinav_portfolio";

async function seed() {
  console.log("[Seed] Connecting to MongoDB Atlas at:", MONGODB_URI.replace(/:([^@]+)@/, ":****@"));

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("[Seed] Connected successfully to Atlas.");

    // 1. Seed or Update Admin to abhitiwariaj@gmail.com
    const adminEmail = (process.env.ADMIN_EMAIL || "abhitiwariaj@gmail.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "abhi@1234#tiwari";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Delete any old demo admin account
    await Admin.deleteMany({ email: { $ne: adminEmail } });

    // Upsert the required admin account
    await Admin.findOneAndUpdate(
      { email: adminEmail },
      { email: adminEmail, passwordHash, role: "admin" },
      { upsert: true, new: true }
    );
    console.log(`[Seed] Admin user verified & updated: ${adminEmail}`);

    // 2. Seed WebsiteSettings if not existing
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      await WebsiteSettings.create({
        showHero: true,
        showAbout: true,
        showSkills: true,
        showProjects: true,
        showArticles: true,
        showTestimonials: true,
        showContact: true,
      });
      console.log("[Seed] Initial website section visibility settings initialized.");
    }

    // 3. Seed Profile if empty
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create(initialProfile);
      console.log("[Seed] Profile seeded successfully.");
    }

    // 4. Seed Skills if empty
    const skillsCount = await Skill.countDocuments();
    if (skillsCount === 0) {
      await Skill.insertMany(initialSkills);
      console.log(`[Seed] ${initialSkills.length} skills seeded.`);
    }

    // 5. Seed Projects if empty
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(`[Seed] ${initialProjects.length} projects seeded.`);
    }

    // 6. Seed Articles if empty
    const articlesCount = await Article.countDocuments();
    if (articlesCount === 0) {
      await Article.insertMany(initialArticles);
      console.log(`[Seed] ${initialArticles.length} articles seeded.`);
    }

    // 7. Seed Testimonials if empty
    const testimonialsCount = await Testimonial.countDocuments();
    if (testimonialsCount === 0) {
      await Testimonial.insertMany(initialTestimonials);
      console.log(`[Seed] ${initialTestimonials.length} testimonials seeded.`);
    }

    console.log("\n✅ [Seed] Database seeding & admin update completed successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ [Seed Error] Could not complete database seeding:", error.message);
    process.exit(1);
  }
}

seed();
