import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
  query GetTags {
    items: getTags {
      id
      title
    }
  }
`;

export const GET_ALL_TAGS_FROM_ONE_USER = gql`
  query GetAllTagsFromOneUser {
    items: getAllTagsFromOneUser {
      id
      name
    }
  }
`;
