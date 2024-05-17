import { gql } from "@apollo/client";

export const CREATE_LINK_MUTATION = gql`
mutation CreateLink($data: LinkCreateInput!){
    item : createLink(data: $data){
        id
        url
    }
}
`;