const { DataSource } = require("apollo-datasource");
const { CommentModel } = require("../models/comment.model");

class CommentDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  async create({ input }) {
    try {
      const newComment = await new CommentModel({ text: input.text });
      const savedComment = await newComment.save();
      if (!savedComment) 
        throw new Error('Error , please try again');
      return savedComment;
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      const deletedComment = await CommentModel.findByIdAndDelete(id);
      if (!deletedComment) throw new Error('Not Found');

      return 'Deleted Successfully';
    } catch (error) {
      return error;
    }
  }

  async update(id, input) {
    try {
      const updatedComment = await CommentModel.findByIdAndUpdate(id, { ...input });
      if (!updatedComment) throw new Error('Not Found');
      const comment = await Comment.findById(id);

      return comment;
    } catch (error) {
      return error;
    }
  }

  async getComments() {
    try {
      const allComments = await CommentModel.find({});
      return allComments;
    } catch (error) {
      return error;
    }
  }

  async getCommentById(id) {
    try {
      const comment = await CommentModel.findById(id);
      if (!comment) throw new Error('Not Found');
      return comment;
    } catch (error) {
      return error;
    }
  }
}
module.exports.CommentDataSource = CommentDataSource;