import gql from "graphql-tag";

const GET_AUTH_USER = gql`
  query {
    authUser: me {
      id
      mobile
      name
      gender
      city
      state
      avatar
    }
  }
`;

export { GET_AUTH_USER };
