const { gql } = require('apollo-server-express');

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
    tasks: [Task]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, age: Int!, email: String!, password: String!, admin: Boolean!): Auth
    addChild(childId: ID!): User 
    removeChild(childId: ID!): User
    addTask(name: String!, category: String!, min_age: Int!, value: Int!): Task
  }
`

// export the typeDefs
module.exports = typeDefs;