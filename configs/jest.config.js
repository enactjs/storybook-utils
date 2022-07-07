console.log('test43543');

module.exports = {
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babelTransform'),
	},
	testEnvironment: 'jsdom'
};
