import joi from "joi";

// {
//     "adopterName": "John Doe",
//     "email": "johndoe@example.com",
//     "animal": "<Animal_ID_of_Whiskers>",
//     "adoptionDate": "2023-04-22"
// },

export const adoptionSchema = joi.object({
  adopterName: joi.string().min(3).max(30).required(),
  email: joi.string().min(3).max(20).required(),
  animal: joi.string().required(),
  adoptionDate: joi.date().iso().optional(),
});
