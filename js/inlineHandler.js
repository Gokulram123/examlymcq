
// var request = require('request');
// module.exports.inlineHandler=bot =>{
//     bot.on('inline_query',ctx=>
//     {
//         let msg=ctx.inlineQuery.inlineQuery
//         console.log(msg);
//         ctx.answerInlineQuery(resultConstructor(ctx))
//     }
//     )
// }

// const resultConstructor = ctx =>
// {

//     var queryCoin;
//     var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//         let msg=ctx.inlineQuery.query;
//         let msg1=msg.toLowerCase();
//         let msg2=msg1.split(" ").join("");
//         let name=msg1.charAt(0).toUpperCase()+msg1.slice(1);
//         var flag=false;
//         for (i = 1; i <json.statewise.length; i++) 
//         {
//             let temp=(JSON.stringify((json.statewise[i].state)).split(" ").join("").toLowerCase());
//             temp=temp.replace(/\"/g,"");
//             if(json.statewise[i].state==msg || json.statewise[i].state==name || temp==msg2)
//             {
//                 var ta=json.statewise[i].active;
//                 var tc=json.statewise[i].confirmed;
//                 var dd=json.statewise[i].deaths;
//                 var dr=json.statewise[i].recovered;
//                 var dc=json.statewise[i].deltaconfirmed;
//                 var dd1=json.statewise[i].deltadeaths;
//                 var dr1=json.statewise[i].deltarecovered;
//                 var date=json.statewise[i].lastupdatedtime;
//                 flag=true;
//                 if(dc!=0 && dc!='0')
//                 {
//                 // ctx.reply(
//                 //     `${json.statewise[i].state} updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b>(+${dc})↗️\nActive Cases <b>${ta}</b> ↗️\nTotal Recovered <b>${dr}</b> (+${dr1})↗️\nTotal Death <b>${dd}</b> (+${dd1}) 🔴\n`,Extra.HTML()
//                 //   )
//                 queryCoin=tc
//                 }
//                 else
//                 {
//                     // ctx.reply(
//                     //     `${json.statewise[i].state} updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b>(+${dc})↔️\nActive Cases <b>${ta}</b> ↗️\nTotal Recovered <b>${dr}</b> (+${dr1})↗️\nTotal Death <b>${dd}</b> (+${dd1}) 🔴\n`,Extra.HTML()
//                     //   )
//                     queryCoin=tc
//                 }
//             }

