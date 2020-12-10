const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./context');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server
  .listen()
  .then(({ url, port }) => {
    console.log(`server running at: ${url} on port ${port}`);
  });
