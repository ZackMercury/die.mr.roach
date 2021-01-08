let path = require("path");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename:"bundle.js",
        //publicPath:"/dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:
                [
                    {
                        loader:"babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                ]
            }
        ]
    }
}