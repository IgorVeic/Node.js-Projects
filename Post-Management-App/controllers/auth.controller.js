import { BadRequest } from "../consts/errors.const.js";
import AuthService from "../services/auth.service.js";

export default class AuthController {
  // Register user by creating a new user
  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);

      res.send(user);
    } catch (error) {
      if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  // User Login
  static async login(req, res) {
    try {
      const user = await AuthService.login(req.body, req.session.isLoggedIn);
      // Set session variables for user authentication
      req.session.isLoggedIn = true;
      req.session.userId = user.id;
      // Sets the username session variable to the username of the authenticated user
      req.session.username = user.username;

      res.send(user);
    } catch (error) {
      if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  // User Logout
  static async logout(req, res) {
    try {
      // Reset session variables to log out the user
      req.session.isLoggedIn = false;
      req.session.userId = null;
      res.status(200).send("The user is logged out! ✅");
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