//         }
//         if(flag==false)
//         {
//             var data=request({url: 'https://api.covid19india.org/state_district_wise.json', json: true}, function(err, res, json) {
//                 if (err) {
//                   throw err;
//                 }
//                 var arr=["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh",
//                 "Chhattisgarh","Delhi","Dadra and Nagar Haveli and Daman and Diu","Goa", "Gujarat","Himachal Pradesh",
//                 "Haryana","Jharkhand","Jammu and Kashmir","Karnataka","Kerala",
//                 "Ladakh","Maharashtra","Meghalaya","Manipur","Madhya Pradesh","Mizoram","Odisha",
//                 "Punjab","Puducherry","Rajasthan","Telangana","Tamil Nadu","Tripura","Uttar Pradesh",
//                 "Uttarakhand","West Bengal"];
//                 let msg2=ctx.inlineQuery.query
//                 let msg1=msg2.toLowerCase();
//                 let msg=msg1.charAt(0).toUpperCase()+msg1.slice(1);
//                 let msg3=msg.split(" ").join("");
//                 var msg4 = msg2.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
//                 console.log(msg4);
//                 try{
//                 for(i=0;i<arr.length;i++)
//                 {
//                         try{
//                         var q=json[arr[i]].districtData[msg].active;
//                         var q1=json[arr[i]].districtData[msg].confirmed;
//                         var q2=json[arr[i]].districtData[msg].recovered;
//                         var q3=json[arr[i]].districtData[msg].deceased;
//                         var q4=json[arr[i]].districtData[msg].delta.confirmed;
//                         var q21=json[arr[i]].districtData[msg].delta.recovered;
//                         var q31=json[arr[i]].districtData[msg].delta.deceased;
//                         console.log(json[arr[i]].districtData[msg].active);
//                         }
//                         catch(e)
//                         {}
//                         try{
//                             var q=json[arr[i]].districtData[msg3].active;
//                             var q1=json[arr[i]].districtData[msg3].confirmed;
//                             var q2=json[arr[i]].districtData[msg3].recovered;
//                             var q3=json[arr[i]].districtData[msg3].deceased;
//                             var q4=json[arr[i]].districtData[msg3].delta.confirmed;
//                             var q21=json[arr[i]].districtData[msg3].delta.recovered;
//                             var q31=json[arr[i]].districtData[msg3].delta.deceased;
//                             console.log(json[arr[i]].districtData[msg3].active);
//                             }
//                             catch(e)
//                             {}
//                             try{
//                                 var q=json[arr[i]].districtData[msg4].active;
//                                 var q1=json[arr[i]].districtData[msg4].confirmed;
//                                 var q2=json[arr[i]].districtData[msg4].recovered;
//                                 var q3=json[arr[i]].districtData[msg4].deceased;
//                                 var q4=json[arr[i]].districtData[msg4].delta.confirmed;
//                                 var q21=json[arr[i]].districtData[msg4].delta.recovered;
//                             var q31=json[arr[i]].districtData[msg4].delta.deceased;
//                                 console.log(json[arr[i]].districtData[msg4].active);
//                                 }
//                                 catch(e)
//                                 {}
//                                 try{
//                                     var q=json[arr[i]].districtData[msg2].active;
//                                     var q1=json[arr[i]].districtData[msg2].confirmed;
//                                     var q2=json[arr[i]].districtData[msg2].recovered;
//                                     var q3=json[arr[i]].districtData[msg2].deceased;
//                                     var q4=json[arr[i]].districtData[msg2].delta.confirmed;
//                                     var q21=json[arr[i]].districtData[msg2].delta.recovered;
//                                     var q31=json[arr[i]].districtData[msg2].delta.deceased;
//                                     console.log(json[arr[i]].districtData[msg2].active);
//                                     }
//                                     catch(e)
//                                     {}
//                 }
//                 if(q!=undefined)
//                 {
//                 if(q4!=0 && q4!='0')
//                 {
//                 // ctx.reply(`${msg1} COVID DETAILS=\nTotal Cases=<b>${q1}</b>(+${q4}) ↗️\nActive Cases=<b>${q}</b> ↗️\nTotal Recovered=<b>${q2}</b>(+${q21}) ↗️\nTotal Death=<b>${q3}</b>(+${q31})🔴\n`,Extra.HTML())
//                 queryCoin=q1; 
//                 }
//                 else
//                 {
//                     // ctx.reply(`${msg1} COVID DETAILS=\nTotal Cases=<b>${q1}</b>(+${q4}) ↔️\nActive Cases=<b>${q}</b> ↗️\nTotal Recovered=<b>${q2}</b> (+${q21})↗️\nTotal Death=<b>${q3}</b> (+${q31})🔴\n`,Extra.HTML()) 
//                     queryCoin=q1;
//                 }
//                 flag=true;
//             }
//             }
//             catch(e)
//             {
//                 console.log(e);
//             }
//             if(flag==false)
//             {
//                 let msg=ctx.inlineQuery.query
//                 var data=request({url: `https://covid19.mathdro.id/api/countries/${msg}/confirmed`, json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//         try
//         {
//             var name=json[0].countryRegion;
//             var tc=json[0].confirmed;
//             var ac=json[0].active;
//             var tr=json[0].recovered;
//             var td=json[0].deaths;
//         }   
//         catch(e)
//         {
            
//         }
        
//         if(name!=undefined)
//         {
//             // ctx.reply(`${msg1} COVID DETAILS of ${name}\nTotal Cases=<b>${tc}</b> ↗️\nActive Cases=<b>${ac}</b> ↗️\nTotal Recovered=<b>${tr}</b> ↗️\nTotal Death=<b>${td}</b> 🔴\n`,Extra.HTML()) 
//             queryCoin=tc;
//             flag=true;
//         }
//    }

//                 )}
//             })
                
//         }
//     })

//     if(queryCoin==undefined)
//     {
//         queryCoin='No results found.Try Again';
//     }
//     var img='https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg';
//     let result =[
//         {
//         type : 'article',
//         id : Math.random().toString(),
//         title:`Total Cases=${queryCoin}`,
//         description:'Data of Cases',
//         thumb_url :`${img}`,
//         input_message_content:{
//             message_text:`Total Cases=${queryCoin}`,
//             parse_mode:'HTML'
//         }
//         }
//     ]
    
// }