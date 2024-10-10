import { expect, type Locator, type Page } from "@playwright/test";
import { SignupPage } from "./signup-page";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signupLink: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly signinError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.rememberMeCheckbox = page.locator('[data-test="signin-remember-me"]');
    this.signupLink = page.locator('[data-test="signup"]');
    this.usernameError = page.locator("#username-helper-text");
    this.passwordError = page.locator("#password-helper-text");
    this.signinError = page.locator('[data-test="signin-error"]');
  }

  async goto() {
    await this.page.goto("/signin");
    return this;
  }

  async login(username: string, password: string, rememberMe = false) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.page.click('button[data-test="signin-submit"]');
    return this;
  }

  async clickSignupLink() {
    await this.signupLink.click();
    return new SignupPage(this.page);
  }

  async assertIsOnLoginPage() {
    await expect(this.page).toHaveURL("/signin");
    return this;
  }

  async assertUsernameErrorVisible() {
    await expect(this.usernameError).toBeVisible();
    return this;
  }

  async assertPasswordErrorVisible() {
    await expect(this.passwordError).toBeVisible();
    return this;
  }
}
