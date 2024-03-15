import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation createGroup($data: GroupInput!) {
    createGroup(data: $data) {
      name
      description
      id
    }
  }
`;
