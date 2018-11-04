import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation($email: String!, $name: String) {
    user: createUser(email: $email, name: $name) {
      id
      name
      email
      dob
      mobile
    }
  }
`;

export { CREATE_USER };
