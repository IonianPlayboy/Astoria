module.exports = {
	// devServer: {
	// 	port: 8081,
	// 	https: false,
	// 	hotOnly: true,
	// 	proxy: {
	// 		"/api": {
	// 			target: "http://86.64.78.34:443",
	// 			// pathRewrite: { "^/api": "" },
	// 			changeOrigin: true,
	// 			secure: false
	// 		}
	// 	}
	// }
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			// mutate config for production...
		} else {
			// mutate for development...
		}
	}
};
