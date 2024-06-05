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
  query GetRessourcesByGroupId($groupId: ID!, $take: Int, $skip: Int) {
    items: getRessourcesByGroupId(groupId: $groupId, take: $take, skip: $skip) {
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
  query getRessourcesByUser($skip: Int, $take: Int) {
    items: getRessourcesByUser(skip: $skip, take: $take) {
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
