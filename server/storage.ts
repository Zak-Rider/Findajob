import { 
  users, jobs, tasks, applications, orders, messages,
  type User, type InsertUser, 
  type Job, type InsertJob,
  type Task, type InsertTask,
  type Application, type InsertApplication,
  type Order, type InsertOrder,
  type Message, type InsertMessage
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private jobs: Map<number, Job> = new Map();
  private tasks: Map<number, Task> = new Map();
  private applications: Map<number, Application> = new Map();
  private orders: Map<number, Order> = new Map();
  private messages: Map<number, Message> = new Map();
  
  private currentUserId = 1;
  private currentJobId = 1;
  private currentTaskId = 1;
  private currentApplicationId = 1;
  private currentOrderId = 1;
  private currentMessageId = 1;

  constructor() {
    // Initialize with some demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo users
    const demoUsers: User[] = [
      {
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
