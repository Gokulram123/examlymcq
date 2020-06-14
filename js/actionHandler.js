const {actions1}=require("./quiz1.js");
const {actions}=require("./quiz.js");
module.exports.actionHandler =bot => {
    bot.action([/answer[0-3]/,/next/,/quit/,/SOLUTION/,/no/],ctx =>{
         actions(ctx,ctx.match[0]);
    })
    bot.action([/answers[0-3]/,/Next/,/Quit/,/solution/,/Next1/],ctx =>{
         actions1(ctx,ctx.match[0]);
    })
}
