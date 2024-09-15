import { AdoptionService } from "../services/adoption.service.js";
import { adoptionSchema } from "../schemas/adoption.schema.js";

export class AdoptionController {
  static async getAllAdoptions(req, res) {
    try {
      const adoptions = await AdoptionService.getAllAdoptions(req.query);

      res.status(200).json(adoptions);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async createAdoption(req, res) {
    try {
      await adoptionSchema.validateAsync(req.body, {
        abortEarly: false,
      });

      const adoption = await AdoptionService.createAdoption(req.body);

      res.json(adoption);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async deleteAdoption(req, res) {
    try {
      await AdoptionService.deleteAdoption(req.params.id);

      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  }
}
