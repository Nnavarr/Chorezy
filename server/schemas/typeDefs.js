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
    admin: Boolean
    children: [User]
    tasks: [Task]
  }

  type Task {
    _id: ID!
    name: String
    category: String
    min_age: Int!
    value: Int!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, age: Int!, email: String!, password: String!, admin: Boolean!): Auth
  }
`

// export the typeDefs
module.exports = typeDefs;