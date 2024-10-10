import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

export class Sidenav {
  readonly page: Page;
  readonly toggleButton: Locator;
  readonly sidebar: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toggleButton = page.locator('[data-test="sidenav-toggle"]');
    this.sidebar = page.locator('[data-test="sidenav"]');
    this.logoutButton = page.locator('[data-test="sidenav-signout"]');
  }

  async openSidebar() {
    if (await this.sidebar.isVisible()) {
      return this;
    } else {
      await this.toggleButton.click();
      await this.sidebar.waitFor({ state: "visible" });
      return this;
    }
  }

  async logout() {
    await this.openSidebar();
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
