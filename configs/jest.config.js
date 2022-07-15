const {getJestConfig} = require('@storybook/test-runner');

const fs = require('fs');
const path = require('path');
const {optionParser: app} = require('@enact/dev-utils');

const iLibDirs = ['node_modules/@enact/i18n/ilib', 'node_modules/ilib', 'ilib'];
const globals = {
	__DEV__: true,
	ILIB_BASE_PATH: iLibDirs.find(f => fs.existsSync(path.join(app.context, f))) || iLibDirs[1],
	ILIB_RESOURCES_PATH: 'resources',
	ILIB_CACHE_ID: new Date().getTime() + ''
};


// This is the default jest config of storybook/jest
// {
// 	rootDir: 'C:\\Users\\daniels\\Desktop\\Lge\\sandstone\\samples\\sampler',
// 	roots: undefined,
// 	testMatch: [ '<rootDir>/stories\\default\\*.js' ],
// 	transform: {
// 		'^.+\\.stories\\.[jt]sx?$': '@storybook/test-runner/playwright/transform',
// 		'^.+\\.[jt]sx?$': 'babel-jest'
// },
// 	preset: 'jest-playwright-preset',
// 	globalSetup: '@storybook/test-runner/playwright/global-setup.js',
// 	globalTeardown: '@storybook/test-runner/playwright/global-teardown.js',
// 	testEnvironment: '@storybook/test-runner/playwright/custom-environment.js',
// 	setupFilesAfterEnv: [ '@storybook/test-runner/playwright/jest-setup.js' ],
// 	snapshotSerializers: [ 'jest-serializer-html' ],
// 	testEnvironmentOptions: { 'jest-playwright': { browsers: [Array], collectCoverage: false } },
// 	watchPlugins: [
// 		'C:\\Users\\daniels\\Desktop\\Lge\\storybook-utils\\node_modules\\jest-watch-typeahead\\build\\file_name_plugin\\plugin.js',
// 		'C:\\Users\\daniels\\Desktop\\Lge\\storybook-utils\\node_modules\\jest-watch-typeahead\\build\\test_name_plugin\\plugin.js'
// 	],
// 		watchPathIgnorePatterns: [ 'coverage', '.nyc_output', '.cache' ]
// }

module.exports = {
	// The default configuration comes from @storybook/test-runner
	...getJestConfig(),
	/** Add your own overrides below
	 * @see https://jestjs.io/docs/configuration
	 */
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babelTransform'),
		'^.+\\.(css|less|sass|scss)$': require.resolve('./cssTransform.js'),
		'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|less|sass|scss|json)$)': require.resolve('./fileTransform'),
		'^.+\\.(js|jsx|ts|tsx)$': '@storybook/test-runner/playwright/transform',
		'^.+\\.[jt]sx?$': require.resolve('babel-jest'),
		// '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\](?!@enact).+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|less|sass|scss)$'
	],
	moduleNameMapper: {
		'^.+\\.module\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
		// '^.+\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
		'^@testing-library/jest-dom$': require.resolve('@testing-library/jest-dom'),
		'^@testing-library/react$': require.resolve('@testing-library/react'),
		'^@testing-library/user-event$': require.resolve('@testing-library/user-event'),
		'^react$': require.resolve('react'),
		// Backward compatibility for new iLib location with old Enact
		'^ilib[/](.*)$': path.join(app.context, globals.ILIB_BASE_PATH, '$1'),
		// Backward compatibility for old iLib location with new Enact
		'^@enact[/]i18n[/]ilib[/](.*)$': path.join(app.context, globals.ILIB_BASE_PATH, '$1')
	},
	moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
	globals
};

