import gql from "graphql-tag";

const GET_NEWS = gql`
  query($skip: Int!, $take: Int!, $type: String!) {
    news(skip: $skip, take: $take, type: $type) {
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
