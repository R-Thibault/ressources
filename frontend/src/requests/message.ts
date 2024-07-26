import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES_BY_GROUP = gql`
  query GetAllMessages($groupId: ID!) {
    items: getAllMessages(groupId: $groupId) {
      id
      message
      created_by_user {
        id
        firstname
        lastname
        avatar {
          name
          path
        }
      }
      created_at
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($data: MessageCreateInput!) {
    item: createMessage(data: $data) {
      id
      message
      created_by_user {
        id
        avatar {
          name
          path
        }
        created_at
      }
    }
  }
`;

export const SUBSCRIPTION_MESSAGE = gql`
  subscription Subscription($groupId: ID!) {
    onMessage(groupId: $groupId) {
      id
      group {
        id
      }
      message
      created_by_user {
        avatar {
          name
          path
        }
      }
      created_at
    }
  }
`;
