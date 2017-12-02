module.exports.feedback = (div, correct, id) => {
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
