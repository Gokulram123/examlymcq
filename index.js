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
const {quiz1}=require("./js/quiz1.js")

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
  
  ctx.reply(`Hello ${ctx.from.first_name} , Welcome to the Coding-MCQ Bot.`)
  const keyboard = Extra.markup(markup =>
    markup
    .resize()
    .keyboard([
        markup.contactRequestButton('Access Mobile')
    ])
)
ctx.replyWithMarkdown('Please give mobile number access to continue further.', keyboard)
  })

bot.help(ctx=>ctx.reply('Here is the complete walk-through about the Bot.\
<b><u>\n\nCommands:</u></b>\n\n\
/start\nWelcome to the Bot !!!\n\n\
/set1\nPractice questions on Set-1\n\n\
/set2\nPractice questions on Set-2\n\n\
',Extra.HTML()))



bot.command('quiz',async ctx=>{
  await quiz(ctx);
});

 bot.on('contact',ctx=>
        {
   ctx.session.contact=ctx.message.contact.phone_number;
   console.log(ctx.session.contact);
   ctx.reply('Thank you.Your id has been validated.\nHere is the list of courses offered.<b><u>\n\nCommands:</u></b>\n\n/start\nWelcome to the Bot !!!\n\n/set1\nPractice questions on Set-1\n\n/set2\nPractice questions on Set-2\n\n',Extra.HTML());
 })

bot.command('set1',async ctx=>
            {
  ctx.reply(
     `Happy Learning.Would you like to watch the foundation video for begineer MCQ's or wish to directly jump into the practice questions part?`,Extra.HTML().markup(m=>inline7(m)));
  //await quiz(ctx);
})

bot.command('set2',async ctx=>
            {
  ctx.reply(
     `Happy Learning.Would you like to watch the foundation video for begineer MCQ's or wish to directly jump into the practice questions part?`,Extra.HTML().markup(m=>inline9(m)));
})



const inline7= (m)=>m.inlineKeyboard(
  [
  [m.callbackButton('Foundation Video','Foundation Video')],[m.callbackButton('Take Test','Take Test')]
  ]) 

const inline8= (m)=>m.inlineKeyboard(
  [
  [m.callbackButton('Take Test','Take Test')]
  ]) 


const inline9= (m)=>m.inlineKeyboard(
  [
  [m.callbackButton('Foundation Video ↗️','Foundation Video ↗️')],[m.callbackButton('Take Test ↗️','Take Test ↗️')]
  ]) 

const inline10= (m)=>m.inlineKeyboard(
  [
 [m.callbackButton('Take Test ↗️','Take Test ↗️')]
  ]) 


  bot.action('Foundation Video',ctx=>
             {
   let video='https://www.youtube.com/watch?v=aqHhpahguVY';
        ctx.editMessageText(`<a href="${video}">https://www.youtube.com/watch?v=aqHhpahguVY</a>`,
            Extra.HTML().webPreview(false).markup(m=>inline8(m)))
  });

bot.action('Foundation Video ↗️',ctx=>
             {
   let video='https://www.youtube.com/watch?v=aqHhpahguVY'; 
  
ctx.editMessageText(`<a href="${video}">https://www.youtube.com/watch?v=aqHhpahguVY</a>`,
            Extra.HTML().markup(m=>inline10(m)))
});
 
bot.action('Take Test',async ctx=>
             {
   await quiz(ctx);
  });


bot.action('Take Test ↗️',async ctx=>
             {
   await quiz1(ctx);
  });







actionHandler(bot);
textHandler(bot);
bot.launch()
