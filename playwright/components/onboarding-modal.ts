// onboarding-page.ts
import { Page, Locator, expect } from "@playwright/test";

export class OnboardingModal {
  readonly page: Page;
  readonly onboardingDialog: Locator;
  readonly listSkeleton: Locator;
  readonly notificationsCount: Locator;
  readonly nextButton: Locator;
  readonly bankNameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly routingNumberInput: Locator;
  readonly submitButton: Locator;
  readonly onboardingDialogTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.onboardingDialog = page.locator('[data-test="user-onboarding-dialog"]');
    this.listSkeleton = page.locator('[data-test="list-skeleton"]');
    this.notificationsCount = page.locator('[data-test="nav-top-notifications-count"]');
    this.nextButton = page.locator('[data-test="user-onboarding-next"]');
    this.bankNameInput = page.locator("#bankaccount-bankName-input");
    this.accountNumberInput = page.locator("#bankaccount-accountNumber-input");
    this.routingNumberInput = page.locator("#bankaccount-routingNumber-input");
    this.submitButton = page.locator('[data-test="bankaccount-submit"]');
    this.onboardingDialogTitle = page.locator('[data-test="user-onboarding-dialog-title"]');
  }

  async assertOnboardingDialogVisible() {
    await expect(this.onboardingDialog).toBeVisible();
    return this;
  }

  async assertListSkeletonHidden() {
    await expect(this.listSkeleton).toBeHidden();
    return this;
  }

  async assertNotificationsCountVisible() {
    await expect(this.notificationsCount).toBeVisible();
    return this;
  }

  async clickNext() {
    await this.nextButton.click();
    return this;
  }

  async fillBankDetails(bankName: string, accountNumber: string, routingNumber: string) {
    await this.bankNameInput.fill(bankName);
    await this.accountNumberInput.fill(accountNumber);
    await this.routingNumberInput.fill(routingNumber);
    return this;
  }

  async submit() {
    await this.submitButton.click();
    return this;
  }

  async assertOnboardingDialogTitle(expectedTitle: string) {
    await expect(this.onboardingDialogTitle).toHaveText(expectedTitle);
    return this;
  }
}
