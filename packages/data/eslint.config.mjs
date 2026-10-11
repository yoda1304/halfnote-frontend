import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: { parser: tseslint.parser },
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          { group: ["next", "next/*"], message: "@halfnote/data is shared with iOS; no Next imports." },
          { group: ["react-dom", "react-dom/*"], message: "@halfnote/data is shared with iOS; no react-dom." },
          { group: ["react-native", "react-native/*"], message: "@halfnote/data is shared with web; no react-native." },
        ],
      },
    ],
  },
});
