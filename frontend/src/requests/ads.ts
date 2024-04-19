import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds($query: WhereAd) {
    items:getAds(query: $query) {
      ads {
      id
      description
      imageUrl
      location
      price
      createdAt
      title
      category {
        id
        title
      }
      tags {
        id
        title
      }
      user {
        id
        email
      }
    }
    maxPrice
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($id: ID!) {
    item: getAdById(id: $id) {
      id
      title
      description
      imageUrl
      location
      price
      createdAt
      tags {
        id
        title
      }
      category {
        id
        title
      }
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_NEW_AD = gql`
  mutation AddNewAd($data: InputAd!) {
    addNewAd(data: $data) {
      id
    }
  }
`;

export const UPDATE_AD = gql`
  mutation Mutation($id: ID!, $data: UpdatedAd!) {
  updateAd(id: $id,data: $data, ) {
    id
    category {
      id
    }
    tags {
      id
    }
    user {
        id
        email
      }
  }
}
`;

export const DELETE_AD = gql`
  mutation DeleteAd($id: ID!) {
    deleteAd(id: $id) {
      id
      description
      imageUrl
      location
      price
      createdAt
      title
    }
  }
`;
