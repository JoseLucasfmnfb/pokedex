module.exports = {
	publicPath: process.env.BASE_URL,
	css: {
		loaderOptions: {
			sass: {
				additionalData: '@import "@/assets/scss/style.scss";'
			}
		}
	}
};