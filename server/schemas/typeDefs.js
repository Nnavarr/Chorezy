const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String
    email: String
    age: Int!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }
`

// export the typeDefs
module.exports = typeDefs;