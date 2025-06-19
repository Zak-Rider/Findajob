import { 
  users, jobs, tasks, applications, orders, messages,
  type User, type InsertUser, 
  type Job, type InsertJob,
  type Task, type InsertTask,
  type Application, type InsertApplication,
  type Order, type InsertOrder,
  type Message, type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Job operations
  getJob(id: number): Promise<Job | undefined>;
  getJobs(filters?: { city?: string; category?: string; search?: string }): Promise<Job[]>;
  getJobsByEmployer(employerId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined>;
  deleteJob(id: number): Promise<boolean>;

  // Task operations
  getTask(id: number): Promise<Task | undefined>;
  getTasks(filters?: { category?: string; search?: string }): Promise<Task[]>;
  getTasksByFreelancer(freelancerId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;

  // Application operations
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationsByJob(jobId: number): Promise<Application[]>;
  getApplicationsByApplicant(applicantId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, updates: Partial<Application>): Promise<Application | undefined>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByTask(taskId: number): Promise<Order[]>;
  getOrdersByBuyer(buyerId: number): Promise<Order[]>;
  getOrdersBySeller(sellerId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined>;

  // Message operations
  getMessagesByOrder(orderId: number): Promise<Message[]>;
  getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job || undefined;
  }

  async getJobs(filters?: { city?: string; category?: string; search?: string }): Promise<Job[]> {
    let query = db.select().from(jobs).where(eq(jobs.isActive, true));
    
    if (filters?.city) {
      query = query.where(eq(jobs.city, filters.city));
    }
    if (filters?.category) {
      query = query.where(eq(jobs.category, filters.category));
    }
    if (filters?.search) {
      query = query.where(
        ilike(jobs.title, `%${filters.search}%`)
      );
    }
    
    return await query;
  }

  async getJobsByEmployer(employerId: number): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.employerId, employerId));
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const [job] = await db
      .insert(jobs)
      .values(insertJob)
      .returning();
    return job;
  }

  async updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined> {
    const [job] = await db
      .update(jobs)
      .set(updates)
      .where(eq(jobs.id, id))
      .returning();
    return job || undefined;
  }

  async deleteJob(id: number): Promise<boolean> {
    const result = await db.delete(jobs).where(eq(jobs.id, id));
    return result.rowCount > 0;
  }

  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task || undefined;
  }

  async getTasks(filters?: { category?: string; search?: string }): Promise<Task[]> {
    let query = db.select().from(tasks).where(eq(tasks.isActive, true));
    
    if (filters?.category) {
      query = query.where(eq(tasks.category, filters.category));
    }
    if (filters?.search) {
      query = query.where(
        ilike(tasks.title, `%${filters.search}%`)
      );
    }
    
    return await query;
  }

  async getTasksByFreelancer(freelancerId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.freelancerId, freelancerId));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values(insertTask)
      .returning();
    return task;
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();
    return task || undefined;
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return result.rowCount > 0;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application || undefined;
  }

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.jobId, jobId));
  }

  async getApplicationsByApplicant(applicantId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.applicantId, applicantId));
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async updateApplication(id: number, updates: Partial<Application>): Promise<Application | undefined> {
    const [application] = await db
      .update(applications)
      .set(updates)
      .where(eq(applications.id, id))
      .returning();
    return application || undefined;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getOrdersByTask(taskId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.taskId, taskId));
  }

  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.buyerId, buyerId));
  }

  async getOrdersBySeller(sellerId: number): Promise<Order[]> {
    const result = await db
      .select({
        id: orders.id,
        taskId: orders.taskId,
        buyerId: orders.buyerId,
        status: orders.status,
        requirements: orders.requirements,
        deliveryDate: orders.deliveryDate,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .leftJoin(tasks, eq(orders.taskId, tasks.id))
      .where(eq(tasks.freelancerId, sellerId));
    return result;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  async getMessagesByOrder(orderId: number): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.orderId, orderId));
  }

  async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.senderId, user1Id),
          eq(messages.receiverId, user2Id)
        )
      );
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
        id: 1,
        username: "rahman_ahmed",
        email: "rahman@example.com",
        password: "password123",
        fullName: "Rahman Ahmed",
        role: "freelancer",
        city: "dhaka",
        avatar: null,
        bio: "Professional logo designer with 5+ years experience",
        skills: ["Logo Design", "Branding", "Adobe Illustrator"],
        createdAt: new Date(),
      },
      {
        id: 2,
        username: "fatima_khan",
        email: "fatima@example.com",
        password: "password123",
        fullName: "Fatima Khan",
        role: "freelancer",
        city: "chittagong",
        avatar: null,
        bio: "Full-stack web developer specializing in WordPress",
        skills: ["WordPress", "PHP", "JavaScript", "React"],
        createdAt: new Date(),
      },
      {
        id: 3,
        username: "techcorp_hr",
        email: "hr@techcorp.com",
        password: "password123",
        fullName: "TechCorp HR",
        role: "employer",
        city: "dhaka",
        avatar: null,
        bio: "Leading technology company in Bangladesh",
        skills: [],
        createdAt: new Date(),
      },
    ];

    demoUsers.forEach(user => {
      this.users.set(user.id, user);
      this.currentUserId = Math.max(this.currentUserId, user.id + 1);
    });

    // Create demo jobs
    const demoJobs: Job[] = [
      {
        id: 1,
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
        employerId: 3,
        isActive: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 2,
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
        employerId: 3,
        isActive: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: 3,
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
        employerId: 3,
        isActive: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 4,
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
        employerId: 3,
        isActive: true,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: 5,
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
        employerId: 3,
        isActive: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: 6,
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
        employerId: 3,
        isActive: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      }
    ];

    demoJobs.forEach(job => {
      this.jobs.set(job.id, job);
      this.currentJobId = Math.max(this.currentJobId, job.id + 1);
    });

    // Create demo tasks
    const demoTasks: Task[] = [
      {
        id: 1,
        title: "I will design a professional logo for your business",
        description: "Get a unique, professional logo design that represents your brand perfectly. Includes multiple revisions and source files.",
        category: "Graphics & Design",
        price: 2500,
        deliveryTime: 3,
        images: [],
        freelancerId: 1,
        isActive: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: 2,
        title: "I will develop a responsive WordPress website",
        description: "Custom WordPress development with modern design, mobile optimization, and SEO-friendly structure. Perfect for small businesses.",
        category: "Programming & Tech",
        price: 15000,
        deliveryTime: 7,
        images: [],
        freelancerId: 2,
        isActive: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 3,
        title: "I will write engaging content for your website",
        description: "Professional content writing services for websites, blogs, and marketing materials. SEO-optimized and engaging copy that converts.",
        category: "Writing & Translation",
        price: 1500,
        deliveryTime: 2,
        images: [],
        freelancerId: 1,
        isActive: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 4,
        title: "I will create stunning social media graphics",
        description: "Eye-catching graphics for Facebook, Instagram, LinkedIn, and other social platforms. Modern designs that boost engagement.",
        category: "Graphics & Design",
        price: 800,
        deliveryTime: 1,
        images: [],
        freelancerId: 2,
        isActive: true,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: 5,
        title: "I will build a custom React web application",
        description: "Full-stack React development with modern UI/UX, API integration, and responsive design. Perfect for startups and businesses.",
        category: "Programming & Tech",
        price: 25000,
        deliveryTime: 14,
        images: [],
        freelancerId: 1,
        isActive: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: 6,
        title: "I will translate documents from English to Bengali",
        description: "Professional translation services with native fluency. Accurate translations for business documents, websites, and marketing materials.",
        category: "Writing & Translation",
        price: 500,
        deliveryTime: 2,
        images: [],
        freelancerId: 2,
        isActive: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        id: 7,
        title: "I will manage your social media accounts",
        description: "Complete social media management including content creation, posting schedule, and engagement. Grow your online presence effectively.",
        category: "Digital Marketing",
        price: 8000,
        deliveryTime: 30,
        images: [],
        freelancerId: 1,
        isActive: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: 8,
        title: "I will create professional business cards",
        description: "Modern business card designs that make a lasting impression. Multiple concepts, unlimited revisions, print-ready files included.",
        category: "Graphics & Design",
        price: 1200,
        deliveryTime: 2,
        images: [],
        freelancerId: 2,
        isActive: true,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      }
    ];

    demoTasks.forEach(task => {
      this.tasks.set(task.id, task);
      this.currentTaskId = Math.max(this.currentTaskId, task.id + 1);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Job operations
  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobs(filters?: { city?: string; category?: string; search?: string }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(job => job.isActive);
    
    if (filters?.city) {
      jobs = jobs.filter(job => job.city.toLowerCase() === filters.city!.toLowerCase());
    }
    
    if (filters?.category) {
      jobs = jobs.filter(job => job.category.toLowerCase() === filters.category!.toLowerCase());
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower)
      );
    }
    
    return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getJobsByEmployer(employerId: number): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.employerId === employerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = {
      ...insertJob,
      id,
      createdAt: new Date(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: number): Promise<boolean> {
    return this.jobs.delete(id);
  }

  // Task operations
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasks(filters?: { category?: string; search?: string }): Promise<Task[]> {
    let tasks = Array.from(this.tasks.values()).filter(task => task.isActive);
    
    if (filters?.category) {
      tasks = tasks.filter(task => task.category.toLowerCase() === filters.category!.toLowerCase());
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }
    
    return tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getTasksByFreelancer(freelancerId: number): Promise<Task[]> {
    return Array.from(this.tasks.values())
      .filter(task => task.freelancerId === freelancerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const task: Task = {
      ...insertTask,
      id,
      createdAt: new Date(),
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Application operations
  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.jobId === jobId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getApplicationsByApplicant(applicantId: number): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.applicantId === applicantId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: number, updates: Partial<Application>): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, ...updates };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByTask(taskId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.taskId === taskId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.buyerId === buyerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getOrdersBySeller(sellerId: number): Promise<Order[]> {
    const sellerTasks = Array.from(this.tasks.values())
      .filter(task => task.freelancerId === sellerId)
      .map(task => task.id);
    
    return Array.from(this.orders.values())
      .filter(order => sellerTasks.includes(order.taskId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const task = await this.getTask(insertOrder.taskId);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (task?.deliveryTime || 7));
    
    const order: Order = {
      ...insertOrder,
      id,
      deliveryDate,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, ...updates };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Message operations
  async getMessagesByOrder(orderId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.orderId === orderId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => 
        (message.senderId === user1Id && message.receiverId === user2Id) ||
        (message.senderId === user2Id && message.receiverId === user1Id)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
