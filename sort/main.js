const hammock = require("@calculemus/oli-hammock");
const widgets = require("@calculemus/oli-widgets");

module.exports = hammock.hammock({
    render: data => {
        console.log(data);
        if (data.parts[0].feedback) {
            const feedback = data.parts[0].feedback;
            console.log(feedback);
            $("#feedback").html(widgets.feedback(feedback.message, feedback.correct));
        }
        return;
    },
    read: () => 4,
    init: () => {
        console.log("init");
        return 4;
    },
    parse: elem => ["foo"]
});
