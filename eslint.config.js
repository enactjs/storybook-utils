const enactConfig = require('eslint-config-enact/strict');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	{
		...enactConfig,
		...prettierConfig,
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		plugins: {
			import: importPlugin,
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
			],
			'prettierPlugin/prettier': 'error',
			'arrow-body-style': 'off',
			'prefer-arrow-callback': 'off'
		}
	}
];
