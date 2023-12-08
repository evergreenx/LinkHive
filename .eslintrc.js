module.exports = {
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': 'error',
    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    '@typescript-eslint/no-unused-vars': 'off'
  }
};
