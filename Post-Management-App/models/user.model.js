import DataService from "../services/data.service.js";
import path from "path";

const usersPath = path.join(import.meta.dirname, "..", "data", "users.json");

export default class UserModel {
  static getAll() {
    return DataService.readData(usersPath);
  }

  static async getUserByUsername(username) {
    const users = await this.getAll();
    return users.find((user) => user.username === username);
  }

  static async createUser(newUser) {
    const users = await this.getAll();
    users.push(newUser);
    await DataService.writeData(usersPath, users);
    return newUser;
  }
}
