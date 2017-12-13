const widgets = require("@calculemus/oli-widgets");

/**
 * The question's state contains the student's entry and the hint state for every part.
 */
module.exports.read = () => ({
    vals: [
        $("#blank0").val(),
        $("#blank1").val(),
        $("#blank2").val()
    ],
    hints: [
        widgets.readHint($("#hint0")),
        widgets.readHint($("#hint1")),
        widgets.readHint($("#hint2"))
    ]
});

module.exports.init = () => ({
    vals: ["", "", ""],
    hints: [widgets.initHint, widgets.initHint, widgets.initHint]
});

/**
 * Renders hints one-by-one, but collects feedback into one widget.
 */
module.exports.render = data => {
    $("#prompt").text(data.prompt);

    $("#blank0").val(data.state.vals[0]);
    $("#blank1").val(data.state.vals[1]);
    $("#blank2").val(data.state.vals[2]);

    $("#hint0").html(widgets.hint(data.parts[0].hints, data.state.hints[0]));
    $("#hint1").html(widgets.hint(data.parts[1].hints, data.state.hints[1]));
    $("#hint2").html(widgets.hint(data.parts[2].hints, data.state.hints[2]));

    let feedback = $("<div/>");
    let correct = true;
    let blanks = false;
    let hasFeedback = false;
    data.parts.map((part, i) => {
        if (part.feedback) {
            hasFeedback = true;
            correct = correct && part.feedback.correct;
            $(feedback).append((part.feedback.correct ? "\u2705&nbsp; " : "\u274C&nbsp; ") + part.feedback.message);
        } else {
            blanks = true;
            $(feedback).append(`\u2753&nbsp; Please include an answer for part ${i}`);
        }
        $(feedback).append($("<br/>"));

    });

    const colorIndicator = !correct ? false  : blanks ? "warn" : true;
    $("#feedback").html(hasFeedback ? widgets.feedback(feedback, colorIndicator) : null);
};
