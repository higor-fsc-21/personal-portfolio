import { Project, IProject } from "../models";
import BaseController from "./BaseController";

class ProjectController extends BaseController<IProject> {
  constructor() {
    super(Project);
  }
}

export default new ProjectController();
