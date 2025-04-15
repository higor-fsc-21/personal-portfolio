import { Certificate, ICertificate } from "../models";
import BaseController from "./BaseController";

class CertificateController extends BaseController<ICertificate> {
  constructor() {
    super(Certificate);
  }
}

export default new CertificateController();
