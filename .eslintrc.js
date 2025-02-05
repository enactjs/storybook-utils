module.exports = {
	env: {
		node: true
	},
	extends: ['enact/strict'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['import'],
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
};
