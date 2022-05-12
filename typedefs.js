const {gql}=require("apollo-server")

//Schema
//Definitions 
const typeDefs=gql`
type Post {
    id: ID
    title: String
  }

input PostInput {
    title: String!
  }

type Comment {
    id: ID
    text: String
  }

input CommentInput {
    text: String!
  }

type Query {
    posts: [Post]
    post(id: ID!): Post

    comments: [Comment]
    comment(id: ID!): Comment
  }

type Mutation {
    createPost(input: PostInput!): Post
    deletePost(id: ID!): String
    updatePost(id: ID!, input: PostInput!): Post

    createComment(input: CommentInput!): Comment
    deleteComment(id: ID!): String
    updateComment(id: ID!, input: CommentInput!): Comment
  }
`

module.exports.typeDefs=typeDefs