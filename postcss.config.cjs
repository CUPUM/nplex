module.exports = {
	plugins: [
		// require('postcss-normalize'),
		require('postcss-functions')({
			functions: require('./src/styles/functions.cjs')
		}),
		require('postcss-nested'),
		// require('postcss-each'),
		// require('postcss-for'),
		require('autoprefixer'),
		process.env.NODE_ENV === 'production' && require('cssnano'),
	]
}