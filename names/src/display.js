const widgets = require("@calculemus/oli-widgets");

/**
 * The question's state contains the student's entry and the hint state for every part.
 */
module.exports.read = () => {
    return [
        { val: $(document.body).find("#blank0").val(), hint: widgets.readHint($("#hint0")) },
        { val: $(document.body).find("#blank1").val(), hint: widgets.readHint($("#hint1")) },
        { val: $(document.body).find("#blank2").val(), hint: widgets.readHint($("#hint2")) }
    ];
};

/**
 * Renders hints one-by-one, but collects feedback into one widget.
 */
module.exports.render = data => {
    $("#prompt").text(data.prompt);

    $("#blank0").val(data.parts[0].response && data.parts[0].response.val);
    $("#blank1").val(data.parts[1].response && data.parts[1].response.val);
    $("#blank2").val(data.parts[2].response && data.parts[2].response.val);

    $("#hint0").html(widgets.hint(data.parts[0].hints, data.parts[0].response && data.parts[0].response.hint));
    $("#hint1").html(widgets.hint(data.parts[1].hints, data.parts[1].response && data.parts[1].response.hint));
    $("#hint2").html(widgets.hint(data.parts[2].hints, data.parts[2].response && data.parts[2].response.hint));

    let feedback = $("<div/>");
    let correct = true;
    let hasFeedback = false;
    data.parts.map((part, i) => {
        if (part.analysis) {
            hasFeedback = true;
            correct = correct && part.analysis.correct;
            $(feedback).append((part.analysis.correct ? "\u2705&nbsp; " : "\u274C&nbsp; ") + part.analysis.feedback);
            $(feedback).append($("<br/>"));
        }
    });

    $("#feedback").html(widgets.feedback(hasFeedback ? feedback : null, correct));
};
