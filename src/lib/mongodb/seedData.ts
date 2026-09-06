export const initialProfile = {
  name: "Abhinav Kumar Tiwari",
  headline: "Developer • Builder • Problem Solver",
  shortBio:
    "I build practical, user-focused web experiences and enjoy turning ideas into high-performance, resilient products.",
  detailedBio: `I am a dedicated full-stack software developer who thrives at the intersection of robust backend engineering and thoughtful, tactile user interface design.

My development journey began with an innate curiosity about how distributed systems scale and how modern digital interfaces communicate with servers. Over the years, that curiosity has turned into a disciplined engineering practice: designing clean database schemas, crafting modular REST APIs, and building modern web applications that prioritize user experience and performance.

I strongly believe that good software is not just about writing code that works—it is about writing code that is simple to understand, straightforward to maintain, and a pleasure for end users to interact with every day.`,
  resumeUrl: "#",
  email: "abhinavtiwari@example.com",
  location: "India",
  availability: "Open to opportunities",
  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Technical University",
      year: "2021 – 2025",
      description:
        "Focused on Data Structures, Algorithms, Distributed Computing, Database Management Systems, and Web Architecture.",
    },
  ],
  careerInformation:
    "Specializing in modern full-stack web engineering, scalable backend APIs, and tactile interactive frontend systems.",
  devPhilosophy:
    "Write clean, readable code that solves real problems. Keep systems simple, test thoroughly, and craft experiences that feel fast, intuitive, and delightful.",
  whatILikeBuilding:
    "Full-stack web applications, scalable backend APIs, developer tools, and tactile, high-craft user interfaces.",
  learningNow: [
    "Distributed Systems Architecture",
    "Cloud Native Tooling & Microservices",
    "Advanced TypeScript Design Patterns",
    "High-Performance Web Animations",
  ],
  careerGoals:
    "To collaborate with world-class engineering teams building impactful, high-scale products that millions of users rely on daily.",
  profilePhoto:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/abhinavtiwari", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abhinavtiwari", icon: "Linkedin" },
    { platform: "Twitter/X", url: "https://twitter.com/abhinavtiwari", icon: "Twitter" },
    { platform: "Email", url: "mailto:abhinavtiwari@example.com", icon: "Mail" },
  ],
};

export const initialSkills = [
  // Frontend
  { name: "HTML", category: "Frontend", icon: "FileCode", proficiency: 95, displayOrder: 1 },
  { name: "CSS", category: "Frontend", icon: "Palette", proficiency: 92, displayOrder: 2 },
  { name: "JavaScript", category: "Frontend", icon: "Code", proficiency: 92, displayOrder: 3 },
  { name: "React", category: "Frontend", icon: "Atom", proficiency: 90, displayOrder: 4 },
  { name: "Next.js", category: "Frontend", icon: "Layers", proficiency: 88, displayOrder: 5 },
  { name: "Tailwind CSS", category: "Frontend", icon: "Wind", proficiency: 94, displayOrder: 6 },
  // Backend
  { name: "Node.js", category: "Backend", icon: "Server", proficiency: 88, displayOrder: 7 },
  { name: "Express", category: "Backend", icon: "Cpu", proficiency: 86, displayOrder: 8 },
  { name: "REST APIs", category: "Backend", icon: "Network", proficiency: 90, displayOrder: 9 },
  // Database
  { name: "MongoDB", category: "Database", icon: "Database", proficiency: 88, displayOrder: 10 },
  { name: "SQL", category: "Database", icon: "Table", proficiency: 82, displayOrder: 11 },
  // Tools
  { name: "Git", category: "Tools", icon: "GitBranch", proficiency: 90, displayOrder: 12 },
  { name: "GitHub", category: "Tools", icon: "Github", proficiency: 92, displayOrder: 13 },
  { name: "VS Code", category: "Tools", icon: "Terminal", proficiency: 96, displayOrder: 14 },
  { name: "Docker", category: "Tools", icon: "Box", proficiency: 78, displayOrder: 15 },
];

