import HideString from "@/app/utils/HideString";

test("string hiding", () => {
  const result = HideString("<script></script>5382!@#$%^&*()_-+={[}]|:;?/>.<,");
  const expectedResult = "************************************************";

  expect(result).toBe(expectedResult);
});
