import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation($email: String!, $name: String) {
    user: createUser(email: $email, name: $name) {
      id
      name
      email
      mobile
      gender
      dob
      type
      city
      state
      sebi_number
      experience
      avatar
      profile_updated
    }
  }
`;

export { CREATE_USER };
