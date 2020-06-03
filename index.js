require('dotenv').config()
const Telegraf=require('telegraf')
const session=require("telegraf/session");
const {data}=require('./js/getData.js')
const bot=new Telegraf(process.env.BOT_TOKEN)
const Markup=require('telegraf/markup')
const {textHandler}=require("./js/textHandler.js")
const {text}=require("./js/text.js")
const {inlineHandler}=require("./js/inlineHandler.js")
const {actionHandler}=require("./js/actionHandler.js")
const {quiz}=require("./js/quiz.js")


const rp = require('request-promise');

var request = require('request');
const Extra=require('telegraf/extra')


bot.use(session());

bot.start(ctx=>
  {
    try{
    const requestOptions = {
      method: 'PUT',
      uri: 'https://api.backendless.com/C7C46BF0-D887-EE41-FFCC-C473E8648400/9579C9DB-155C-4D21-A30D-39190ED05E67/counters/id/increment/get',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
    };
    
    rp(requestOptions).then(response => {
      console.log('API call response:', response);
    }).catch((err) => {
      console.log('API call error:', err.message);
    });
  }catch(e)
  {}
  
  ctx.reply(`Hello ${ctx.from.first_name} , Welcome to the Apti-Quiz Bot.`)
  const keyboard = Extra.markup(markup =>
    markup
    .resize()
    .keyboard([
        markup.contactRequestButton('Access Mobile')
    ])
)
ctx.replyWithMarkdown('Please give mobile number access to continue further.', keyboard)
  })

bot.on('contact',)
bot.help(ctx=>ctx.reply('Here is the complete walk-through about the Bot.\
<b><u>\n\nCommands:</u></b>\n\n\
/start\nWelcome to the Bot !!!\n\n\
/quiz\nTake quizes regularly.\n\n\
',Extra.HTML()))



bot.command('quiz',async ctx=>{
  await quiz(ctx);
});

 bot.on('contact',ctx=>ctx.reply('Thank you..Your id has been validated.Please refer \n/help'))

// bot.command('district',ctx=>ctx.reply('Enter the District name in India for which the count is needed :'))

// bot.command('about',ctx=>ctx.reply('Data Source - <a href="https://api.covid19india.org">https://api.covid19india.org</a>\n\n\
// Developer Contact = <a href="https://t.me/balarp">Bala Srinyvas R P</a>',Extra.HTML().webPreview(false)))


// bot.command('total',ctx=>{
  
//     var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//        var tc=json.cases_time_series[json.cases_time_series.length-1].totalconfirmed;
//        var tr=json.cases_time_series[json.cases_time_series.length-1].totalrecovered;
//        var dc=json.cases_time_series[json.cases_time_series.length-1].dailyconfirmed;
//        var dr=json.cases_time_series[json.cases_time_series.length-1].dailyrecovered;
//        var dt=json.cases_time_series[json.cases_time_series.length-1].dailydeceased;
//        var td=json.cases_time_series[json.cases_time_series.length-1].totaldeceased;
//        var date=json.cases_time_series[json.cases_time_series.length-1].date;
//        ctx.reply(
//         `COVID-19 INDIA updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b> ↗️\nTotal Recovered <b>${tr}</b> ↗️\nToday Confirmed <b>${dc}</b> ↗️\nToday Recovered <b>${dr}</b> ↙️\nToday's Death <b>${dt}</b> ⏺\nTotal Death <b>${td}</b> 🔴\n`,Extra.HTML()
//       )

// }
// )
// })
//       var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
//       var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
//       var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
//       var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
// // bot.command('State',ctx=>{
// //   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
// //       if (err) {
// //         throw err;
// //       }
// //       var r=""
// //       for (i = 1; i <json.statewise.length; i++) {
// //         r += json.statewise[i].state;
// //         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
// //         r+='(+'+json.statewise[i].deltaconfirmed+')'
// //         r+='\n';
// //       }
// //      ctx.reply(
// //      `States Wise Count of Total Confirmed Cases:\n${r}`,Extra.HTML()
// //     )

