const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const getLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const {DefinePlugin} = require('webpack');
const {optionParser: app, GracefulFsPlugin, ILibPlugin, WebOSMetaPlugin} = require('@enact/dev-utils');

module.exports = function (config, mode, dirname) {
	const isProduction = mode === 'PRODUCTION';
	const shouldUseSourceMap = (process.env.GENERATE_SOURCEMAP || 'true') !== 'false';
	const publicPath = '';

	app.setEnactTargetsAsDefault();

	const getStyleLoaders = (cssLoaderOptions = {}, preProcessor) => {
		const loaders = [
			process.env.INLINE_STYLES ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
			{
				loader: require.resolve('css-loader'),
				options: Object.assign(
					{importLoaders: preProcessor ? 2 : 1, sourceMap: shouldUseSourceMap},
					cssLoaderOptions
				)
			},
			{
				loader: require.resolve('postcss-loader'),
				options: {
					postcssOptions: {
						// Necessary for external CSS imports to work
						// https://github.com/facebook/create-react-app/issues/2677
						ident: 'postcss',
						plugins: [
							'postcss-flexbugs-fixes',
							'postcss-global-import',
							[
								'postcss-preset-env',
								{
									autoprefixer: {
										flexbox: 'no-2009',
										remove: false
									},
									stage: 3,
									features: {'custom-properties': false}
								}
							],
							require('postcss-normalize'),
							app.ri && require('postcss-resolution-independence')(app.ri)
						].filter(Boolean)
					},
					sourceMap: shouldUseSourceMap
				}
			}
		];
		if (preProcessor) loaders.push(preProcessor);
		return loaders;
	};

	const getLessStyleLoaders = cssLoaderOptions =>
		getStyleLoaders(cssLoaderOptions, {
			loader: require.resolve('less-loader'),
			options: {
				lessOptions: {
					modifyVars: Object.assign({__DEV__: !isProduction}, app.accent)
				},
				sourceMap: shouldUseSourceMap
			}
		});

	// Modify stock Storybook config for Enact-tailored experience
	config.devtool = shouldUseSourceMap && 'source-map';
	config.output = Object.assign({}, config.output, {
		assetModuleFilename: '[name][ext]'
	});
	config.resolve.modules = ['node_modules', path.resolve(app.context, 'node_modules')];
	config.resolve.alias = Object.assign({}, config.resolve.alias, {
		// coerce everything to use the ilib installed with the sampler
		// since it is set as a peer dependency by the enact modules
		ilib: path.resolve(app.context, 'node_modules/ilib'),
		// workaround for storybook 7 to avoid different versions of React being used
		react: path.resolve(app.context, 'node_modules/react')
	});
	config.performance = false;

	// Narrow rules into oneOf and add our custom rules first
	config.module.rules = [{oneOf: config.module.rules}];
	config.module.rules[0].oneOf.unshift(
		{
			test: /\.(js|mjs|jsx|ts|tsx)$/,
			exclude: /node_modules.(?!@enact)/,
			loader: require.resolve('babel-loader'),
			options: {
				configFile: path.join(dirname, 'babel.config.js'),
				babelrc: false,
				cacheDirectory: !isProduction,
				cacheCompression: false,
				compact: isProduction
			}
		},
		{
			test: /\.module\.css$/,
			use: getStyleLoaders({
				modules: {
					getLocalIdent
				}
			})
		},
		{
			test: /\.css$/,
			// The `forceCSSModules` Enact build option can be set true to universally apply
			// modular CSS support.
			use: getStyleLoaders({
				modules: {
					...(app.forceCSSModules ? {getLocalIdent} : {mode: 'icss'})
				}
			}),
			// Don't consider CSS imports dead code even if the
			// containing package claims to have no side effects.
			// Remove this when webpack adds a warning or an error for this.
			// See https://github.com/webpack/webpack/issues/6571
			sideEffects: true
		},
		{
			test: /\.module\.less$/,
			use: getLessStyleLoaders({
				modules: {
					getLocalIdent
				}
			})
		},
		{
			test: /\.less$/,
			use: getLessStyleLoaders({
				modules: {
					...(app.forceCSSModules ? {getLocalIdent} : {mode: 'icss'})
				}
			}),
			sideEffects: true
		},
		{
			exclude: [/^$/, /\.(js|mjs|cjs|jsx|ts|tsx)$/, /\.html$/, /\.ejs$/, /\.json$/],
			type: 'asset/resource'
		}
	);

	config.plugins.push(
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
			'process.env.PUBLIC_URL': JSON.stringify('.')
		}),
		new NodePolyfillPlugin(),
		new GracefulFsPlugin(),
		new ILibPlugin({publicPath}),
		new WebOSMetaPlugin({path: path.join(dirname, 'webos-meta')})
	);

	if (!process.env.INLINE_STYLES) {
		config.plugins.push(
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: 'chunk.[name].css',
				ignoreOrder: true
			})
		);

		config.optimization = Object.assign({}, config.optimization, {
			splitChunks: {
				cacheGroups: {
					styles: {
						name: 'styles',
						type: 'css/mini-extract',
						chunks: 'all',
						enforce: true
					}
				}
			}
		});
	}

	return config;
};
