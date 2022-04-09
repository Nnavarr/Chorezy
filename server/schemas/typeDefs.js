const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    admin: Boolean
    children: [User]
    tasks: [Task]
  }

  type Task {
    _id: ID!
    name: String
    category: String
    value: Int!
    completed: Boolean
    username: String!
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
    addUser(username: String!, email: String!, password: String!, admin: Boolean): Auth
    
    addChild(childId: ID!): User 
    removeChild(childId: ID!): User

    addTask(name: String!, category: String!, value: Int!): Task
    removeTask(taskId: ID!): Task

    assignTask(childId: ID!, taskId: ID!): User
    
  }
`

// export the typeDefs
module.exports = typeDefs;