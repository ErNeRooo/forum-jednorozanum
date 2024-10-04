import { test, expect } from "@playwright/test";

test("swider easter egg command", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("swider");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("Siema, nazywam się Piotr Ś")).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
  await expect(
    page.getByText("PS C:\\forum-jednorozanum>", { exact: true })
  ).toBeVisible();
});

test("forum help command", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("forum help");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("AVAILABLE COMMANDS:").nth(1)).toBeVisible();
  await expect(
    page.getByText("forum login (to log into your").nth(1)
  ).toBeVisible();
  await expect(
    page.getByText("forum register (to create new").nth(1)
  ).toBeVisible();
  await expect(page.getByText("forum help (to see all").nth(1)).toBeVisible();
  await expect(
    page.getByText("PS C:\\forum-jednorozanum>", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("wrong program", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("adsaddq");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("adsaddq : The term 'adsaddq'")).toBeVisible();
  await expect(page.getByText("At line:1 char:")).toBeVisible();
  await expect(page.getByText("+ adsaddq")).toBeVisible();
  await expect(page.getByText("+ ~~~~~~~")).toBeVisible();
  await expect(page.getByText("+ CategoryInfo :")).toBeVisible();
  await expect(page.getByText("+ FullyQualifiedErrorId :")).toBeVisible();
  await expect(
    page.getByText("PS C:\\forum-jednorozanum>", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("wrong command", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").fill("forum dasdojd");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("forum: 'dasdojd' is not a")).toBeVisible();
  await expect(
    page.getByText("PS C:\\forum-jednorozanum>", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("no input at all", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").press("Enter");
  await expect(
    page.getByText("PS C:\\forum-jednorozanum>").nth(2)
  ).toBeVisible();
  await expect(page.getByRole("textbox")).toBeVisible();
});