export const initialProjects = [
  {
    title: "DevPulse - Engineering Momentum & Activity Hub",
    slug: "devpulse-engineering-momentum-hub",
    shortDescription:
      "A centralized dashboard aggregating GitHub commits, pull requests, and CI/CD deployment telemetry into real-time health analytics.",
    detailedDescription: `### Overview
DevPulse is an engineering telemetry dashboard designed for high-performing technical teams. It provides engineering managers and developers with an actionable, real-time pulse on daily engineering momentum without manual status reports.

### The Problem
Engineering teams frequently work across fragmented SaaS tools—GitHub for source control, GitHub Actions for CI/CD, and external issue trackers. Keeping track of code velocity, merge bottlenecks, and broken deployments requires bouncing across multiple browser tabs and mental context-switching.

### The Solution
DevPulse introduces a unified webhook ingestion pipeline that captures Git events and build statuses in real time. It renders interactive activity heatmaps, identifies stalled pull requests, and calculates automated deployment health scores with instant team notifications.`,
    problem:
      "Developers work across fragmented tools (GitHub, CI/CD, issue trackers), creating blind spots in project velocity and release health.",
    solution:
      "DevPulse aggregates multi-platform webhooks into a unified stream with visual activity heatmaps, deployment telemetry, and alert notifications.",
    features: [
      "Real-time webhook ingestion engine for GitHub repositories",
      "Interactive SVG activity heatmaps and commit velocity charts",
      "Stalled PR and code review latency alert system",
      "Automated CI/CD build success telemetry and health scores",
      "Clean dark UI with orange accent notifications",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/abhinavtiwari/devpulse",
    liveUrl: "https://devpulse.example.com",
    category: "Full Stack",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    title: "ChaiStack - Tactile Claymorphism UI Library",
    slug: "chaistack-tactile-claymorphism-ui",
    shortDescription:
      "An accessible, production-grade React & Tailwind component library featuring warm orange claymorphism and soft 3D UI physics.",
    detailedDescription: `### Overview
ChaiStack is an open-source component library built to bring tactile, organic 3D design to the modern web. Built with React, Tailwind CSS, and Framer Motion, it features soft dual-layer inner bevels, smooth spring physics, and full WCAG AA contrast compliance.

### The Problem
Modern web interfaces often feel either overly flat and corporate or cartoonishly cluttered with poorly optimized CSS effects that degrade rendering performance and accessibility.

### The Solution
Engineered a systematic set of 3D tactile UI primitives with smooth spring physics, dual inner lighting, and WCAG AA contrast compliance. Each component is fully typed, accessible via keyboard navigation, and respects prefers-reduced-motion.`,
    problem:
      "Modern web interfaces often feel either flat and corporate or cartoonishly cluttered with unoptimized CSS effects.",
    solution:
      "Engineered a systematic set of 3D tactile UI primitives with smooth spring physics, dual inner lighting, and WCAG AA contrast compliance.",
    features: [
      "30+ tactile clay components (cards, buttons, pills, inputs, modals)",
      "Zero layout shift rendering with hardware-accelerated transforms",
      "Interactive spring physics powered by Framer Motion",
      "High-contrast dark mode with Chai orange accents",
      "Complete keyboard accessibility and screen reader testing",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"],
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/abhinavtiwari/chaistack",
    liveUrl: "https://chaistack.example.com",
    category: "Frontend",
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    title: "TaskOrbit - Collaborative Real-Time Workflow Engine",
    slug: "taskorbit-collaborative-workflow-engine",
    shortDescription:
      "A real-time Kanban and workflow automation platform built for distributed technical teams with optimistic UI sync.",
    detailedDescription: `### Overview
TaskOrbit is a lightning-fast sprint planning and task management platform engineered for modern agile squads. It combines real-time synchronization with fluid drag-and-drop boards and automated workflow rules.

### The Problem
Development teams frequently spend excessive time manually updating ticket states, syncing branches with backlog items, and coordinating across timezones.

### The Solution
Built an event-driven workflow engine with optimistic UI updates, automated status triggers, and real-time multiplayer presence indicators that keep all team members synchronized instantly.`,
    problem:
      "Teams waste hours manually syncing task states between code merges, ticket status updates, and milestone tracking.",
    solution:
      "Built a responsive, event-driven workflow engine with optimistic UI updates and customizable automation rules.",
    features: [
      "Fluid drag-and-drop Kanban boards with instant state persistence",
      "Optimistic UI updates for zero-perceived-latency interactions",
      "Custom workflow triggers based on Git branch and commit patterns",
      "Granular role-based access control and team permissions",
      "Sprint velocity charts and burndown metrics",
    ],
    technologies: ["Next.js", "Express", "MongoDB", "Tailwind CSS", "WebSockets"],
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/abhinavtiwari/taskorbit",
    liveUrl: "https://taskorbit.example.com",
    category: "Full Stack",
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    title: "RestForge - Instant API Mocking & Validation Suite",
    slug: "restforge-api-mocking-validation-suite",
    shortDescription:
      "A lightweight CLI and web service to simulate, inspect, and schema-validate REST endpoints on the fly for frontend engineers.",
    detailedDescription: `### Overview
RestForge bridges the gap between frontend and backend teams during the early stages of feature development by generating instant mock endpoints that faithfully replicate production API contracts.

### The Problem
Frontend developers frequently get blocked waiting for backend API endpoints to be implemented, tested, and deployed to staging environments.

### The Solution
Created a developer-first tool that takes JSON schemas or sample payloads and generates instant, authenticated mock REST endpoints with configurable network latency and error simulation.`,
    problem:
      "Frontend development frequently gets blocked waiting for backend API contracts to be finalized and deployed.",
    solution:
      "Created an instant mock server generator with dynamic schema fuzzing, latency simulation, and JWT authentication testing.",
    features: [
      "Instant JSON schema mock generation with dynamic faker data",
      "Configurable network latency and error-rate simulation",
      "Request payload schema validation with clear error feedback",
      "One-click Postman collection and OpenAPI spec export",
      "Lightweight CLI binary for local development without internet",
    ],
    technologies: ["Node.js", "TypeScript", "Express", "MongoDB", "Docker"],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/abhinavtiwari/restforge",
    liveUrl: "https://restforge.example.com",
    category: "Backend",
    featured: false,
    published: true,
    displayOrder: 4,
  },
];

export const initialArticles = [
  {
    title: "Architecting Resilient Full-Stack Applications with Next.js & MongoDB",
    slug: "architecting-resilient-nextjs-mongodb",
    excerpt:
      "A deep dive into connection pooling, schema indexing, and serverless database resilience when building modern Next.js web applications.",
    category: "Engineering",
    tags: ["Next.js", "MongoDB", "Architecture", "Performance"],
    readingTime: "6 min read",
    author: "Abhinav Kumar Tiwari",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    published: true,
    publishedAt: new Date("2026-02-15"),
    content: `Building scalable full-stack applications with Next.js App Router and MongoDB requires deliberate architectural decisions, especially around how database connections are established and shared.

### The Serverless Connection Challenge
In a traditional Node.js server (like a long-running Express process), you establish a single Mongoose connection at startup and maintain that pool for the lifetime of the application.

However, in serverless runtime environments (such as Vercel), serverless functions spin up and spin down dynamically. If each incoming request opens a new MongoDB connection without pooling, you quickly exhaust MongoDB Atlas's maximum concurrent connection threshold.

\`\`\`typescript
// Global connection cache pattern in Next.js
let cached = global.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}
\`\`\`

### Indexing Strategies That Actually Matter
When schemas grow beyond a few hundred documents, unindexed queries cause collection scans that throttle CPU and spike latency.

Always index fields that appear in:
1. \`slug\` lookups (\`{ slug: 1 }\`) with unique constraints.
2. Filtering flags like \`{ published: 1, featured: 1 }\`.
3. Sorting keys such as \`{ createdAt: -1 }\`.

### Conclusion
By caching Mongoose connection promises and carefully designing compound indexes, you ensure your Next.js application delivers sub-100ms response times while remaining resilient under heavy traffic.`,
  },
  {
    title: "The Tactile Web: Crafting Modern Claymorphic UIs That Don't Hurt Usability",
    slug: "tactile-web-crafting-modern-claymorphism",
    excerpt:
      "How to use layered inner shadows, soft bevels, and warm color palettes to create memorable 3D interfaces while maintaining peak accessibility.",
    category: "UI & Design",
    tags: ["Design Systems", "CSS", "Claymorphism", "UX"],
    readingTime: "5 min read",
    author: "Abhinav Kumar Tiwari",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    published: true,
    publishedAt: new Date("2026-01-28"),
    content: `Web design trends move in waves. We went from the heavy skeuomorphism of the early 2010s to ultra-minimalist flat design, followed by glassmorphism and now **Claymorphism**—a soft, inflated, tactile 3D aesthetic that feels friendly and satisfying.

### Anatomy of a Claymorphic Element
Claymorphism relies on four key CSS properties working in harmony:

1. **Large Corner Radii**: Soft, pill-like curves (typically 24px to 32px).
2. **Layered Inset Shadows**: A subtle white/light highlight on the top-left edge, combined with a darker inset shadow on the bottom-right.
3. **Deep, Diffused Drop Shadows**: Soft, low-contrast ambient shadows that simulate light wrapping around an extruded surface.
4. **Curated Warmth**: Rather than harsh neon or sterile grays, warm charcoal backgrounds paired with Chai orange accents create an inviting, human feel.

\`\`\`css
.clay-card {
  background: linear-gradient(145deg, #161b24, #0f1218);
  border-radius: 28px;
  box-shadow: 
    0 12px 30px -4px rgba(0, 0, 0, 0.7),
    inset 1px 1px 2px rgba(255, 255, 255, 0.1),
    inset -2px -2px 4px rgba(0, 0, 0, 0.6);
}
\`\`\`

### Avoiding the Cartoonish Trap
To make claymorphism look technical and premium rather than childish:
- Keep the inner shadow blur tight (2px–4px) rather than giant blurry smears.
- Anchor the design with crisp typography, structured grids, and plenty of negative space.
- Reserve glowing orange accents for primary interactive states.`,
  },
  {
    title: "Mastering REST API Design: Beyond the Basic CRUD Pattern",
    slug: "mastering-rest-api-design-beyond-crud",
    excerpt:
      "Practical patterns for idempotency, structured error envelopes, pagination cursors, and graceful deprecation in production APIs.",
    category: "Backend",
    tags: ["Node.js", "REST APIs", "Clean Code", "Best Practices"],
    readingTime: "7 min read",
    author: "Abhinav Kumar Tiwari",
    coverImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    published: true,
    publishedAt: new Date("2026-01-10"),
    content: `Most developers learn REST through simple tutorials: GET all, GET one, POST to create, PUT to update, DELETE to remove.

However, in production environments with thousands of concurrent clients and complex business logic, basic CRUD quickly falls short.

### 1. Consistent Error Envelopes
Nothing frustrates API consumers more than inconsistent error responses. Standardize your error envelopes:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested project could not be located.",
    "timestamp": "2026-09-06T14:00:00Z"
  }
}
\`\`\`

### 2. Cursor-Based vs Offset Pagination
Using \`skip\` and \`limit\` in MongoDB is simple, but as offsets grow, performance degrades to O(N). For large datasets, cursor-based pagination using the document's \`_id\` or timestamp provides consistent O(1) query time:

\`\`\`typescript
const query = cursor ? { _id: { $lt: cursor } } : {};
const items = await Article.find(query).sort({ _id: -1 }).limit(10);
\`\`\`

### 3. Idempotency Keys
For operations that create charges, trigger emails, or reserve resources, accept an \`Idempotency-Key\` header to safely handle network retries without duplicate executions.`,
  },
];

export const initialTestimonials = [
  {
    name: "Collaborator / Peer",
    designation: "Frontend Engineer",
    organization: "Open Source Community",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    profilePhoto:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    testimonialText:
      "Abhinav has a great eye for detail and software architecture. His ability to break down complex full-stack requirements into modular, testable components made working alongside him an awesome experience.",
    displayOrder: 1,
    published: true,
  },
  {
    name: "Project Partner",
    designation: "UI/UX Designer",
    organization: "Developer Guild",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    profilePhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    testimonialText:
      "Collaborating with Abhinav is effortless. He bridges the gap between design vision and technical implementation flawlessly, never compromising on accessibility or responsive polish.",
    displayOrder: 2,
    published: true,
  },
];
