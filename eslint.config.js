const enactPlugin = require('eslint-plugin-enact');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
	{
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
			'importPlugin/no-unresolved': ['error', {commonjs: true, caseSensitive: true}],
			'importPlugin/named': 'error',
			'importPlugin/first': 'warn',
			'importPlugin/no-duplicates': 'error',
			'importPlugin/extensions': ['warn', 'always', {js: 'never', json: 'always'}],
			'importPlugin/newline-after-import': 'warn',
			'importPlugin/order': [
				'warn',
				{
					'newlines-between': 'never',
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
				}
			]
		}
	}
];
