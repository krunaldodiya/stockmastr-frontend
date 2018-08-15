import gql from 'graphql-tag';

const SOCIAL_AUTH_MUTATION = gql`
  mutation($email: String!, $name: String!) {
    socialAuth(email: $email, name: $name) {
      user {
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
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation(
    $type: String!
    $email: String!
    $name: String!
    $gender: String!
    $city: String!
    $state: String!
  ) {
    signup(type: $type, email: $email, name: $name, gender: $gender, city: $city, state: $state) {
      user {
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
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation($email: String!) {
    login(email: $email) {
      user {
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
      token
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation($id: ID!, $type: String, $name: String, $gender: String, $city: String, $state: String) {
    user: updateUser(
      where: { id: $id }
      data: { type: $type, name: $name, gender: $gender, city: $city, state: $state }
    ) {
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

const UPLOAD_USER_AVATAR_MUTATION = gql`
  mutation($user_id: ID!, $image: Upload!) {
    uploadUserAvatar(image: $image, user_id: $user_id) {
      id
    }
  }
`;

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  UPDATE_USER_MUTATION,
  UPLOAD_USER_AVATAR_MUTATION,
  SOCIAL_AUTH_MUTATION,
};
