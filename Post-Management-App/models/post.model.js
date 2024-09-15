import DataService from "../services/data.service.js";
import path from "path";
import { NotFound } from "../consts/errors.const.js";

const postsPath = path.join(import.meta.dirname, "..", "data", "posts.json");

export default class PostModel {
  // Get all posts
  static async getAll() {
    return DataService.readData(postsPath);
  }

  // Get posts by user
  static async getUserPosts(username) {
    const allPosts = await this.getAll();
    const userPosts = allPosts.filter((posts) => posts.createdBy === username);

    if (userPosts.length < 1) {
      // Throw error if there are no posts created by the specified user
      throw new NotFound(`No posts created by user: ${username}`);
    }
    return userPosts;
  }

  // Get post by ID
  static async getPostById(postId) {
    // Get all posts
    const allPosts = await this.getAll();
    // Find post by ID
    const post = allPosts.find((post) => post.id === postId);
    if (!post) {
      throw new NotFound(`There is no post with id: ${postId}`);
    }
    return post;
  }

  // Create a new post
  static async create(newPost) {
    const allPosts = await this.getAll();
    allPosts.push(newPost);
    await DataService.writeData(postsPath, allPosts);
  }

  // Update a post
  static async updatePost(postId, updatedPost) {
    const allPosts = await this.getAll();
    // Find index of post to update
    const index = allPosts.findIndex((post) => post.id === postId);
    allPosts[index] = updatedPost;
    // Write updated posts array to file
    await DataService.writeData(postsPath, allPosts);
    return updatedPost;
  }

  // Delete a post
  static async deletePost(postId) {
    const allPosts = await this.getAll();
    // Filter out the post to be deleted
    const filteredPosts = allPosts.filter((post) => post.id !== postId);
    await DataService.writeData(postsPath, filteredPosts);
  }

  // Delete all posts by a user
  static async deleteAllByUser(username) {
    const allPosts = await this.getAll();
    // Filter out posts by the specified user
    const filteredPosts = allPosts.filter(
      (post) => post.createdBy !== username
    );
    await DataService.writeData(postsPath, filteredPosts);
  }
}
