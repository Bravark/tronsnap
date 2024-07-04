module.exports = {
  extends: ['../../.eslintrc.js'],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['snap.config.ts'],
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'require-jsdoc': 'off',
        'no-restricted-globals': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'dist/'],
};
