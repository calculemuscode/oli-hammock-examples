/**
 * Transforms student responses into keys, by rewriting names in an ad-hoc way to capture variations on four
 * possible input names. Not a great example of how to do things in a real code, but this pattern of having a
 * separate classification function to split up the answer space is a useful one.
 */
module.exports = s => {
    switch(s.toLowerCase()) {
        case "dr. chris martens": return "chris";
        case "doc martens": return "chris";
        case "chris martens": return "chris";
        case "christopher robin martens": return "chris";
        case "dr. martens": return "chris";

        case "mr. rob simmons": return "rob";
        case "mr. robert simmons": return "rob";
        case "mr. robert john simmons": return "rob";
        case "rob simmons": return "rob";
        case "robert simmons": return "rob";
        case "robert john simmons": return "rob";
        case "dr. rob": return "rob";
        case "dr. simmons": return "rob";
        case "dr. rob simmons": return "rob";
        case "dr. robert simmons": return "rob";
        case "dr. robert john simmons": return "rob";
        case "professor simmons": return "rob";

        case "dr. cervesato": return "iliano";
        case "dr. iliano cervesato": return "iliano";
        case "iliano cervesato": return "iliano";
        case "professor cervesato": return "iliano";
        case "professor iliano cervesato": return "iliano";
        case "mr. cervesato": return "iliano";
        case "mr. iliano cervesato": return "iliano";

        case "professor moore": return "steven";
        case "professor steven moore": return "steven";
        case "mr. moore": return "steven";
        case "mr. steven moore": return "steven";
        case "steven moore": return "steven";
        case "engineer moore": return "steven";
        case "engineer steven moore": return "steven";
        case "learning engineer moore": return "steven";
        case "learning engineer steven moore": return "steven";

        default: return s.toLowerCase();
    }
}
