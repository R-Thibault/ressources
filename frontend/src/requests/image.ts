import { gql } from "@apollo/client";

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($id: ID!) {
    deleteAvatar(id: $id) {
      id
    }
  }
`;
