const {actions1}=require("./quiz1.js");
const {actions}=require("./quiz.js");
module.exports.actionHandler =bot => {
    bot.action([/answer[0-3]/,/next/,/quit/,/SOLUTION/],ctx =>{
         actions(ctx,ctx.match[0]);
    })
    bot.action([/answers[0-3]/,/Next/,/Quit/,/SOLUTIO/],ctx =>{
         actions1(ctx,ctx.match[0]);
    })
}
