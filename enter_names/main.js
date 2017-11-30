const harness = require("@calculemus/oli-embedded-harness");

function categorize (s) {
    switch(s.toLowerCase()) {
        case "dr. chris martens": return "chris";
        case "doc martens": return "chris";
        case "chris martens": return "chris";
        case "dr. martens": return "chris";

        case "mr. rob simmons": return "rob";
        case "rob simmons": return "rob";
        case "dr. simmons": return "rob";
        case "professor simmons": return "rob";

        case "dr. iliano cervesato": return "iliano";
        case "iliano cervesato": return "iliano";
        case "professor cervesato": return "iliano";
        case "mr. cervesato": return "iliano";

        case "professor moore": return "steven";
        case "mr. moore": return "steven";
        case "steven moore": return "steven";
        case "engineer moore": return "steven";

        default: return s.toLowerCase();
    }
}

function makeFeedbackWidget(div, correct, id) {
    const widget = $("<div/>", { id: id });
    if (!div) return widget;

    const container = $("<div/>").css({
        display: "inline-block",
        "padding-left": "25px"
    }).append(div);

    const colors =
        correct === true ? ["#ddffdd", "#33aa33"] :
        correct === false ? ["#f4c4c9", "#e75d36"] :
        correct === "info" ? ["#f2f497", "ffa100"] :
        [ "#ffffff", "#000000" ];

    $(widget).css({
        "border-radius": "10px",
        border: "solid 2px",
        padding: "4px 7px 4px 7px",
        display: "inline-block",
        background: colors[0],
        borderColor: colors[1],
        display: "block"
    }).append(
        $("<p/>").css({"font-weight": "bold"}).text("Feedback")
    ).append(
        container
    );

    return widget;
}

module.exports = harness.simple({
    render: function (data) {
        $("#prompt").text(data.prompt);
        $("#blank0").val(data.parts[0].response);
        $("#blank1").val(data.parts[1].response);
        $("#blank2").val(data.parts[2].response);

        let feedback = $("<div/>");
        let correct = true;
        let hasFeedback = false;
        data.parts.map(part => {
            if (part.analysis) {
                hasFeedback = true;
                correct = correct && part.analysis.correct;
                $(feedback).append(part.analysis.feedback);
                $(feedback).append($("<br/>"));
            }
        });

        $("#feedback").replaceWith(makeFeedbackWidget(
            hasFeedback ? feedback : null, correct, "feedback"));
    },

    read: function () {
        return [
            $(document.body).find("#blank0").val(),
            $(document.body).find("#blank1").val(),
            $(document.body).find("#blank2").val(),
        ];
    },

    parse: categorize
});
