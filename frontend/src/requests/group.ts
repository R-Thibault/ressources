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
export const DELETE_GROUP = gql`
  mutation DeleteGroup($data: DeleteGroupInput!) {
    item: deleteGroup(data: $data) {
      id
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation DeleteMember($data: MemberLeavingGroupInput!) {
    item: deleteMember(data: $data) {
      id
    }
  }
`;

export const SEND_GROUP_INVITATION = gql`
  mutation InviteGroupMembers($email: String!, $groupId: ID!) {
    inviteGroupMembers(email: $email, groupId: $groupId)
  }
`;

export const GET_MY_GROUPS = gql`
  query getMyGroups {
    items: getMyGroups {
      id
      name
      description
      created_at
      created_by_user {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_ONE_GROUP = gql`
  query GetOneGroup($id: ID!) {
    item: getOneGroup(id: $id) {
      id
      name
      description
      created_at
      created_by_user {
        id
        firstname
        lastname
      }
    }
  }
`;
