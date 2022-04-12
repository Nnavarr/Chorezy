import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!, $admin: Boolean!) {
    addUser(username: $username, email: $email, password: $password, admin: $admin) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TASK = gql`
mutation ($name: String!, $category: String!, $value: Int!) {
  addTask(name: $name, category: $category, value: $value) {
    _id,
    name
  }
}
`;

export const ASSIGN_TASK = gql`
mutation ($username: String!, $taskId: ID!, $taskValue: Int!) {
  assignTask(username: $username, taskId: $taskId, taskValue: $taskValue) {
    username,
    taskId
    taskValue,
    completed
  }
}
`

export const ADD_AWARD = gql`
  mutation addAward($id: ID!) {
    addAward(awardId: $id) {
      _id
      username
      awardCount
      awards {
        _id
        username
      }
    }
  }
`;

export const REMOVE_AWARD = gql`
  mutation removeAward($id: ID!) {
    removeAward(id: $id) {
      _id
      username
      awards {
        _id
        username
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_CHILD = gql`
  mutation ($childId: ID!) {
    addChild(childId: $childId) {
      _id
      username
    }
  }
`;