// // }
// // )
// // })


// bot.command('statewise',ctx=>ctx.reply('Customized Selection',Markup.keyboard([['All States','North Region','South Region'],['East Region','West Region']]).resize().extra()))



// bot.hears('All States',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
//       for (i = 1; i <json.statewise.length; i++) {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//       }
//      ctx.reply(
//      `States Wise Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
//       m=>inline(m))
//     )

// }
// )
// })



// bot.hears('North Region',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
    
//       var q=""
//       var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
//       for (i = 1; i <json.statewise.length; i++) {
//         q = json.statewise[i].state;
//         if(north.includes(q))
//         {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//         }
//       }
//      ctx.reply(
//      `North Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
//       m=>inline1(m))
//     )

// }
// )
// })


// bot.hears('South Region',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
//       var q=""
//       var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
//       for (i = 1; i <json.statewise.length; i++) {
//         q = json.statewise[i].state;
//         if(south.includes(q))
//         {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//         }
//       }
//      ctx.reply(
//      `South  Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
//       m=>inline2(m))
//     )

// }
// )
// })

// bot.hears('East Region',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
//       var q=""
//       var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
//       for (i = 1; i <json.statewise.length; i++) {
//         q = json.statewise[i].state;
//         if(east.includes(q))
//         {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//         }
//       }
//      ctx.reply(
//      `East Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
//       m=>inline3(m)
//      )
//     )

// }
// )
// })

// bot.hears('West Region',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
//       var q=""
//       var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
//       for (i = 1; i <json.statewise.length; i++) {
//         q = json.statewise[i].state;
//         if(west.includes(q))
//         {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//         }
//       }
//      ctx.reply(
//      `West Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
//       m=>inline4(m)
//      )
//     )

// }
// )
// })

// const inline= (m)=>m.inlineKeyboard(
//   [
//   [m.callbackButton('Statewise Detailed List ↗️','Statewise Detailed List ↗️')]
//   ]) 

//   const inline1= (m)=>m.inlineKeyboard(
//     [
//     [m.callbackButton('North Region Detailed List ↗️','North Region Detailed List ↗️')]
//     ]) 

//     const inline2= (m)=>m.inlineKeyboard(
//       [
//       [m.callbackButton('South Region Detailed List ↗️','South Region Detailed List ↗️')]
//       ]) 
   
//       const inline3= (m)=>m.inlineKeyboard(
//         [
//         [m.callbackButton('East Region Detailed List ↗️','East Region Detailed List ↗️')]
//         ]) 

//         const inline4= (m)=>m.inlineKeyboard(
//           [
//           [m.callbackButton('West Region Detailed List ↗️','West Region Detailed List ↗️')]
//           ]) 
           
//           const inline5= (m)=>m.inlineKeyboard(
//             [
//             [m.callbackButton('Disease-wise Precautions','Disease-wise Precautions')]
//             ]) 


//   bot.hears('Active Cases',ctx=>{
      
//        ctx.reply("hello",Extra.HTML()
//       ) 
  
//   })
    
//   bot.action('Disease-wise Precautions',ctx=>
//   ctx.reply
//   ('Safety Tips:Wash your hands regularly.',
//   Markup.keyboard(
//     [
//       ['COVID-19'],
//       ['Tuberculosis'],
//       ['Malaria']
//     ]
//     )
//   .resize().extra()))
   
//   bot.command('Precautions',ctx=>ctx.reply('Customized Selection',Markup.keyboard([
//     ['COVID-19'],
//     ['Tuberculosis'],
//     ['Malaria']
//   ]).resize().extra()))

//   bot.hears('COVID-19',ctx=>{
//        ctx.reply(
//        `South  Count of Total Confirmed Cases:\n`
//       )
//       ctx.replyWithVideo({url:'https://youtu.be/9Ay4u7OYOhA',filename:'COVID-19 mp4'})
  
//   }
//   )

