const hammock = require("@calculemus/oli-hammock");
const widgets = require("@calculemus/oli-widgets");

module.exports = hammock.hammock({
    init: () => ({
        seed: Math.floor(Math.random() * 128) + 128,
        resp: ""
    }),

    render: data => {
        $("#n").text(data.state.seed);
        $("#blank").val(data.state.resp);
        if (data.parts[0].feedback) {
            $("#feedback").html(widgets.feedback(data.parts[0].feedback.message, data.parts[0].feedback.correct));
        } else {
            $("#feedback").html(null);
        }
    },

    read: () => ({
        seed: parseInt($("#n").text()),
        resp: $("#blank").val()
    }),

    parse: data => {
        if (data.resp === "") return null;

        let resp = data.resp;
        if (data.resp.indexOf("0b") === 0 || data.resp.indexOf("0B") === 0) {
            resp = resp.substring(2);
        }

        if ("" !== resp.split("0").join("").split("1").join("")) return ["notbinary"];
        if (resp.length !== 8) return ["notword"];
        return parseInt(data.seed) === parseInt(resp, 2) ? ["correct"] : ["wrong"];
    }
});
