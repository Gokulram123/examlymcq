const Extra=require('telegraf/extra');
const fs=require("fs");
const rp = require('request-promise');

module.exports.quiz =async ctx =>{
    var today = new Date();
    var time = today;
    ctx.session.time1=time;
    // if(ctx.message.chat.type !='private')
    // {
    //     ctx.reply('Quiz available in private chat -> @aptitudequizbot')
    // }
    // else
    //{
        let question = await newQuestion(ctx);
        let logo=question.quest
        let msg=logo
        return ctx.replyWithHTML(msg,
            Extra.markup( m=>m.inlineKeyboard(keyboard(m,1,question.options))))
    //}
}
module.exports.actions =async(ctx,actionName) =>
{
    let res;
    const re=/answer[0-3]/g;
    if(actionName.match(re)) {
        answerNum=actionName[actionName.length-1];
        const question = ctx.session.question;
        //console.log(answerNum);
        if(question.correct == answerNum)
        {
            res=`Yay!Thats Correct\n!Answer : ${question.options[question.correct]}`
            ctx.session.score++;
            try{
                const requestOptions = {
                  method: 'PUT',
                  uri: `https://api.backendless.com/C7C46BF0-D887-EE41-FFCC-C473E8648400/9579C9DB-155C-4D21-A30D-39190ED05E67/counters/${ctx.from.first_name}/increment/get`,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  json: true,
                };
                
                rp(requestOptions).then(response => {
                  //console.log('API call response:', response);
                }).catch((err) => {
                  //console.log('API call error:', err.message);
                });
              }catch(e)
              {}

              try{
                const requestOptions = {
                  method: 'PUT',
                  uri: `https://api.backendless.com/C7C46BF0-D887-EE41-FFCC-C473E8648400/9579C9DB-155C-4D21-A30D-39190ED05E67/counters/${ctx.from.first_name}c/increment/get`,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  json: true,
                };
                
                rp(requestOptions).then(response => {
                  //console.log('API call response:', response);
                }).catch((err) => {
                  //console.log('API call error:', err.message);
                });
              }catch(e)
              {}
        }
        else
        {
            try{
                const requestOptions = {
                  method: 'PUT',
                  uri: `https://api.backendless.com/C7C46BF0-D887-EE41-FFCC-C473E8648400/9579C9DB-155C-4D21-A30D-39190ED05E67/counters/${ctx.from.first_name}/increment/get`,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  json: true,
                };
                
                rp(requestOptions).then(response => {
                  //console.log('API call response:', response);
                }).catch((err) => {
                  //console.log('API call error:', err.message);
                });
              }catch(e)
              {
                  console.log(e);
              }
            res=`Oh No..It's Wrong!\nCorrect answer :${question.options[question.correct]}`
        }
        ctx.editMessageText(res,Extra.markup( m=>m.inlineKeyboard(keyboard(m,2))))
    }
    else if(actionName=='next' && ctx.session.start!=4)
    {      
        let question = await newQuestion(ctx);
        let logo=question.quest;
        let msg=logo;
        ctx.editMessageText(msg,
            Extra.HTML().markup( m=>m.inlineKeyboard(keyboard(m,1,question.options))))
    }else if(actionName=='quit' || ctx.session.start>=4)
    {
        console.log(ctx.session.contact);
        var today = new Date();
        var today1 =ctx.session.time1;
        var diff =(today.getTime() - today1.getTime()) / 1000;
        diff /= 60;
        diff+="";
      var di=diff.split('\.');
        ctx.session.start++;
        var r=di[1].slice(0,2);
        if(r>='60')
          r='58';
        console.log(di);
        let msg=`<b>Nice!\nFinal Score:${ctx.session.score}/4\nTime Consumed is:${di[0]}mins and ${r}secs.</b>`;
        console.log(ctx.from.first_name+ctx.session.score);
        ctx.editMessageText(msg,
            Extra.HTML())
      
          try{
    const requestOptions = {
      method: 'POST',
      uri: 'https://balarp.glitch.me/api/details/',
      headers: {
        'Content-Type': 'application/json'
      },
      body:{
        'Name':ctx.from.first_name,
        'Phone_Number':ctx.session.contact,
        'Total_Score':ctx.session.score,
        'Time_Consumed':`${di[0]}mins and ${r}secs`,
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

      
      
      
            ctx.session=null;
    }
    else if(actionName=='SOLUTION')
    {
        let video=ctx.session.question.answers[ctx.session.start].video;
        ctx.reply(video,
            Extra.HTML().markup( m=>m.inlineKeyboard(keyboard(m,2))))
    }
}

const keyboard=(m,step,answers)=>{
       if(step===1)
       {
       return [
           [m.callbackButton(answers[0],'answer0'),m.callbackButton(answers[1],'answer1')],
           [m.callbackButton(answers[2],'answer2'),m.callbackButton(answers[3],'answer3')]
       ]
    }else if(step===2)
    {
    return [
        [m.callbackButton('NEXT','next')],
        [m.callbackButton('QUIT','quit')],
        [m.callbackButton('SOLUTION','SOLUTION')]
    ]
 }
}

const newQuestion=async ctx => {
    ctx.session.start=ctx.session.start || 0;
    let w=ctx.session.start;
    const filePath='./coins.json';
    const coins=await readFile(filePath);
    const question ={
        answers :[],
        correct :'',
        url:'',
        quest:'',
        options:[]
    }
    question.answers=randomAnswers(coins,4);
    question.options=question.answers[w].options;
    //console.log(question.answers[w].ques);
    question.correct=question.answers[w].ans;
    question.url=question.answers[w].video;
    question.quest=question.answers[w].ques;

    //console.log(question);
    if(w>=4)
    w=0;
    ctx.session.question=question;
    ctx.session.start++;
    ctx.session.score=ctx.session.score || 0;
//     try{
//     const requestOptions = {
//       method: 'POST',
//       uri: 'https://balarp.glitch.me/api/details/',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body:{
//         'Patient_name':'Super'
//       },
//       json: true,
//     };
      
//     rp(requestOptions).then(response => {
//       console.log('API call response:', response);
//     }).catch((err) => {
//       console.log('API call error:', err.message);
//     });
//   }catch(e)
//   {}
    return question
}
const randomAnswers=(coins,answersQuantity)=>{
    const answers=[];
    const tmpArr=[];
    let a=0;
    while(tmpArr.length<answersQuantity)
    {
        if(tmpArr.indexOf(a)===-1)
        {
            tmpArr.push(a);
            answers.push(coins[a]);
            a++;
        }
    }
    //console.log(answers);
    return answers;
}

const readFile =filePath =>{
    try{
      let rawData=fs.readFileSync(filePath);
      return JSON.parse(rawData);
    }catch(err)
    {
        console.log(err);
    }
}
