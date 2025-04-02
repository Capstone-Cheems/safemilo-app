module.exports = {
    root: true,
    extends: [
        'expo',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
        // '@react-native'
    ],
    ignorePatterns: [
        '/dist/*',
        'components/**',
        'metro.config.js',
        'babel.config.js',
        'tailwind.config.js'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': 'error'
    },
    settings: {
        'import/resolver': {
            'babel-module': {
                alias: {
                    '@': './'
                }
            }
        }
    },
    env: {
        node: true,
        browser: true,
        es6: true,
        jest: true
    }
}
