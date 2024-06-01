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

export const GET_ALL_RESSOURCES_FROM_ONE_USER = gql`
  query GetAllRessourceFromOneUser {
    items: getAllRessourceFromOneUser {
      id
      title
      description
      image_id {
        id
        name
        path
      }
      file_id {
        id
        name
        path
      }
      link_id {
        id
        url
      }
      created_by_user {
        id
        lastname
        firstname
        email
        avatar {
          id
          name
          path
        }
      }
      created_at
    }
  }
`;
