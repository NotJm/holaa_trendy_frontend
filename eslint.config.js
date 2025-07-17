const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = tseslint.config(
  // Configuración base de ESLint
  eslint.configs.recommended,
  
  // Configuración para archivos TypeScript
  {
    files: ["**/*.ts"],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      "unused-imports": unusedImports,
    },
    processor: angular.processInlineTemplates,
    rules: {
      // Reglas de Angular
      "@angular-eslint/directive-selector": [
        "error",
        { 
          type: "attribute", 
          prefix: "app", 
          style: "camelCase" 
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { 
          type: "element", 
          prefix: "app", 
          style: "kebab-case" 
        },
      ],
      
      // Reglas para imports y variables no utilizadas
      "unused-imports/no-unused-imports": "warn", // ← CAMBIADO A WARNING
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      
      // Reglas adicionales de TypeScript
      "@typescript-eslint/no-unused-vars": "off", // Desactivamos esta para usar unused-imports
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-var-requires": "error",
      
      // Reglas generales útiles
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  
  // Configuración para archivos HTML (templates de Angular)
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/prefer-inject": "off",
      "@angular-eslint/template/interactive-supports-focus": "warn",
      "@angular-eslint/template/click-events-have-key-events": "warn",
    },
  },
  
  // Configuración específica para archivos de pruebas
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
  
  // Archivos a ignorar
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "*.js",
      "*.mjs",
    ],
  }
);