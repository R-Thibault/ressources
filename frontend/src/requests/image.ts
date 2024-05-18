import { gql } from "@apollo/client";

export const DELETE_AVATAR = gql`
  mutation Mutation($id: ID!) {
    deleteAvatar(id: $id) {
      id
    }
  }
`;
