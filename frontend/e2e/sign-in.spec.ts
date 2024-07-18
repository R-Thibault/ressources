import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-in");
});

test.describe("test sign-in interactions", () => {
  test("email and password input should be required", async ({ page }) => {
    const emailInput = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Mot de passe");

    await expect(emailInput).toHaveAttribute("required");
    await expect(passwordInput).toHaveAttribute("required");
  });

  test("should display message if the user doesn't exist", async ({ page }) => {
    const emailInput = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Mot de passe");
    const submitButton = page.getByRole("button");
    await emailInput.fill("dev@momo.fr");
    await passwordInput.fill("123");
    await submitButton.click();

    await expect(
      page.getByRole("alert").getByText("Utilisateur introuvable.")
    ).toBeVisible();
  });

  test("should display message if the password doesn't match with the email", async ({
    page,
  }) => {
    const emailInput = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Mot de passe");
    const submitButton = page.getByRole("button");
    await emailInput.clear();
    await passwordInput.clear();
    await emailInput.fill("dev@gmail.com");
    await passwordInput.fill("123");
    await submitButton.click();

    await expect(
      page
        .getByRole("alert")
        .getByText("Utilisateur et mot de passe ne correspondent pas.")
    ).toBeVisible();
  });

  test("should display message if user account hasn't been validated", async ({
    page,
  }) => {
    const emailInput = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Mot de passe");
    const submitButton = page.getByRole("button");
    await emailInput.clear();
    await passwordInput.clear();
    await emailInput.fill("disabled@gmail.com");
    await passwordInput.fill("aZertY2024!");
    await submitButton.click();

    await expect(
      page.getByRole("alert").getByText("Le compte n'a pas encore été validé.")
    ).toBeVisible();
  });

  test("should access to the dashboard", async ({ page }) => {
    const emailInput = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Mot de passe");
    const submitButton = page.getByRole("button");
    await emailInput.clear();
    await passwordInput.clear();
    await emailInput.fill("dev@gmail.com");
    await passwordInput.fill("superPassword1!");
    await submitButton.click();

    await page.waitForTimeout(3000);

    await expect(page.getByText("Mon Dashboard")).toBeVisible();
  });
});
