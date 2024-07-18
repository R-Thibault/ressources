import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-up");
});

test.describe("test sign-up interactions", () => {
  test("all input should be required", async ({ page }) => {
    const firstnameInput = page.getByPlaceholder("Prénom", { exact: true });
    const lastnameInput = page.getByPlaceholder("Nom", { exact: true });
    const emailInput = page.getByPlaceholder("email");
    const passwordInput = page.getByPlaceholder("mot de passe" , { exact: true });
    const confirmPasswordInput = page.getByPlaceholder(
      "confirmation mot de passe",
      { exact: true }
    );

    await expect(firstnameInput).toHaveAttribute("required");
    await expect(lastnameInput).toHaveAttribute("required");
    await expect(emailInput).toHaveAttribute("required");
    await expect(passwordInput).toHaveAttribute("required");
    await expect(confirmPasswordInput).toHaveAttribute("required");
  });

  test("should display error message if password doesn't match the security requirement", async ({
    page,
  }) => {
    const firstnameInput = page.getByPlaceholder("Prénom", { exact: true });
    const lastnameInput = page.getByPlaceholder("Nom", { exact: true });
    const emailInput = page.getByPlaceholder("email");
    const passwordInput = page.getByPlaceholder("mot de passe" , { exact: true });
    const confirmPasswordInput = page.getByPlaceholder(
      "confirmation mot de passe",
      { exact: true }
    );
    const submitButton = page.getByRole("button");
    await firstnameInput.fill("John");
    await lastnameInput.fill("Doe");
    await emailInput.fill("JohnDoe@test.fr");
    await passwordInput.fill("123");
    await confirmPasswordInput.fill("123");
    await submitButton.click();

    await expect(
      page
        .getByRole("alert")
        .getByText(
          "Votre mot de passe doit contenir à minima 9 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial !"
        )
    ).toBeVisible();
  });

  test("should display message if the password and confirm password doesn't match", async ({
    page,
  }) => {
    const firstnameInput = page.getByPlaceholder("Prénom", { exact: true });
    const lastnameInput = page.getByPlaceholder("Nom", { exact: true });
    const emailInput = page.getByPlaceholder("email");
    const passwordInput = page.getByPlaceholder("mot de passe" , { exact: true });
    const confirmPasswordInput = page.getByPlaceholder(
      "confirmation mot de passe",
      { exact: true }
    );
    const submitButton = page.getByRole("button");

    await lastnameInput.clear();
    await firstnameInput.clear();
    await emailInput.clear();
    await passwordInput.clear();
    await confirmPasswordInput.clear();

    await firstnameInput.fill("John");
    await lastnameInput.fill("Doe");
    await emailInput.fill("JohnDoe@test.fr");
    await passwordInput.fill("AzertY1234!");
    await confirmPasswordInput.fill("AzertY1235!");
    await submitButton.click();

    await expect(
      page
        .getByRole("alert")
        .getByText("Le mot de passe et la confirmation ne correspondent pas !")
    ).toBeVisible();
  });

  test("should display message if user has already an account", async ({
    page,
  }) => {
    const firstnameInput = page.getByPlaceholder("Prénom", { exact: true });
    const lastnameInput = page.getByPlaceholder("Nom", { exact: true });
    const emailInput = page.getByPlaceholder("email");
    const passwordInput = page.getByPlaceholder("mot de passe" , { exact: true });
    const confirmPasswordInput = page.getByPlaceholder(
      "confirmation mot de passe",
      { exact: true }
    );
    const submitButton = page.getByRole("button");

    await lastnameInput.clear();
    await firstnameInput.clear();
    await emailInput.clear();
    await passwordInput.clear();
    await confirmPasswordInput.clear();

    await firstnameInput.fill("John");
    await lastnameInput.fill("Doe");
    await emailInput.fill("dev@gmail.com");
    await passwordInput.fill("AzertY1234!");
    await confirmPasswordInput.fill("AzertY1234!");
    await submitButton.click();

    await expect(
      page
        .getByRole("alert")
        .getByText("Une erreur est survenue. Veuillez réessayer!")
    ).toBeVisible();
  });

  test("user should see a confirmation message if user sign up is complete", async ({
    page,
  }) => {
    const firstnameInput = page.getByPlaceholder("Prénom", { exact: true });
    const lastnameInput = page.getByPlaceholder("Nom", { exact: true });
    const emailInput = page.getByPlaceholder("email");
    const passwordInput = page.getByPlaceholder("mot de passe" , { exact: true });
    const confirmPasswordInput = page.getByPlaceholder(
      "confirmation mot de passe",
      { exact: true }
    );
    const submitButton = page.getByRole("button");

    await lastnameInput.clear();
    await firstnameInput.clear();
    await emailInput.clear();
    await passwordInput.clear();
    await confirmPasswordInput.clear();

    await firstnameInput.fill("John");
    await lastnameInput.fill("Doe");
    await emailInput.fill("test-ressource@yopmail.com");
    await passwordInput.fill("AzertY1234!");
    await confirmPasswordInput.fill("AzertY1234!");
    await submitButton.click();

    await page.waitForTimeout(2000);

    await expect(
      page.getByText(
        "Un mail de validation de compte a été envoyé sur votre adresse mail. Verifiez vos courriers indésirables"
      )
    ).toBeVisible();
  });
});
