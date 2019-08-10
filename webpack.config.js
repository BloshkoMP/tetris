const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
require("babel-register");

const config = {
	entry: "./src/modules/main.js",

	output: {
		path: path.resolve(__dirname, "./hosting/public"),
		filename: "tetris.js"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},

			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			}
		]
	},

	plugins: [
		new htmlWebpackPlugin({
			template: "./public/index.html"
		})
	]
};

module.exports = config;
