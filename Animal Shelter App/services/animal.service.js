import Animal from "../models/animal.model.js";

export class AnimalService {
  static getAllAnimals({ name, age }) {
    let searchQuery = {};

    if (name) {
      searchQuery.name = name;
    }

    if (age) {
      searchQuery.age = Number(age);
    }
    return Animal.find(searchQuery);
  }

  static getAnimalById(animalId) {
    return Animal.findById(animalId);
  }

  static createAnimal(animalData) {
    const post = new Animal(animalData);

    return post.save();
  }

  static updateAnimal(animalId, updateAnimal) {
    return Animal.findByIdAndUpdate(animalId, updateAnimal, { new: true });
  }

  static deleteAnimal(animalId) {
    return Animal.findByIdAndDelete(animalId);
  }
}
