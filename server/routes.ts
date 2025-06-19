import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertJobSchema, insertTaskSchema, 
  insertApplicationSchema, insertOrderSchema, insertMessageSchema 
} from "@shared/schema";
import { z } from "zod";

// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Auth middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      req.session.userId = user.id;
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Job routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const { city, category, search } = req.query;
      const jobs = await storage.getJobs({
        city: city as string,
        category: category as string,
        search: search as string,
      });
      
      // Get employer info for each job
      const jobsWithEmployers = await Promise.all(
        jobs.map(async (job) => {
          const employer = await storage.getUser(job.employerId!);
          return {
            ...job,
            employer: employer ? {
              id: employer.id,
              fullName: employer.fullName,
              avatar: employer.avatar,
            } : null,
          };
        })
      );
      
      res.json(jobsWithEmployers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(parseInt(req.params.id));
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      const employer = await storage.getUser(job.employerId!);
      res.json({
        ...job,
        employer: employer ? {
          id: employer.id,
          fullName: employer.fullName,
          avatar: employer.avatar,
        } : null,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/jobs", requireAuth, async (req, res) => {
    try {
      const jobData = insertJobSchema.parse({
        ...req.body,
        employerId: req.session.userId,
      });
      
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/my-jobs", requireAuth, async (req, res) => {
    try {
      const jobs = await storage.getJobsByEmployer(req.session.userId);
      res.json(jobs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Task routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const { category, search } = req.query;
      const tasks = await storage.getTasks({
        category: category as string,
        search: search as string,
      });
      
      // Get freelancer info for each task
      const tasksWithFreelancers = await Promise.all(
        tasks.map(async (task) => {
          const freelancer = await storage.getUser(task.freelancerId!);
          return {
            ...task,
            freelancer: freelancer ? {
              id: freelancer.id,
              fullName: freelancer.fullName,
              username: freelancer.username,
              avatar: freelancer.avatar,
              bio: freelancer.bio,
            } : null,
          };
        })
      );
      
      res.json(tasksWithFreelancers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.getTask(parseInt(req.params.id));
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      const freelancer = await storage.getUser(task.freelancerId!);
      res.json({
        ...task,
        freelancer: freelancer ? {
          id: freelancer.id,
          fullName: freelancer.fullName,
          username: freelancer.username,
          avatar: freelancer.avatar,
          bio: freelancer.bio,
        } : null,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/tasks", requireAuth, async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse({
        ...req.body,
        freelancerId: req.session.userId,
      });
      
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/my-tasks", requireAuth, async (req, res) => {
    try {
      const tasks = await storage.getTasksByFreelancer(req.session.userId);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Application routes
  app.post("/api/jobs/:id/apply", requireAuth, async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getJob(jobId);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      // Check if user already applied
      const existingApplications = await storage.getApplicationsByJob(jobId);
      const hasApplied = existingApplications.some(app => app.applicantId === req.session.userId);
      
      if (hasApplied) {
        return res.status(400).json({ message: "Already applied to this job" });
      }
      
      const applicationData = insertApplicationSchema.parse({
        jobId,
        applicantId: req.session.userId,
        coverLetter: req.body.coverLetter,
      });
      
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/my-applications", requireAuth, async (req, res) => {
    try {
      const applications = await storage.getApplicationsByApplicant(req.session.userId);
      
      // Get job info for each application
      const applicationsWithJobs = await Promise.all(
        applications.map(async (app) => {
          const job = await storage.getJob(app.jobId!);
          return {
            ...app,
            job: job ? {
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.location,
            } : null,
          };
        })
      );
      
      res.json(applicationsWithJobs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Order routes
  app.post("/api/tasks/:id/order", requireAuth, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      if (task.freelancerId === req.session.userId) {
        return res.status(400).json({ message: "Cannot order your own task" });
      }
      
      const orderData = insertOrderSchema.parse({
        taskId,
        buyerId: req.session.userId,
        requirements: req.body.requirements,
      });
      
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/my-orders", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getOrdersByBuyer(req.session.userId);
      
      // Get task info for each order
      const ordersWithTasks = await Promise.all(
        orders.map(async (order) => {
          const task = await storage.getTask(order.taskId!);
          const freelancer = task ? await storage.getUser(task.freelancerId!) : null;
          return {
            ...order,
            task: task ? {
              id: task.id,
              title: task.title,
              price: task.price,
            } : null,
            freelancer: freelancer ? {
              id: freelancer.id,
              fullName: freelancer.fullName,
              username: freelancer.username,
            } : null,
          };
        })
      );
      
      res.json(ordersWithTasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/my-sales", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getOrdersBySeller(req.session.userId);
      
      // Get task and buyer info for each order
      const ordersWithDetails = await Promise.all(
        orders.map(async (order) => {
          const task = await storage.getTask(order.taskId!);
          const buyer = await storage.getUser(order.buyerId!);
          return {
            ...order,
            task: task ? {
              id: task.id,
              title: task.title,
              price: task.price,
            } : null,
            buyer: buyer ? {
              id: buyer.id,
              fullName: buyer.fullName,
              username: buyer.username,
            } : null,
          };
        })
      );
      
      res.json(ordersWithDetails);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Message routes
  app.get("/api/orders/:id/messages", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Check if user is involved in this order
      const task = await storage.getTask(order.taskId!);
      if (order.buyerId !== req.session.userId && task?.freelancerId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const messages = await storage.getMessagesByOrder(orderId);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/orders/:id/messages", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Check if user is involved in this order
      const task = await storage.getTask(order.taskId!);
      if (order.buyerId !== req.session.userId && task?.freelancerId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      // Determine receiver
      const receiverId = order.buyerId === req.session.userId ? task?.freelancerId : order.buyerId;
      
      const messageData = insertMessageSchema.parse({
        senderId: req.session.userId,
        receiverId,
        orderId,
        content: req.body.content,
      });
      
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
