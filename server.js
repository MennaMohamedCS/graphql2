const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { resolvers } = require("./resolvers");
const mongoose = require("mongoose");
const { PostDataSource } = require("./datasource/post");
const { CommentDataSource } = require("./datasource/comment");

mongoose.connect(
  "mongodb+srv://Menna:123456Mm@main.ml6py.mongodb.net/graphQL?retryWrites=true&w=majority"
);
mongoose.set("debug", true);

const schemaString = fs.readFileSync(
    console.log(path.join(__dirname, "schema.graphql")),
  path.join(__dirname, "schema.graphql"),
  "utf8"
  
);
const typeDefs = gql(schemaString);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    post: new PostDataSource(),
    comment: new CommentDataSource(),
  }),
});

server.listen(4000, () => {
  console.log("Server has been started on port 4000");
});
