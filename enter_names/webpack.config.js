const path = require("path");

module.exports = {
    entry: {
        activity: "./main.js"
    },
    output: {
        filename: "activity.js",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: [
            path.join(__dirname),
            path.join(__dirname, "node_modules/@calculemus/oli-embedded-harness/assets")
        ]
    }
}
