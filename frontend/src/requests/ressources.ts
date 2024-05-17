import { gql } from "@apollo/client";

export const CREATE_RESSOURCE = gql`
  mutation createRessource($data: RessourceCreateInput!) {
    createRessource(data: $data) {
      title
      description
      id
    }
  }
`;

export const GET_RESSOURCES_BY_GROUP_ID = gql`
  query GetRessourcesByGroupId($groupId: ID!) {
    item: getRessourcesByGroupId(groupId: $groupId) {
      id
      title
      description
      is_favorite
      image_id {
        id
        path
        name
      }
      created_by_user {
        id
        lastname
        firstname
        avatar {
          id
          name
          path
        }
      }
      group_id {
        id
      }
    }
  }
`;
