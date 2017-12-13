const hammock = require("@calculemus/oli-hammock");

const parse = (str) => {
    if (!str || str === "") return "blank";
    const i = parseInt(str);
    if (isNaN(i)) return "nan";
    if (i.toString() !== str) return "nan";
    if (i < 0) return "neg";
    return i % 2 === 0 ? "even" : "odd";
};

module.exports = hammock.simple({
    init: () => ["", ""],

    render: (data) => {
       $("#prompt").text(data.prompt);
       $("#blank0").val(data.response[0]);
       $("#feedback0").text(data.parts[0].feedback ? data.parts[0].feedback.message : "");
       $("#blank1").val(data.response[1]);
       $("#feedback1").text(data.parts[1].feedback ? data.parts[1].feedback.message : "");
    },

    read: () => {
       return [
           $("#blank0").val(),
           $("#blank1").val()
       ];
    },

    parse: data => data.map(parse)
});
