module.exports = {
    entry: "./public/draw-bar-chart.js",
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.(jpg|png)$/, loader: 'url-loader?limit=10' },
            { test: /\.less$/, loaders: [ "style-loader", "css-loader", "less-loader" ] }
        ]
    }
};