//   bot.hears('Tuberculosis',ctx=>{
//     ctx.reply(
//     `South  Count of Total Confirmed Cases:\n`
//    )
//    ctx.replyWithVideo({url:'https://youtu.be/UKV8Zn7x0wM',filename:'Tuberculosis mp4'})

// }
// )

// bot.hears('Malaria',ctx=>{
//   ctx.reply(
//   `South  Count of Total Confirmed Cases:\n`
//  )
//  ctx.replyWithVideo({url:'https://youtu.be/sETII3rn_Z0',filename:'Malaria mp4'})

// }
// )

//   var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
//   bot.action('Statewise Detailed List ↗️',ctx=>
//   ctx.reply
//   ('Customized Selection',
//   Markup.keyboard(
//     [
//       ['Delhi','Haryana','Himachal Pradesh'],
//       ['Uttar Pradesh','Punjab','Uttarakhand'],
//       ['Puducherry','Lakshadweep','Andhra Pradesh'],
//       ['Telangana','Tamil Nadu','Karnataka','Kerala'],
//       ['Bihar','Jharkhand','Odisha','West Bengal'],
//       ['Assam','Sikkim','Nagaland','Manipur'],
//       ['Mizoram','Tripura','Arunachal Pradesh'],
//       ['Rajasthan','Gujarat','Goa'],
//       ['Ladakh','Daman and Diu','Madhya Pradesh'],
//       ['Jammu and Kashmir','Chandigarh','Maharashtra'],
//       ['Andaman and Nicobar Islands','Meghalaya']
//     ]
//     )
//   .resize().extra()))

//   bot.action('West Region Detailed List ↗️',ctx=>
//   ctx.reply
//   ('Customized Selection',
//   Markup.keyboard(
//     [
//       ['Rajasthan','Gujarat','Maharashtra'],
//       ['Ladakh','Daman and Diu','Madhya Pradesh'],
//       ['Goa']
//     ]
//     )
//   .resize().extra()))


//   bot.action('East Region Detailed List ↗️',ctx=>
//   ctx.reply
//   ('Customized Selection',
//   Markup.keyboard(
//     [

//       ['Bihar','Jharkhand','Odisha'],
//       ['Assam','Sikkim','Nagaland'],
//       ['Mizoram','Meghalaya','Tripura'],
//       ['Manipur','West Bengal','Arunachal Pradesh']
//     ]
//     )
//   .resize().extra()))


//   bot.action('North Region Detailed List ↗️',ctx=>
//   ctx.reply
//   ('Customized Selection',
//   Markup.keyboard(
//     [
//       ['Delhi','Haryana','Jammu and Kashmir'],
//       ['Uttar Pradesh','Punjab','Uttarakhand'],
//       ['Himachal Pradesh',,'Chandigarh']
//     ]
//     )
//   .resize().extra()))


//   bot.action('South Region Detailed List ↗️',ctx=>
//   ctx.reply
//   ('Customized Selection',
//   Markup.keyboard(
//     [
//       ['Andaman and Nicobar Islands','Puducherry'],
//       ['Telangana','Tamil Nadu','Karnataka'],
//       ['Lakshadweep','Kerala','Andhra Pradesh']
//     ]
//     )
//   .resize().extra()))


// //   bot.hears(('Tamil Nadu'),ctx=>{
// //     var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
// //         if (err) {
// //           throw err;
// //         }
// //         for (i = 1; i <json.statewise.length; i++) {
// //          if(json.statewise[i].state=='Tamil Nadu')
// //          {
// //           var ta=json.statewise[i].active;
// //           var tc=json.statewise[i].confirmed;
// //           var dd=json.statewise[i].deaths;
// //           var dr=json.statewise[i].recovered;
// //           var date=json.statewise[i].lastupdatedtime;
// //          }
// //         }

// //        ctx.reply(
// //         `Tamil Nadu updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b> ↗️\nActive Cases <b>${ta}</b> ↗️\nTotal Recovered <b>${dr}</b> ↗️\nTotal Death <b>${dd}</b> 🔴\n`,Extra.HTML()
// //       )

// // }
// // )
// // })




actionHandler(bot);


bot.launch()