const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        activity: path.join(__dirname, "main.js")
    },
    output: {
        filename: "activity.js",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: [
            path.join(__dirname),
            path.join(__dirname, "node_modules", "@calculemus", "oli-hammock", "assets")
        ]
    }
}
