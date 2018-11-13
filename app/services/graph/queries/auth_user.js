import gql from "graphql-tag";

const AUTH_USER = gql`
  query {
    me {
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

export { AUTH_USER };
