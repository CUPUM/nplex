module.exports = {
	plugins: [
		// require('postcss-nesting'),
		// require('postcss-nested'),
		// require('postcss-font-magician')({
		// 	hosted: ['./static/fonts/outfit/web'],
		// 	display: 'swap',
		// 	formats: 'woff woff2 otf ttf local eot',
		// }),
		require('postcss-normalize'),
		require('autoprefixer'),
		process.env.NODE_ENV === 'production' && require('cssnano'),
	],
};
