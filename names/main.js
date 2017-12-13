const harness = require("@calculemus/oli-hammock");

module.exports = harness.simple({
    render: require("./src/display").render,
    read: require("./src/display").read,
    init: require("./src/display").init,
    parse: elem => {
        return elem.vals.map(require("./src/categorize"));
    }
});
