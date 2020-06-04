const {actions1}=require("./quiz1.js");
module.exports.actionHandler1 =bot => {
    bot.action([/answer[0-3]/,/Next/,/Quit/,/SOLUTION/],ctx =>{
         actions1(ctx,ctx.match[0]);
    })
}
