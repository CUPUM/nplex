module.exports = {
	plugins: [
		require('postcss-nesting'),
		require('postcss-font-magician')({
			hosted: ['../static/fonts/thicccboi', '../static/fonts/satoshi'],
		}),
		require('postcss-normalize'),
		require('autoprefixer'),
		process.env.NODE_ENV === 'production' && require('cssnano'),
	],
};
