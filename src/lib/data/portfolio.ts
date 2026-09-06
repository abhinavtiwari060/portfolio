import connectToDatabase from "../mongodb";
import { Profile, Skill, Project, Article, Testimonial } from "@/models";
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialArticles,
  initialTestimonials,
} from "../mongodb/seedData";

export async function getPortfolioData() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      console.warn("[Portfolio Data] Using seed data fallback because MongoDB is not connected.");
      return {
        profile: initialProfile,
        skills: initialSkills,
        projects: initialProjects,
        articles: initialArticles,
        testimonials: initialTestimonials,
      };
    }

    // Fetch Profile
    let profile = await Profile.findOne().lean();
    if (!profile) {
      // Auto seed initial profile
      profile = (await Profile.create(initialProfile)).toObject();
    }

    // Fetch Skills
    let skills = await Skill.find().sort({ category: 1, displayOrder: 1 }).lean();
    if (!skills || skills.length === 0) {
      await Skill.insertMany(initialSkills);
      skills = await Skill.find().sort({ category: 1, displayOrder: 1 }).lean();
    }

    // Fetch Projects
    let projects = await Project.find({ published: true })
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .lean();
    if (!projects || projects.length === 0) {
      await Project.insertMany(initialProjects);
      projects = await Project.find({ published: true })
        .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
        .lean();
    }

    // Fetch Articles
    let articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean();
    if (!articles || articles.length === 0) {
      await Article.insertMany(initialArticles);
      articles = await Article.find({ published: true })
        .sort({ publishedAt: -1 })
        .lean();
    }

    // Fetch Testimonials
    let testimonials = await Testimonial.find({ published: true })
      .sort({ displayOrder: 1 })
      .lean();
    if (!testimonials || testimonials.length === 0) {
      await Testimonial.insertMany(initialTestimonials);
      testimonials = await Testimonial.find({ published: true })
        .sort({ displayOrder: 1 })
        .lean();
    }

    // Serialize MongoDB ObjectIds and Dates for Next.js Server Components
    return JSON.parse(
      JSON.stringify({
        profile,
        skills,
        projects,
        articles,
        testimonials,
      })
    );
  } catch (error) {
    console.error("[Portfolio Data Error]", error);
    return {
      profile: initialProfile,
      skills: initialSkills,
      projects: initialProjects,
      articles: initialArticles,
      testimonials: initialTestimonials,
    };
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const db = await connectToDatabase();
    if (db) {
      const project = await Project.findOne({ slug }).lean();
      if (project) {
        return JSON.parse(JSON.stringify(project));
      }
    }
  } catch (err) {
    console.error("[Project By Slug Error]", err);
  }

  // Fallback to initialProjects
  const fallback = initialProjects.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getArticleBySlug(slug: string) {
  try {
    const db = await connectToDatabase();
    if (db) {
      const article = await Article.findOne({ slug }).lean();
      if (article) {
        return JSON.parse(JSON.stringify(article));
      }
    }
  } catch (err) {
    console.error("[Article By Slug Error]", err);
  }

  // Fallback to initialArticles
  const fallback = initialArticles.find((a) => a.slug === slug);
  return fallback || null;
}
