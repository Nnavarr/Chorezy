const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    admin: Boolean
    children: [User]
    tasks: [Task]
    assignments: [Assignment]
  }

  type Task {
    _id: ID!
    name: String
    category: String
    value: Int!
    username: String!
  }

  type Assignment {
    _id: ID!
    username: String
    taskId: String
    taskValue: Int
    completed: Boolean
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    tasks: [Task]
    assignments: [Assignment]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!, admin: Boolean): Auth
    removeUser(username: String!): User

    addChild(childId: ID!): User 
    removeChild(childId: ID!): User

    addTask(name: String!, category: String!, value: Int!): Task
    removeTask(taskId: ID!): Task

    assignTask(username: String!, taskId: ID!, taskValue: Int!): Assignment
    removeAssignedTask(assignmentId: ID!): Assignment
  }
`

// export the typeDefs
module.exports = typeDefs;