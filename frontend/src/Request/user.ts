import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($data: UserCreateInput!) {
    item: signUp(data: $data) {
      id
      email
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($data: UserSignInInput!) {
    item: signIn(data: $data) {
      id
      email
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    item: signOut {
      id
      email
    }
  }
`;

export const MY_PROFILE = gql`
  query MyProfile {
    item: myProfile {
      id
      email
      lastname
      firstname
    }
  }
`;
