import Adoption from "../models/adoption.model.js";

export class AdoptionService {
  static getAllAdoptions() {
    return Adoption.find().populate("animal");
  }

  static createAdoption(adoptionData) {
    const adoption = new Adoption(adoptionData);

    return adoption.save();
  }

  static deleteAdoption(adoptionId) {
    return Adoption.findByIdAndDelete(adoptionId);
  }
}
