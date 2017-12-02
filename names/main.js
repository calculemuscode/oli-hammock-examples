const harness = require("@calculemus/oli-hammock");

module.exports = harness.simple({
    render: require("./src/display").render,
    read: require("./src/display").read,
    parse: require("./src/categorize")
});