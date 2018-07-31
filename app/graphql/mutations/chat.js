import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation(
    $type: String!
    $email: String!
    $name: String!
    $gender: String!
    $city: String!
    $state: String!
  ) {
    signup(
      type: $type
      email: $email
      name: $name
      gender: $gender
      city: $city
      state: $state
    ) {
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
  mutation(
    $id: ID!
    $type: String
    $name: String
    $gender: String
    $city: String
    $state: String
  ) {
    user: updateUser(
      where: { id: $id }
      data: {
        type: $type
        name: $name
        gender: $gender
        city: $city
        state: $state
      }
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

const CREATE_POST_MUTATION = gql`
  mutation(
    $channel_id: ID!
    $user_id: ID!
    $description: String!
    $signal: String!
    $trigger: Float!
    $stoploss: Float!
    $target: Float!
    $segment: String!
    $stock_exchange: String!
    $stock_symbol: String!
    $stock_name: String!
    $status: String!
  ) {
    createPost(
      data: {
        channel: { connect: { id: $channel_id } }
        owner: { connect: { id: $user_id } }
        description: $description
        signal: $signal
        trigger: $trigger
        stoploss: $stoploss
        target: $target
        segment: $segment
        stock_exchange: $stock_exchange
        stock_symbol: $stock_symbol
        stock_name: $stock_name
        status: $status
      }
    ) {
      id
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
  CREATE_POST_MUTATION,
  UPLOAD_USER_AVATAR_MUTATION
};
