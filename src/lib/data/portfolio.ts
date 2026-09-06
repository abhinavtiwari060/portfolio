import connectToDatabase from "../mongodb";
import { Profile, Skill, Project, Article, Testimonial, WebsiteSettings } from "@/models";
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialArticles,
  initialTestimonials,
} from "../mongodb/seedData";

export const defaultSettings = {
  showHero: true,
  showAbout: true,
  showSkills: true,
  showProjects: true,
  showArticles: true,
  showTestimonials: true,
  showContact: true,
  siteTitle: "Abhinav Kumar Tiwari (Abhi) • Full Stack Developer & Builder",
  siteDescription:
    "Developer • Builder • Problem Solver. Building practical, high-performance web experiences with modern architecture.",
};

export async function getPortfolioData() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      console.warn("[Portfolio Data] Database connection not established. Returning empty dataset.");
      return {
        profile: initialProfile,
        skills: [],
        projects: [],
        articles: [],
        testimonials: [],
        settings: defaultSettings,
      };
    }

    // Fetch WebsiteSettings
    let settings: any = await WebsiteSettings.findOne().lean();
    if (!settings) {
      settings = await WebsiteSettings.create(defaultSettings);
    }

    // Fetch Profile
    let profile: any = await Profile.findOne().lean();
    if (!profile) {
      profile = await Profile.create(initialProfile);
    }

    // Fetch Skills from MongoDB
    const skills = await Skill.find().sort({ category: 1, displayOrder: 1 }).lean();

    // Fetch Published Projects from MongoDB
    const projects = await Project.find({ published: true })
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .lean();

    // Fetch Published Articles from MongoDB
    const articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean();

    // Fetch Published Testimonials from MongoDB
    const testimonials = await Testimonial.find({ published: true })
      .sort({ displayOrder: 1 })
      .lean();

    // Serialize MongoDB ObjectIds and Dates for Next.js Server Components
    return JSON.parse(
      JSON.stringify({
        profile: profile || initialProfile,
        skills: skills || [],
        projects: projects || [],
        articles: articles || [],
        testimonials: testimonials || [],
        settings: {
          showHero: settings?.showHero ?? true,
          showAbout: settings?.showAbout ?? true,
          showSkills: settings?.showSkills ?? true,
          showProjects: settings?.showProjects ?? true,
          showArticles: settings?.showArticles ?? true,
          showTestimonials: settings?.showTestimonials ?? true,
          showContact: settings?.showContact ?? true,
          siteTitle: settings?.siteTitle || defaultSettings.siteTitle,
          siteDescription: settings?.siteDescription || defaultSettings.siteDescription,
        },
      })
    );
  } catch (error) {
    console.error("[Portfolio Data Error]", error);
    return {
      profile: initialProfile,
      skills: [],
      projects: [],
      articles: [],
      testimonials: [],
      settings: defaultSettings,
    };
  }
}

export async function getProjectBySlug(slug: string, onlyPublished: boolean = true) {
  try {
    const db = await connectToDatabase();
    if (db) {
      const query = onlyPublished ? { slug, published: true } : { slug };
      const project = await Project.findOne(query).lean();
      if (project) {
        return JSON.parse(JSON.stringify(project));
      }
    }
  } catch (err) {
    console.error("[Project By Slug Error]", err);
  }

  return null;
}

export async function getArticleBySlug(slug: string, onlyPublished: boolean = true) {
  try {
    const db = await connectToDatabase();
    if (db) {
      const query = onlyPublished ? { slug, published: true } : { slug };
      const article = await Article.findOne(query).lean();
      if (article) {
        return JSON.parse(JSON.stringify(article));
      }
    }
  } catch (err) {
    console.error("[Article By Slug Error]", err);
  }

  return null;
}

