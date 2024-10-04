import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/tests/e2e/"],
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { useESM: true }], // Używamy ts-jest z ESM
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Traktujemy pliki jako moduły ESM
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapowanie aliasów (jeśli używasz)
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default config;
