const widgets = require("./widgets");

/**
 * The question's state is only dependent on the string values of the three text fields.
 */
module.exports.read = () => {
    return [
        $(document.body).find("#blank0").val(),
        $(document.body).find("#blank1").val(),
        $(document.body).find("#blank2").val(),
    ];
};

/**
 * Renders hints one-by-one, but collects feedback into one widget.
 */
module.exports.render = data => {
    $("#prompt").text(data.prompt);
    $("#blank0").val(data.parts[0].response);
    $("#blank1").val(data.parts[1].response);
    $("#blank2").val(data.parts[2].response);

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
