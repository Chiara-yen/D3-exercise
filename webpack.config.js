var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./public/draw-scatterplot-chart.js",
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    // module: {
    //     loaders: [
    //         { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "less-loader") }
    //     ]
    // },
    // plugins: [
    //     new ExtractTextPlugin("styles.css")
    // ]
    module: {
        loaders: [
            { test: /\.(jpg|png)$/, loader: 'url-loader?limit=10' },
            { test: /\.less$/, loaders: [ "style-loader", "css-loader", "less-loader" ] }
        ]
    }
};