import { Education, IEducation } from "../models";
import BaseController from "./BaseController";

class EducationController extends BaseController<IEducation> {
  constructor() {
    super(Education);
  }
}

export default new EducationController();
