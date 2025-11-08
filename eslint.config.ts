// import eslint from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import tsparser from "@typescript-eslint/parser";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import globals from "globals";

// export default [
//   eslint.configs.recommended,
//   {
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.es2021,
//         ...globals.node,
//       },
//       parser: tsparser,
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//         ecmaVersion: "latest",
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       react,
//       "@typescript-eslint": tseslint,
//       "react-hooks": reactHooks,
//     },
//     rules: {
//       // Focus on import/export issues
//       "no-undef": "error",
//       "@typescript-eslint/no-unused-vars": "error",

//       // React-specific issues that could cause undefined components
//       "react/jsx-uses-react": "error",
//       "react/jsx-uses-vars": "error",
//       "react/jsx-no-undef": "error",
//       "react/display-name": "error",
//       "react/prop-types": "off",
//       "react/react-in-jsx-scope": "off",

//       // Hook issues
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "off",

//       // TypeScript issues
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/explicit-module-boundary-types": "off",

//       // Import issues
//       "no-unused-vars": "off", // Use TypeScript version instead
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//   },
//   {
//     // Focus on your problem areas
//     files: [
//       "src/pages/**/*.{ts,tsx}",
//       "src/components/**/*.{ts,tsx}",
//       "src/contexts/**/*.{ts,tsx}",
//     ],
//     rules: {
//       // Extra strict for component files
//       "react/jsx-no-undef": "error",
//       "@typescript-eslint/no-unused-vars": "error",
//       "no-undef": "error",
//     },
//   },
// ];

import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        NodeJS: "readonly",
        NodeListOf: "readonly",
        CSSModuleClasses: "readonly",
        WindowEventMap: "readonly",
        JSX: "readonly",
      },
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
    },
    rules: {
      // Turn OFF all other rules
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/react-in-jsx-scope": "off",

      "no-undef": "error", // Catches undefined variables/imports
      "react/jsx-no-undef": "error", // Catches undefined JSX components
      "react/jsx-uses-react": "error", // Ensures React is used when imported
      "react/jsx-uses-vars": "error", // Ensures JSX variables are marked as used
      "react/display-name": "error", // Catches anonymous components
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
