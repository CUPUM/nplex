module.exports = {
	plugins: [
		require('postcss-nesting'),
		require('postcss-normalize'),
		require('autoprefixer'),
		process.env.NODE_ENV === 'production' && require('cssnano')
	]
}