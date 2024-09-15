import { animalSchema } from "../schemas/animal.schema.js";
import { AnimalService } from "../services/animal.service.js";

export class AnimalController {
  static async getAllAnimals(req, res) {
    try {
      const animals = await AnimalService.getAllAnimals(req.query);

      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async getAnimalById(req, res) {
    try {
      const foundAnimal = await AnimalService.getAnimalById(req.params.id);

      res.json(foundAnimal);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  }

  static async createAnimal(req, res) {
    try {
      const animalData = req.body;
      await animalSchema.validateAsync(animalData, {
        abortEarly: false,
      });

      const newAnimal = await AnimalService.createAnimal(animalData);

      res.status(201).json(newAnimal);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async updateAnimal(req, res) {
    try {
      const updateAnimal = req.body;

      await animalSchema.validateAsync(updateAnimal, {
        abortEarly: false,
      });

      const response = await AnimalService.updateAnimal(
        req.params.id,
        updateAnimal
      );

      res.json(response);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async deleteAnimal(req, res) {
    try {
      await AnimalService.deleteAnimal(req.params.id);

      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  }
}
