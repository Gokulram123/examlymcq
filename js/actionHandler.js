const {actions}=require("./quiz.js");
module.exports.actionHandler =bot => {
    bot.action([/answer[0-3]/,/next/,/quit/,/SOLUTION/],ctx =>{
         actions(ctx,ctx.match[0]);
    })
}