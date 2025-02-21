const enactStrict = require('eslint-config-enact/strict');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');

module.exports = [
	...enactStrict,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		plugins: {
			import: importPlugin
		},
		rules: {
			// react rules
			'react/forbid-foreign-prop-types': 'off', // proptypes not removed in storybook config

			// import plugin rules
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
