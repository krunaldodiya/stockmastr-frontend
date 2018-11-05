import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation(
    $id: ID!
    $name: String
    $email: String
    $mobile: String
    $gender: String
    $dob: String
    $type: String
    $city: String
    $state: String
    $sebi_number: String
    $experience: Int
    $avatar: String
    $profile_updated: Boolean
  ) {
    user: updateUser(
      id: $id
      name: $name
      email: $email
      mobile: $mobile
      gender: $gender
      dob: $dob
      type: $type
      city: $city
      state: $state
      sebi_number: $sebi_number
      experience: $experience
      avatar: $avatar
      profile_updated: $profile_updated
    ) {
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

export { UPDATE_USER };
