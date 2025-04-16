import { Project, IProject } from "../models";
import BaseController from "./BaseController";
import { Request, Response } from "express";
import { deleteImage, getPublicIdFromUrl } from "../services/FileUploadService";

class ProjectController extends BaseController<IProject> {
  constructor() {
    super(Project);
  }

  create = async (req: Request, res: Response) => {
    try {
      const projectData = req.body;
      const files = req.files as Express.Multer.File[];

      // Add uploaded images to project data
      if (files && files.length > 0) {
        projectData.images = files.map((file) => ({
          url: file.path,
          alt: projectData.title,
        }));
      }

      const project = await this.model.create(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Error creating project" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const projectData = req.body;
      const files = req.files as Express.Multer.File[];

      // Get existing project
      const existingProject = await this.model.findById(id);
      if (!existingProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Delete old images if new ones are being uploaded
      if (files && files.length > 0) {
        for (const image of existingProject.images) {
          const publicId = getPublicIdFromUrl(image.url);
          if (publicId) {
            await deleteImage(publicId);
          }
        }

        // Add new images to project data
        projectData.images = files.map((file) => ({
          url: file.path,
          alt: projectData.title,
        }));
      }

      const project = await this.model.findByIdAndUpdate(id, projectData, {
        new: true,
      });
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Error updating project" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await this.model.findById(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Delete all images from Cloudinary
      for (const image of project.images) {
        const publicId = getPublicIdFromUrl(image.url);
        if (publicId) {
          await deleteImage(publicId);
        }
      }

      await this.model.findByIdAndDelete(id);
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Error deleting project" });
    }
  };
}

export default new ProjectController();
