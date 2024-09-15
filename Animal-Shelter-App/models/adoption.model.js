import { Schema, model } from "mongoose";

// {
//     "adopterName": "John Doe",
//     "email": "johndoe@example.com",
//     "animal": "<Animal_ID_of_Whiskers>",
//     "adoptionDate": "2023-04-22"
// },
const adoptionSchema = new Schema(
  {
    adopterName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    animal: [
      {
        type: Schema.Types.ObjectId,
        ref: "animal",
      },
    ],
    adoptionDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Adoption = model("adoption", adoptionSchema);

export default Adoption;
