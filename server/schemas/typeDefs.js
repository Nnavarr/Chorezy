const { gql } = require('apollo-server-express');

/*
User Model
---------
type: Admin or User
      This column will be used to conditionally render content based on user type
*/

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    age: Int!
    children: [Child]
  }

  type Child {
    _id: ID!
    username: String
    email: String
    age: Int!
    parent: [User]
  }

  type Query {
    users: [User]
    children: [Child]
    user(username: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`

// export the typeDefs
module.exports = typeDefs;