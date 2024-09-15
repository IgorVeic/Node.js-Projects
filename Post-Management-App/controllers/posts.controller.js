import { BadRequest, NotFound } from "../consts/errors.const.js";
import PostService from "../services/post.service.js";

export default class PostController {
  static async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.send(posts);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getUserPosts(req, res) {
    try {
      const userPosts = await PostService.getUserPosts(req.params.username);
      res.send(userPosts);
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).send({ message: error.message });
      } else if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  static async createPost(req, res) {
    try {
      const newPost = await PostService.createPost(
        req.body,
        req.session.username
      );
      res.send(newPost);
    } catch (error) {
      if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  static async updatePost(req, res) {
    try {
      const updatedPost = await PostService.updatePost(
        req.params.id,
        req.body,
        req.session.username
      );
      res.send(updatedPost);
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).send({ message: error.message });
      } else if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  static async likePost(req, res) {
    try {
      const likedPost = await PostService.likePost(
        req.params.id,
        req.session.username
      );
      res.send(likedPost);
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).send({ message: error.message });
      } else if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  static async deletePost(req, res) {
    try {
      await PostService.deletePost(req.params.id, req.session.username);
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).send({ message: error.message });
      } else if (error instanceof BadRequest) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  }

  static async deleteUserPosts(req, res) {
    try {
      await PostService.deletePostsAllByUser(req.session.username);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
