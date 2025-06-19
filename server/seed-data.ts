import { db } from "./db";
import { users, jobs, tasks } from "@shared/schema";

export async function seedDemoData() {
  try {
    // Check if data already exists
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
      console.log("Demo data already exists, skipping seed");
      return;
    }

    console.log("Seeding demo data...");

    // Create demo users
    const [freelancer1] = await db.insert(users).values({
      username: "rahman_ahmed",
      email: "rahman@example.com",
      password: "password123",
      fullName: "Rahman Ahmed",
      role: "freelancer",
      city: "dhaka",
      bio: "Professional logo designer with 5+ years experience",
      skills: ["Logo Design", "Branding", "Adobe Illustrator"],
    }).returning();

    const [freelancer2] = await db.insert(users).values({
      username: "fatima_khan",
      email: "fatima@example.com",
      password: "password123",
      fullName: "Fatima Khan",
      role: "freelancer",
      city: "chittagong",
      bio: "Full-stack web developer specializing in WordPress",
      skills: ["WordPress", "PHP", "JavaScript", "React"],
    }).returning();

    const [employer] = await db.insert(users).values({
      username: "techcorp_hr",
      email: "hr@techcorp.com",
      password: "password123",
      fullName: "TechCorp HR",
      role: "employer",
      city: "dhaka",
      bio: "Leading technology company in Bangladesh",
      skills: [],
    }).returning();

    // Create demo jobs
    await db.insert(jobs).values([
      {
        title: "Senior Software Engineer",
        description: "Looking for an experienced software engineer to join our growing team. Must have expertise in React, Node.js, and MongoDB.",
        company: "TechCorp Bangladesh",
        location: "Dhaka, Bangladesh",
        city: "dhaka",
        salary: "৳80,000 - ৳120,000/month",
        type: "full-time",
        category: "technology",
        requirements: ["3-5 years experience", "React expertise", "Node.js knowledge"],
        skills: ["React", "Node.js", "MongoDB"],
        experience: "3-5 years experience",
        employerId: employer.id,
        isActive: true,
      },
      {
        title: "Digital Marketing Manager",
        description: "We are seeking a creative and results-driven Digital Marketing Manager to develop and execute our online marketing strategies.",
        company: "Digital Nexus Ltd",
        location: "Chittagong, Bangladesh",
        city: "chittagong",
        salary: "৳50,000 - ৳75,000/month",
        type: "full-time",
        category: "marketing",
        requirements: ["2-4 years experience", "Google Ads certified", "Social media expertise"],
        skills: ["Google Ads", "Facebook Marketing", "SEO", "Content Marketing"],
        experience: "2-4 years experience",
        employerId: employer.id,
        isActive: true,
      },
      {
        title: "Frontend Developer",
        description: "Join our dynamic team as a Frontend Developer. Work on exciting projects using modern JavaScript frameworks and create amazing user experiences.",
        company: "Innovation Hub",
        location: "Sylhet, Bangladesh",
        city: "sylhet",
        salary: "৳45,000 - ৳65,000/month",
        type: "full-time",
        category: "technology",
        requirements: ["1-3 years experience", "JavaScript proficiency", "React/Vue.js knowledge"],
        skills: ["JavaScript", "React", "CSS", "HTML"],
        experience: "1-3 years experience",
        employerId: employer.id,
        isActive: true,
      },
      {
        title: "Business Development Executive",
        description: "Looking for an ambitious Business Development Executive to drive growth and establish partnerships in the local market.",
        company: "Growth Partners BD",
        location: "Dhaka, Bangladesh",
        city: "dhaka",
        salary: "৳35,000 - ৳55,000/month",
        type: "full-time",
        category: "business",
        requirements: ["1-2 years experience", "Strong communication skills", "Sales background"],
        skills: ["Sales", "Negotiation", "Market Research", "Client Relations"],
        experience: "1-2 years experience",
        employerId: employer.id,
        isActive: true,
      },
      {
        title: "Data Analyst",
        description: "We need a detail-oriented Data Analyst to help us make data-driven decisions and optimize our business processes.",
        company: "Analytics Pro",
        location: "Rajshahi, Bangladesh",
        city: "rajshahi",
        salary: "৳40,000 - ৳60,000/month",
        type: "full-time",
        category: "technology",
        requirements: ["2-3 years experience", "Excel/SQL proficiency", "Statistical knowledge"],
        skills: ["Excel", "SQL", "Python", "Power BI"],
        experience: "2-3 years experience",
        employerId: employer.id,
        isActive: true,
      },
      {
        title: "Graphic Designer",
        description: "Creative Graphic Designer needed to work on branding, marketing materials, and digital content for our growing agency.",
        company: "Creative Studio BD",
        location: "Khulna, Bangladesh",
        city: "khulna",
        salary: "৳25,000 - ৳40,000/month",
        type: "full-time",
        category: "design",
        requirements: ["1-2 years experience", "Adobe Creative Suite", "Portfolio required"],
        skills: ["Photoshop", "Illustrator", "InDesign", "Branding"],
        experience: "1-2 years experience",
        employerId: employer.id,
        isActive: true,
      }
    ]);

    // Create demo tasks
    await db.insert(tasks).values([
      {
        title: "I will design a professional logo for your business",
        description: "Get a unique, professional logo design that represents your brand perfectly. Includes multiple revisions and source files.",
        category: "Graphics & Design",
        price: 2500,
        deliveryTime: 3,
        images: [],
        freelancerId: freelancer1.id,
        isActive: true,
      },
      {
        title: "I will develop a responsive WordPress website",
        description: "Custom WordPress development with modern design, mobile optimization, and SEO-friendly structure. Perfect for small businesses.",
        category: "Programming & Tech",
        price: 15000,
        deliveryTime: 7,
        images: [],
        freelancerId: freelancer2.id,
        isActive: true,
      },
      {
        title: "I will write engaging content for your website",
        description: "Professional content writing services for websites, blogs, and marketing materials. SEO-optimized and engaging copy that converts.",
        category: "Writing & Translation",
        price: 1500,
        deliveryTime: 2,
        images: [],
        freelancerId: freelancer1.id,
        isActive: true,
      },
      {
        title: "I will create stunning social media graphics",
        description: "Eye-catching graphics for Facebook, Instagram, LinkedIn, and other social platforms. Modern designs that boost engagement.",
        category: "Graphics & Design",
        price: 800,
        deliveryTime: 1,
        images: [],
        freelancerId: freelancer2.id,
        isActive: true,
      },
      {
        title: "I will build a custom React web application",
        description: "Full-stack React development with modern UI/UX, API integration, and responsive design. Perfect for startups and businesses.",
        category: "Programming & Tech",
        price: 25000,
        deliveryTime: 14,
        images: [],
        freelancerId: freelancer1.id,
        isActive: true,
      },
      {
        title: "I will translate documents from English to Bengali",
        description: "Professional translation services with native fluency. Accurate translations for business documents, websites, and marketing materials.",
        category: "Writing & Translation",
        price: 500,
        deliveryTime: 2,
        images: [],
        freelancerId: freelancer2.id,
        isActive: true,
      },
      {
        title: "I will manage your social media accounts",
        description: "Complete social media management including content creation, posting schedule, and engagement. Grow your online presence effectively.",
        category: "Digital Marketing",
        price: 8000,
        deliveryTime: 30,
        images: [],
        freelancerId: freelancer1.id,
        isActive: true,
      },
      {
        title: "I will create professional business cards",
        description: "Modern business card designs that make a lasting impression. Multiple concepts, unlimited revisions, print-ready files included.",
        category: "Graphics & Design",
        price: 1200,
        deliveryTime: 2,
        images: [],
        freelancerId: freelancer2.id,
        isActive: true,
      }
    ]);

    console.log("Demo data seeded successfully!");
  } catch (error) {
    console.error("Error seeding demo data:", error);
  }
}