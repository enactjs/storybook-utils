/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babelTransform'),
	},
	testEnvironment: 'jsdom'
};