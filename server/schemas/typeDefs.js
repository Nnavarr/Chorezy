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
    type: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }
`

// export the typeDefs
module.exports = typeDefs;