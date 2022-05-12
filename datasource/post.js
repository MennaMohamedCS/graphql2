const { DataSource } = require("apollo-datasource");
const { PostModel } = require("../models/post.model");

class PostDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  create(input) {
    return PostModel.create(input);
  }

  async delete(id) {
    try {
      const deletedPost = await PostModel.findByIdAndDelete(id);
      if (!deletedPost) throw new Error('Post is not exist!');

      return 'Delete Successfully';
    } catch (error) {
        return error;
    }
  }

  async update(id, input) {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(id, { ...input });
      if (!updatedPost) throw new Error('Not Found');
      const post = await Post.findById(id);

      return post;
    } catch (error) {
      return error;
    }
  }

  async getPosts() {
    try {
      const allPosts = await PostModel.find({}); //
      return allPosts;
    } catch (error) {
        return error;
    }
  }

  async getPostById(id) {
    try {
      const post = await PostModel.findById(id);
      if (!post) 
        console.log("Not Found this Post");

      return post;
    } catch (error) {
        return error;
    }
  }
}
module.exports.PostDataSource = PostDataSource;
