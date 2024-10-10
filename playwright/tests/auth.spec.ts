import { test, expect } from "@playwright/test";
import { User } from "../../src/models";
import { getAllUsers } from "../../backend/database";
import { LoginPage } from "../pages/login-page";
import { HomePage } from "../pages/home-page";
import { Sidenav } from "../components/sidenav";
import { OnboardingModal } from "../components/onboarding-modal";
import { SignupPage } from "../pages/signup-page";

test.describe("User Sign-up and Login", () => {
  test("should redirect unauthenticated user to signin page", async ({ page }) => {
    await page.goto("/personal");
    await new LoginPage(page).assertIsOnLoginPage();
  });

  test("should redirect to the home page after login", async ({ page }) => {
    const user: User = getAllUsers()[0];
    await (await new LoginPage(page).goto()).login(user.username, "s3cret");
    await new HomePage(page).assertIsOnHomePage();
  });

  test("should remember a user for 30 days after login", async ({ page }) => {
    const user: User = getAllUsers()[0];
    await (await new LoginPage(page).goto()).login(user.username, "s3cret", true);

    // Verify session cookie
    await expect
      .poll(async () => {
        const cookies = await page.context().cookies();
        return cookies.find((cookie) => cookie.name === "connect.sid");
      })
      .toBeTruthy();

    // Logout user
    await new Sidenav(page).openSidebar().then((sidenav) => sidenav.logout());
    await new LoginPage(page).assertIsOnLoginPage();
  });

  test("should allow a visitor to sign-up, login, and logout", async ({ page }) => {
    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };

    // Sign-up user
    const signupPage = await new LoginPage(page)
      .goto()
      .then((loginPage) => loginPage.clickSignupLink());

    await new LoginPage(page).clickSignupLink();
    await signupPage.signup(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.username,
      userInfo.password
    );

    // Login user
    await new LoginPage(page).login(userInfo.username, userInfo.password);

    // Onboarding
    const onboardingModal = new OnboardingModal(page);
    await onboardingModal.assertOnboardingDialogVisible();
    await onboardingModal.assertListSkeletonHidden();
    await onboardingModal.assertNotificationsCountVisible();

    await onboardingModal.clickNext();
    await onboardingModal.fillBankDetails("The Best Bank", "123456789", "987654321");
    await onboardingModal.submit();

    await onboardingModal.assertOnboardingDialogTitle("Finished");
    await onboardingModal.clickNext();

    // Logout user
    const sidenav = new Sidenav(page);
    await sidenav.openSidebar().then((sidenav) => sidenav.logout());
    await new LoginPage(page).assertIsOnLoginPage();
  });

  test("should display login errors", async ({ page }) => {
    const loginPage = await new LoginPage(page).goto();
    await loginPage.usernameInput.focus();
    await loginPage.usernameInput.blur();
    await loginPage.assertUsernameErrorVisible();

    await loginPage.passwordInput.fill("abc");
    await loginPage.passwordInput.blur();
    await loginPage.assertPasswordErrorVisible();
    await expect(loginPage.submitButton).toBeDisabled();
  });

  test("should display signup errors", async ({ page }) => {
    const signupPage = await new SignupPage(page).goto();

    await signupPage.firstNameInput.focus();
    await signupPage.firstNameInput.blur();
    await expect(signupPage.firstNameError).toBeVisible();

    await signupPage.lastNameInput.focus();
    await signupPage.lastNameInput.blur();
    await expect(signupPage.lastNameError).toBeVisible();

    await signupPage.usernameInput.focus();
    await signupPage.usernameInput.blur();
    await expect(signupPage.usernameError).toBeVisible();

    await signupPage.passwordInput.focus();
    await signupPage.passwordInput.blur();
    await expect(signupPage.passwordError).toBeVisible();

    await signupPage.confirmPasswordInput.fill("DIFFERENT PASSWORD");
    await expect(signupPage.confirmPasswordError).toBeVisible();
  });

  test("should error for an invalid user", async ({ page }) => {
    const loginPage = await new LoginPage(page).goto();
    await loginPage.login("invalidUserName", "invalidPa$$word");
    await expect(loginPage.signinError).toBeVisible();
    await expect(loginPage.signinError).toHaveText("Username or password is invalid");
  });

  test("should error for an invalid password for existing user", async ({ page }) => {
    const user: User = getAllUsers()[0];
    const loginPage = await new LoginPage(page).goto();
    await loginPage.login(user.username, "INVALID");

    await expect(loginPage.signinError).toBeVisible();
    await expect(loginPage.signinError).toHaveText("Username or password is invalid");
  });
});
