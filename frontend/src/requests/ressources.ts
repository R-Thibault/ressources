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