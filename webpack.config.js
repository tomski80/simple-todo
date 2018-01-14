module.exports = {
    entry: ["./src/js/app.js"],
    output: {
        filename: "./build/bundle.js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    { loader : "url-loader?limit=10000" },
                    { loader : "img-loader" }
                ]
            }

        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
}