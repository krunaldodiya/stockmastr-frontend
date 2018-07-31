import gql from "graphql-tag";

const GET_USERS_QUERY = gql`
  query {
    users {
      id
      mobile
      email
      type
      name
      gender
      city
      state
      avatar
      createdAt
      updatedAt
    }
  }
`;

const CHECK_USER_EXISTS_QUERY = gql`
  query($email: String!) {
    user(where: { email: $email }) {
      id
      email
      mobile
      email
      type
      name
      gender
      city
      state
      avatar
      createdAt
      updatedAt
    }
  }
`;

const GET_AUTH_USERS_QUERY = gql`
  query {
    user: me {
      id
      mobile
      email
      type
      name
      gender
      city
      state
      avatar
      createdAt
      updatedAt
      channels {
        id
        title
        description
        segment
        owner {
          id
          name
          city
          state
        }
        createdAt
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query($user_id: ID!) {
    user(where: { id: $user_id }) {
      id
      mobile
      email
      type
      name
      gender
      city
      state
      avatar
      createdAt
      updatedAt
    }
  }
`;

export {
  GET_AUTH_USERS_QUERY,
  GET_USERS_QUERY,
  CHECK_USER_EXISTS_QUERY,
  GET_USER_BY_ID
};
