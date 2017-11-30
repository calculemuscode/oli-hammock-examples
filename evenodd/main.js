const hammock = require("@calculemus/oli-embedded-harness");
module.exports = hammock.simple({
    render: (data) => {
       $("#prompt").text(data.prompt);
       $("#blank0").val(data.parts[0].response);
       $("#feedback0").text(data.parts[0].analysis ? data.parts[0].analysis.feedback : "");
       $("#blank1").val(data.parts[1].response);
       $("#feedback1").text(data.parts[1].analysis ? data.parts[1].analysis.feedback : "");
    },

    read: () => {
       return [
           $("#blank0").val(),
           $("#blank1").val()
       ];
    },

    parse: (str) => {
       if (!str || str === "") return "blank";
        const i = parseInt(str);
       if (isNaN(i)) return "nan";
       if (i.toString() !== str) return "nan";
       if (i < 0) return "neg";
        return i % 2 === 0 ? "even" : "odd";
    }
});
