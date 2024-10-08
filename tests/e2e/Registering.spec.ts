import { test, expect } from "@playwright/test";
import DeleteAccountIfExists from "@/app/utils/DeleteAccountIfExists";
import ThrowErrorIfAuthenticationEmulatorIsNotRunning from "@/app/utils/ThrowErrorIfAuthenticationEmulatorIsNotRunning";
import ThrowErrorIfFirestoreEmulatorIsNotRunning from "@/app/utils/ThrowErrorIfFirestoreEmulatorIsNotRunning";
import GenerateRandomString from "@/app/utils/GenerateRandomString";

const email =
  GenerateRandomString(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    4,
    24
  ) + "@gmail.com";
const username = GenerateRandomString(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  4,
  24
);
const password = "wwwwwwww";

test.beforeAll(async () => {
  ThrowErrorIfAuthenticationEmulatorIsNotRunning();
  ThrowErrorIfFirestoreEmulatorIsNotRunning();
  DeleteAccountIfExists(email, password);
});

test("register with correct data", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill(username);
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill(email);
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill(password);
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill(password);
  await page.getByRole("textbox").press("Enter");
  await expect(
    page.getByText("All / News / Philosophy / Earth / Science / War")
  ).toBeVisible();
});
