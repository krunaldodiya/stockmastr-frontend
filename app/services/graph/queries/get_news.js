import gql from 'graphql-tag';

const GET_NEWS = gql`
  query($length: Int!, $type: String!) {
    news(length: $length, type: $type) {
      id
      title
      description
      content
      source_url
      image_url
      published_at
    }
  }
`;

export { GET_NEWS };
