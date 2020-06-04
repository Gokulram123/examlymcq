const {actions1}=require("./quiz1.js");
module.exports.actionHandler =bot => {
    bot.action([/answer[0-3]/,/next/,/quit/,/SOLUTION/],ctx =>{
         actions1(ctx,ctx.match[0]);
    })
}
