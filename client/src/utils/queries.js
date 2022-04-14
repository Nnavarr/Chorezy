
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      admin
      children {
        _id
      }
      tasks {
        _id
        name
        category
        value
      }
      assignments {
        _id
        taskId
        taskName
        taskValue
        completed
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      admin
      children {
        _id
        username
        tasks {
          _id
          name
          category
          value
        }
      }
      tasks {
        _id
        name
        category
        value
      }
      assignments {
        _id
        taskId
        taskName
        taskValue
        completed
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

// query all tasks using specific Username
export const QUERY_TASKS = gql`
  query ($username: String) {
    tasks(username: $username) {
      _id
      name
      category
      value
      username
    }
  }
`;

// query single Task
export const QUERY_TASK = gql`
  query ($id: ID!) {
    task(_id: $id) {
      _id
      name
      category
      value
      username
    }
  }
`;



