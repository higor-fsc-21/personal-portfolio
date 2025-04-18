import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ProjectController from "../controllers/ProjectController";
import ExperienceController from "../controllers/ExperienceController";
import EducationController from "../controllers/EducationController";
import SkillController from "../controllers/SkillController";
import CertificateController from "../controllers/CertificateController";
import { authenticateToken } from "../middlewares/auth";
import { upload } from "../services/FileUploadService";
import { sendContactEmail } from "../controllers/contact.controller";

const router = Router();

// Auth routes
router.post("/auth", AuthController.login);

// Public routes (no authentication required)
router.post("/contact", sendContactEmail);

router.get("/projects", ProjectController.getAll);
router.get("/projects/:id", ProjectController.getById);

router.get("/experiences", ExperienceController.getAll);
router.get("/experiences/:id", ExperienceController.getById);

router.get("/education", EducationController.getAll);
router.get("/education/:id", EducationController.getById);

router.get("/skills", SkillController.getAll);
router.get("/skills/:id", SkillController.getById);

router.get("/certificates", CertificateController.getAll);
router.get("/certificates/:id", CertificateController.getById);

// Protected routes (authentication required)
// Projects
router.post(
  "/projects",
  authenticateToken,
  upload.array("images", 5),
  ProjectController.create
);
router.put(
  "/projects/:id",
  authenticateToken,
  upload.array("images", 5),
  ProjectController.update
);
router.delete("/projects/:id", authenticateToken, ProjectController.delete);

// Experiences
router.post("/experiences", authenticateToken, ExperienceController.create);
router.put("/experiences/:id", authenticateToken, ExperienceController.update);
router.delete(
  "/experiences/:id",
  authenticateToken,
  ExperienceController.delete
);

// Education
router.post("/education", authenticateToken, EducationController.create);
router.put("/education/:id", authenticateToken, EducationController.update);
router.delete("/education/:id", authenticateToken, EducationController.delete);

// Skills
router.post("/skills", authenticateToken, SkillController.create);
router.put("/skills/:id", authenticateToken, SkillController.update);
router.delete("/skills/:id", authenticateToken, SkillController.delete);

// Certificates
router.post("/certificates", authenticateToken, CertificateController.create);
router.put(
  "/certificates/:id",
  authenticateToken,
  CertificateController.update
);
router.delete(
  "/certificates/:id",
  authenticateToken,
  CertificateController.delete
);

export default router;
