module.exports = {
	plugins: [
		// require('postcss-import')(),
		require('autoprefixer')({
			cascade: false,
		}),
		require('postcss-sort-media-queries')(),
		// require('postcss-mq-optimize'),
		require('cssnano')({
			preset: 'default',
		}),
	],
};
