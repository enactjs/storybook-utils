const enactPlugin = require('eslint-plugin-enact/strict');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierRecommended = require('eslint-plugin-prettier/configs/recommended');

module.exports = [
	{
		...prettierRecommended,
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			}
		},
		plugins: {
			enactPlugin,
			importPlugin,
			prettierPlugin
		},
		rules: {
			'react/forbid-foreign-prop-types': 'off', // proptypes not removed in storybook config
			'import/no-unresolved': ['error', {commonjs: true, caseSensitive: true}],
			'import/named': 'error',
			'import/first': 'warn',
			'import/no-duplicates': 'error',
			'import/extensions': ['warn', 'always', {js: 'never', json: 'always'}],
			'import/newline-after-import': 'warn',
			'import/order': [
				'warn',
				{
					'newlines-between': 'never',
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
				}
			]
		}
	}
];
