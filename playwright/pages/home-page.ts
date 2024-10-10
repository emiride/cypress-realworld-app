import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly sidenavToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidenavToggle = page.locator('[data-test="sidenav-toggle"]');
  }

  async goto() {
    await this.page.goto("/");
    return this;
  }

  async assertIsOnHomePage() {
    await expect(this.page).toHaveURL("/");
    return this;
  }
}
