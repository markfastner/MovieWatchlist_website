const path = require('path');

module.exports = {
    // ... other webpack config options ...
    entry: "./src/index.js",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],

        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            fs: require.resolve("fs"),
        },
    },
    output: {
        filename: "content.js",
        path: path.resolve(__dirname, ".", "chrome_extension"),
    },
};
