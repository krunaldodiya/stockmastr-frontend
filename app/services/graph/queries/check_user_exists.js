import gql from "graphql-tag";

const CHECK_USER_EXISTS = gql`
  query($email: String!) {
    user(email: $email) {
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

export { CHECK_USER_EXISTS };
