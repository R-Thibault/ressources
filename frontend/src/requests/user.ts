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
      avatar {
        id
        name
        path
      }
    }
  }
`;

export const RESEND_VALIDATION_EMAIL = gql`
  mutation ResendValidationEmail($email: String!) {
    resendValidationEmail(email: $email)
  }
`;

export const VALIDATE_ACCOUNT = gql`
  mutation ValidateAccount($token: String!) {
    validateAccount(token: $token)
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserUpdateInput!, $updateUserId: ID!) {
    item: updateUser(data: $data, id: $updateUserId) {
      lastname
      firstname
    }
  }
`;

export const GET_USER = gql`
  query GetOneUser($getOneUserId: ID!) {
    item: getOneUser(id: $getOneUserId) {
      id
      email
      firstname
      lastname
      avatar {
        id
        name
        path
      }
    }
  }
`;
