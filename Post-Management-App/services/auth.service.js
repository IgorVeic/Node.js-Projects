import UserModel from "../models/user.model.js";
import { BadRequest } from "../consts/errors.const.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default class AuthService {
  static async register({ name, username, password }) {
    // Check if a user with the provided username already exists
    const existingUser = await UserModel.getUserByUsername(username);

    if (existingUser) {
      throw new BadRequest(`User with ${username} already exists!`);
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const user = {
      id: uuidv4(),
      name,
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Create the user in the database and return the user data without the password
    const { password: notNeededPassword, ...restOfUser } =
      await UserModel.createUser(user);

    return restOfUser;
  }

  static async login({ username, password, isLoggedIn }) {
    const user = await UserModel.getUserByUsername(username);
    // Check if the user exists
    if (!user) {
      throw new BadRequest("User not found. Please check your credentials.");
    }

    // Check if user is already logged in
    if (isLoggedIn) {
      throw new BadRequest(
        "You are already logged in. Please log out before attempting to log in again."
      );
    }

    // Compare the provided password with the hashed password stored in the database
    const doPasswordsMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, throw an error
    if (!doPasswordsMatch) {
      throw new BadRequest("Incorrect password. Please try again.");
    }

    // If passwords match, return the user data without the password
    const { password: notNeededPassword, ...restOfUser } = user;

    return restOfUser;
  }
}
