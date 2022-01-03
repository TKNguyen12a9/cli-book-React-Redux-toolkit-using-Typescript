export const webpackConfig = {
	target: "node",
	resolve: {
		fallback: {
			fs: false,
			assert: false,
			os: false,
			jscodeshift: false,
			path: require.resolve("path-browserify/"),
			constants: require.resolve("constants-browserify/"),
		},
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"], // other stuff
	},
}
