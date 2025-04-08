import express from "express";
import {
  projects,
  experiences,
  education,
  skills,
  certificates,
} from "../models/mockData";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../models/mockData";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Middleware to protect routes
const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    );
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ===== PUBLIC ROUTES =====

// Projects
router.get("/projects", (req, res) => {
  res.json(projects);
});

router.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

// Experiences
router.get("/experiences", (req, res) => {
  res.json(experiences);
});

router.get("/experiences/:id", (req, res) => {
  const { id } = req.params;
  const experience = experiences.find((e) => e.id === id);

  if (!experience) {
    return res.status(404).json({ message: "Experience not found" });
  }

  res.json(experience);
});

// Education
router.get("/education", (req, res) => {
  res.json(education);
});

router.get("/education/:id", (req, res) => {
  const { id } = req.params;
  const edu = education.find((e) => e.id === id);

  if (!edu) {
    return res.status(404).json({ message: "Education not found" });
  }

  res.json(edu);
});

// Skills
router.get("/skills", (req, res) => {
  res.json(skills);
});

router.get("/skills/:id", (req, res) => {
  const { id } = req.params;
  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  res.json(skill);
});

// Certificates
router.get("/certificates", (req, res) => {
  res.json(certificates);
});

router.get("/certificates/:id", (req, res) => {
  const { id } = req.params;
  const certificate = certificates.find((c) => c.id === id);

  if (!certificate) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  res.json(certificate);
});

// Auth routes
router.post("/auth", (req, res) => {
  const { password } = req.body;
  console.log("Login attempt with password:", password);

  // Simple authentication with a predefined password
  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";

  // For development, allow "admin" as a password
  if (password === correctPassword || password === "admin") {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    console.log("Login successful");

    return res.json({
      success: true,
      token,
      message: "Authentication successful",
    });
  }

  console.log("Login failed - incorrect password");

  return res.status(401).json({
    success: false,
    message: "Invalid password",
  });
});

// Auth routes
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

// ===== PROTECTED ROUTES =====

router.get("/admin/profile", authMiddleware, (req, res) => {
  res.json({ user: (req as any).user });
});

// ===== PROJECTS CRUD =====
router.post("/projects", authMiddleware, (req, res) => {
  const newProject = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

router.put("/projects/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Project not found" });
  }

  projects[index] = {
    ...projects[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json(projects[index]);
});

router.delete("/projects/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Project not found" });
  }

  projects.splice(index, 1);

  res.status(204).send();
});

// ===== EXPERIENCES CRUD =====
router.post("/experiences", authMiddleware, (req, res) => {
  const newExperience = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  experiences.push(newExperience);
  res.status(201).json(newExperience);
});

router.put("/experiences/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const index = experiences.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Experience not found" });
  }

  experiences[index] = {
    ...experiences[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json(experiences[index]);
});

router.delete("/experiences/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  const index = experiences.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Experience not found" });
  }

  experiences.splice(index, 1);

  res.status(204).send();
});

// ===== EDUCATION CRUD =====
router.post("/education", authMiddleware, (req, res) => {
  const newEducation = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  education.push(newEducation);
  res.status(201).json(newEducation);
});

router.put("/education/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const index = education.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Education not found" });
  }

  education[index] = {
    ...education[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json(education[index]);
});

router.delete("/education/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  const index = education.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Education not found" });
  }

  education.splice(index, 1);

  res.status(204).send();
});

// ===== SKILLS CRUD =====
router.post("/skills", authMiddleware, (req, res) => {
  const newSkill = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  skills.push(newSkill);
  res.status(201).json(newSkill);
});

router.put("/skills/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const index = skills.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Skill not found" });
  }

  skills[index] = {
    ...skills[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json(skills[index]);
});

router.delete("/skills/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  const index = skills.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Skill not found" });
  }

  skills.splice(index, 1);

  res.status(204).send();
});

// ===== CERTIFICATES CRUD =====
router.post("/certificates", authMiddleware, (req, res) => {
  const newCertificate = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  certificates.push(newCertificate);
  res.status(201).json(newCertificate);
});

router.put("/certificates/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const index = certificates.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  certificates[index] = {
    ...certificates[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json(certificates[index]);
});

router.delete("/certificates/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  const index = certificates.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  certificates.splice(index, 1);

  res.status(204).send();
});

export default router;
