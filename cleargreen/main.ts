import { QuestionData, hammock } from "@calculemus/oli-hammock"
import * as widgets from "@calculemus/oli-widgets";
import { parseProgram,  } from "@calculemus/jaco";

// XXX need to export type
function check_constant(exp: any): [string] {
    if (exp.tag !== "IntLiteral") return ["notintliteral"];
    // XXX Fix Jaco bug: this should definitely just be -65281
    if (exp.value !== -65281 && exp.value !== 4294902015) return ["wrongvalue"];
    if (exp.raw[0] !== "0") return ["nothex"];
    return ["good"];
}
function check_p_and_mask(exp: any, p?: string): [string] {
    p = p || "p";
    if (exp.tag === "LogicalExpression" && exp.operator === "&&") return ["bitwisenotlogical"];
    if (exp.operator !== "BinaryExpression" && exp.operator !== "&") return ["justand"];
    if (exp.left.tag === "Identifier" && exp.left.name === p) {
        return check_constant(exp.right);
    } else if (exp.right.tag === "Identifier" && exp.right.name === p) {
        return check_constant(exp.left);
    } else {
        return ["noidentifier"];
    }
}

export = hammock<string>({
    init: () => "int clear_green(int p) {\n   //TODO\n}",
    read: () => {
        return `${$("textarea").val()}`
    },
    render: (data: QuestionData<string>) => {
        $("#prompt").html(data.prompt!);
        $("textarea").val(data.state);
        if (data.parts[0].feedback) {
            $("#feedback").html(widgets.feedback(data.parts[0].feedback!.message, data.parts[0].feedback!.correct));
        } else {
            $("#feedback").html("");
        }
    },
    parse: (prog: string) => {
        try {
            const ast = parseProgram("C0", prog);
            
            // Next four lines are temporary: right now Jaco only parses limited top-level declarations
            if (ast.size !== 1) return ["onefunction"];
            const func = ast.get(0);
            if (typeof func !== "object" || func.tag !== "BlockStatement") return ["onefunction"];
            const body = func.body;

            // Obviously ill-formed if there's no ending return 
            if (body.length === 0) return ["empty"];
            const stmR = body[body.length - 1];
            if (stmR.tag !== "ReturnStatement") return ["finishwithreturn"];
            if (stmR.argument === null) return ["returnsomething"];

            // Look for statements that shouldn't be there 
            const toocomplicated = body.slice(0, body.length - 1).reduce((x: null | string, a) => {
                if (x !== null) return x;
                switch (a.tag) {
                    case "IfStatement": return "conditional";
                    case "UpdateStatement": return "increment/decrement";
                    case "WhileStatement":
                    case "ForStatement": return "loop";
                    case "AssertStatement": return "assertion";
                    case "ErrorStatement": return "error()";
                    case "BlockStatement": return "code block";
                    case "ExpressionStatement": return "expressions";
                    case "ReturnStatement": return "multiplereturn";
                    default: return null;
                }
            }, null);
            // XXX TODO: this should feed the student back the effectless expression.
            if (toocomplicated === "expressions") return ["expressions"];
            if (toocomplicated === "multiplereturn") return ["multiplereturn"];
            // XXX TODO: the toocomplicated message should include the string.
            if (toocomplicated !== null) return ["toocomplicated"];

            // Fined-tuned checks
            if (body.length === 1) {
                // Allows return p & MASK
                return check_p_and_mask(stmR.argument);
            } else if (body.length === 2) {
                const stm0 = body[0];
                if (stm0.tag === "VariableDeclaration") {
                    if (stm0.init === null) return ["uselessdecl"];
                    // Allow int y = p; return y && MASK;
                    if (stm0.init.tag === "Identifier") {
                        return check_p_and_mask(stmR.argument, stm0.id.name);
                    } else {
                        // Allow int y = p & MASK; return y;
                        const local = stm0.id.name;
                        if (stmR.argument.tag !== "Identifier" || stmR.argument.name !== local) return ["tryreturninglocal"];
                        console.log(stmR.argument);
                        return check_p_and_mask(stm0.init);
                    }
                } else if (stm0.tag === "AssignmentStatement") {
                    // Allow p = p & MASK; return p;
                    // Allow p &= MASK; return p;
                    if (stmR.argument.tag !== "Identifier" || stmR.argument.name !== "p") return ["tryreturninglocal"];
                    if (stm0.operator === "=") {
                        return check_p_and_mask(stm0.right);
                    } else if (stm0.operator === "&=") {
                        return check_constant(stm0.right);
                    } else {
                        return ["justand"];
                    }
                } else {
                    return ["toocomplicated"]
                }
            } else if (body.length === 3) {
                // Allows int y; y = p & MASK; return y;
                const [stm0, stm1] = body;
                if (stm0.tag === "VariableDeclaration" && stm0.init === null && stm1.tag === "AssignmentStatement" && stm1.operator === "=" && stm1.left.tag === "Identifier") {
                    if (stmR.argument.tag !== "Identifier" || stmR.argument.name !== stm1.left.name) return ["tryreturninglocal"];
                    return check_p_and_mask(stm1.right);
                }
                return ["toocomplicated"];
            } else {
                return ["toocomplicated"];
            }
        } catch (e) {
            // XXX TODO: should give error message
            return ["syntaxerror"];
        }
    }
}) as any;