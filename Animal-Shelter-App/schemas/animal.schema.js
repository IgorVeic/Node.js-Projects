import joi from "joi";

// name: String, required
// type: String, required (possible values: Dog, Cat)
// breed: String, required
// age: Number, required, must be positive number
// status: String, required (possible values: Available, Adopted)
// description: String, optional

export const animalType = ["Cat", "Dog"];
export const animalStatus = ["Available", "Adopted"];

export const animalSchema = joi.object({
  name: joi.string().min(3).max(30).max(30).required(),
  type: joi
    .string()
    .valid(...animalType)
    .min(3)
    .max(30),
  breed: joi.string().min(3).max(30).required(),
  age: joi.number().integer().min(1).max(50).required(),
  status: joi
    .string()
    .valid(...animalStatus)
    .required(),
  description: joi.string().min(3).max(100),
});
