const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        activity: path.resolve(__dirname, "main.js")
    },
    output: {
        filename: "activity.js",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: [
            path.join(_dirname),
            path.join(_dirname, "node_modules", "@calculemus", "oli-hammock", "assets")
        ]
    }
}
