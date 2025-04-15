import { Skill, ISkill } from "../models";
import BaseController from "./BaseController";

class SkillController extends BaseController<ISkill> {
  constructor() {
    super(Skill);
  }
}

export default new SkillController();
