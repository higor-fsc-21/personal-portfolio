import { Experience, IExperience } from "../models";
import BaseController from "./BaseController";

class ExperienceController extends BaseController<IExperience> {
  constructor() {
    super(Experience);
  }
}

export default new ExperienceController();
