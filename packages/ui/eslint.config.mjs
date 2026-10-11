import tseslint from "typescript-eslint";

const shared = [
  { group: ["react-dom", "react-dom/*"], message: "@halfnote/ui is shared with iOS; no react-dom." },
  { group: ["@halfnote/data/react"], message: "@halfnote/ui is props-only; call hooks in the app and pass data down." },
];

export default tseslint.config(
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser },
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [...shared, { group: ["next", "next/*"], message: "@halfnote/ui is shared with iOS; put web-only code in a .web.tsx file." }] },
      ],
    },
  },
  {
    // Web halves of platform pairs may use next/image; nothing else from Next.
    files: ["src/**/*.web.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [...shared, { regex: "^next(/(?!image$).*)?$", message: "Only next/image is allowed in .web files." }] },
      ],
    },
  },
);
