import { checkPasswords } from "../src/utils/checkInput";

describe("check if userPassword matches all requirement", () => {
  it("should return an error message if password doesn't have at least 9 characters", () => {
    const testPassword = checkPasswords('azerty', 'azerty')
    expect(testPassword.result).toBeFalsy()
    expect(testPassword.errorMessage).toContain("Votre mot de passe doit contenir à minima 9 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !")
  });
  it("should return an error message if password doesn't have at least one uppercase letter", () => {
    const testPassword = checkPasswords('azerty123', 'azerty123')
    expect(testPassword.result).toBeFalsy()
    expect(testPassword.errorMessage).toContain("Votre mot de passe doit contenir à minima 9 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !")
  });
  it("should return an error message if password doesn't have at least one lowercase letter", () => {
    const testPassword = checkPasswords('AZERTY123', 'AZERTY123')
    expect(testPassword.result).toBeFalsy()
    expect(testPassword.errorMessage).toContain("Votre mot de passe doit contenir à minima 9 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !")
  });
  it("should return an error message if password doesn't have at least one number", () => {
    const testPassword = checkPasswords('Azertytest', 'Azertytest')
    expect(testPassword.result).toBeFalsy()
    expect(testPassword.errorMessage).toContain("Votre mot de passe doit contenir à minima 9 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !")
  });
  it("should return an error message if password doesn't have at least one special character", () => {
    const testPassword = checkPasswords('Azertytes1', 'Azertytes1')
    expect(testPassword.result).toBeFalsy()
    expect(testPassword.errorMessage).toContain("Votre mot de passe doit contenir à minima 9 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !")
  });
  it("should return an error message if password and confirmPassword don't match", () => {
    const testPassword = checkPasswords('AZerty12tes!', 'Azertytest!')
    expect(testPassword.result).toBeFalsy()
    expect(testPassword.errorMessage).toContain("Le mot de passe et la confirmation ne correspondent pas !")
  });
  it("shouldn't return any error if password and confirmPassword matches and have all requirement", () => {
    const testPassword = checkPasswords('AZerty12!', 'AZerty12!')
    expect(testPassword).toBeUndefined
  });
})