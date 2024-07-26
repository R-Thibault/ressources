import * as EmailValidator from "email-validator";
const regexCheckPassword =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

export function checkPasswords(
  password: string,
  confirmPassword: string
): { result: boolean; errorMessage: string } {
  if (!regexCheckPassword.test(password)) {
    return {
      result: false,
      errorMessage:
        "Votre mot de passe doit contenir à minima 8 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !",
    };
  } else {
    if (password === confirmPassword) {
      return {
        result: true,
        errorMessage: "",
      };
    } else {
      return {
        result: false,
        errorMessage:
          "Le mot de passe et la confirmation ne correspondent pas !",
      };
    }
  }
}

export function checkEmail(email: string): boolean {
  return EmailValidator.validate(email);
}
