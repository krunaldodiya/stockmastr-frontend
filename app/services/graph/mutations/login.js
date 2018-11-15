import gql from "graphql-tag";

const LOGIN = gql`
  mutation($mobile: String) {
    auth: login(mobile: $mobile) {
      token
      user {
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
  }
`;

export { LOGIN };
