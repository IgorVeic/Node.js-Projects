import { Schema, model } from "mongoose";
import { animalType } from "../schemas/animal.schema.js";
import { animalStatus } from "../schemas/animal.schema.js";

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 30,
    },
    type: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      enum: animalType,
    },
    breed: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
    status: {
      type: String,
      required: true,
      enum: animalStatus,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Animal = model("animal", animalSchema);

export default Animal;
