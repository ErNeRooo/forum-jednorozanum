import { test, expect } from "@playwright/test";

test("no name entered", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").press("Enter");
  await page.getByText("Your name must be between 4").click();
  await expect(page.getByText("Your name must be between 4")).toBeVisible();
  await expect(page.getByText("Enter your name:").nth(1)).toBeVisible();
});

test("too long name entered", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwwwwwwwwwwwwwwwwwwwwwwww");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("Your name must be between 4")).toBeVisible();
  await expect(
    page.getByText("Enter your name:", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("no email entered", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwwww");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("is not a valid email format.")).toBeVisible();
  await expect(page.getByText("Enter your email:").nth(1)).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("email without .", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwww");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("w@www");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("w@www is not a valid email")).toBeVisible();
  await expect(
    page.getByText("Enter your email:", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("email without @ domain", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwww");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("ww.ww");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("ww.ww is not a valid email")).toBeVisible();
  await expect(
    page.getByText("Enter your email:", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("password too short", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwww");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("w@w.w");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("ww");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("Your password must be at")).toBeVisible();
  await expect(
    page.getByText("Enter your password:", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("passwords don't match", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("forum register");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwww");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("w@w.w");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("wwwwww");
  await page.getByRole("textbox").fill("wwwwwwww");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("textbox").fill("www");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("Your passwords do not match.")).toBeVisible();
  await expect(
    page.getByText("Confirm your password:", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});
