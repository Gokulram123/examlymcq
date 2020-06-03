// var request = require('request');
// const Extra=require('telegraf/extra')
// module.exports.textHandler=bot=>{
//     bot.on('text',ctx=>
//     {
//         var data=request({url: 'https://api.covid19india.org/state_district_wise.json', json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//         var arr=["Andaman and Nicobar Islands"];
//         let msg=ctx.message.text
//         try{
//         for(i=0;i<arr.length;i++)
//         {
//                 try{
//                 var q=json[arr[i]].districtData[msg].active;
//                 var q1=json[arr[i]].districtData[msg].confirmed;
//                 var q2=json[arr[i]].districtData[msg].recovered;
//                 var q3=json[arr[i]].districtData[msg].deceased;
//                 console.log(json[arr[i]].districtData[msg].active);
//                 }
//                 catch(e)
//                 {}
//         }
//         if(q!=undefined)
//         ctx.reply(`Total Cases=<b>${q1}</b>\nActive Cases=<b>${q}</b>\nTotal Recovered=<b>${q2}</b>\nTotal Death=<b>${q3}</b>\n`,Extra.HTML()) 
//     }
//     catch(e)
//     {
//         console.log(e);
//     }  
//             }
//         )
//         }
//     )}

