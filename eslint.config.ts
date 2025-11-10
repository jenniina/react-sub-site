import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        NodeJS: 'readonly',
        NodeListOf: 'readonly',
        CSSModuleClasses: 'readonly',
        WindowEventMap: 'readonly',
        JSX: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // ESLint + TypeScript rules
      'no-undef': 'error', // Catches undefined variables/imports
      'react/jsx-no-undef': 'error', // Catches undefined JSX components
      'react/jsx-uses-react': 'error', // Ensures React is used when imported
      'react/jsx-uses-vars': 'error', // Ensures JSX variables are marked as used
      'react/display-name': 'error', // Catches anonymous components
      'react-hooks/rules-of-hooks': 'error', // Ensures hooks rules

      // Turn OFF conflicting rules
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/react-in-jsx-scope': 'off',

      // Disable style rules that conflict with Prettier
      semi: 'off',
      quotes: 'off',
      indent: 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Apply Prettier config to disable conflicting rules
  prettierConfig,
]
