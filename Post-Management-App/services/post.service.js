import { v4 as uuidv4 } from "uuid";
import PostModel from "../models/post.model.js";
import { BadRequest } from "../consts/errors.const.js";

export default class PostService {
  // Get all posts
  static async getAllPosts() {
    return PostModel.getAll();
  }

  // Get posts by user
  static getUserPosts(username) {
    return PostModel.getUserPosts(username);
  }

  // Create new post
  static async createPost(body, username) {
    // Check if title is provided
    if (!body.title) {
      throw new BadRequest("Title is required for creating a post!");
    }
    const newPost = {
      ...body,
      id: uuidv4(),
      createdBy: username,
      createdAt: new Date().toISOString(),
      likes: [],
    };
    await PostModel.create(newPost);
    return newPost;
  }

  // Like A Post
  static async likePost(postId, username) {
    const postToBeLiked = await PostModel.getPostById(postId);
    // Check if user is liking their own post
    if (postToBeLiked.createdBy === username) {
      throw new BadRequest("You cannot like your own post ❗");
    }

    // Check if the user has already liked the post
    const isLikedByMe = postToBeLiked.likes.some((post) => post === username);

    const toBeUpdatedPost = { ...postToBeLiked };
    if (!isLikedByMe) {
      // Add the user to the likes array if not already liked
      toBeUpdatedPost.likes.push(username);
    } else {
      // Remove the user from the likes array if already liked
      toBeUpdatedPost.likes = toBeUpdatedPost.likes.filter(
        (username) => username !== username
      );
    }
    // Update the post with the new like status
    return PostModel.updatePost(postId, toBeUpdatedPost);
  }

  // Update A Post
  static async updatePost(postId, body, username) {
    const postToBeUpdated = await PostModel.getPostById(postId);
    // Check if user is the author of the post
    if (postToBeUpdated.createdBy !== username) {
      throw new BadRequest(
        "Only the author of a post can make changes to it. 🚫"
      );
    }

    // Update the post with the new title, content...
    const postWithUpdates = {
      ...postToBeUpdated,
      title: body.title,
      content: body.content,
      id: postId,
      updatedAt: new Date().toISOString(),
    };
    const updatedPost = await PostModel.updatePost(postId, postWithUpdates);

    return updatedPost;
  }

  // Delete A Post
  static async deletePost(postId, username) {
    const postToBeDeleted = await PostModel.getPostById(postId);
    // Check if user is the author of the post
    if (postToBeDeleted.createdBy !== username) {
      throw new BadRequest("You are only allowed to delete your own post. ⛔");
    }
    return PostModel.deletePost(postId);
  }

  // Delete Posts All By User
  static deletePostsAllByUser(username) {
    return PostModel.deleteAllByUser(username);
  }
}
