import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($data: InputUser!) {
    item: signUp(data: $data) {
      id
      email
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($data: InputUser!) {
    item: signIn(data: $data) {
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
    }
  }
`;
