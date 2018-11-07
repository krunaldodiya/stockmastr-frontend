import gql from 'graphql-tag';

const LOGIN = gql`
  mutation($email: String) {
    auth: login(email: $email) {
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
