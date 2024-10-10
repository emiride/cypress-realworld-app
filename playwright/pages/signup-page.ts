import { Locator, Page } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signupButton: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.confirmPasswordInput = page.locator("#confirmPassword");
    this.signupButton = page.getByTestId("signup-submit");
    this.firstNameError = page.locator("#firstName-helper-text");
    this.lastNameError = page.locator("#lastName-helper-text");
    this.usernameError = page.locator("#username-helper-text");
    this.passwordError = page.locator("#password-helper-text");
    this.confirmPasswordError = page.locator("#confirmPassword-helper-text");
  }

  async goto() {
    await this.page.goto("/signup");
    return this;
  }

  async signup(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword = password
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.signupButton.click();
    return this;
  }

  async assertIsOnSignupPage() {
    await expect(this.page).toHaveURL("/signup");
    return this;
  }
}
