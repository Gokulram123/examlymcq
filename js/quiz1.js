const Extra=require('telegraf/extra');
const fs=require("fs");
const rp = require('request-promise');

module.exports.quiz1 =async ctx =>{
    var today = new Date();
    var time = today;
    ctx.session.time1=time;
    ctx.session.totaltime1=time;
    // if(ctx.message.chat.type !='private')
    // {
    //     ctx.reply('Quiz available in private chat -> @aptitudequizbot')
    // }
    // else
    //{
        let question = await newQuestion1(ctx);
        let logo=question.quest
        let msg=logo
        return ctx.replyWithHTML(msg,
            Extra.markup( m=>m.inlineKeyboard(keyboard1(m,1,question.options))))
    //}
}
module.exports.actions1 = async(ctx,actionName) =>
{
    let res;
    const re=/answers[0-3]/g;
    if(actionName.match(re)) {
        answerNum=actionName[actionName.length-1];
        const question = ctx.session.question;
        //console.log(answerNum);
        var today = new Date();
        var today1 =ctx.session.time1;
        var diff =(today.getTime() - today1.getTime()) / 1000;
        diff /= 60;
        diff+="";
      var di=diff.split('\.');
        var r=di[1].slice(0,2);
        r/=2;
        if(r>='60')
          r='58';
        if(question.correct == answerNum)
        {
            res=`Yay!Thats Correct\n!Answer : ${question.options[question.correct]}\nTime Taken is :${di[0]} mins and ${r} seconds.Usual time taken is ${question.avgtime}`;
            ctx.session.score++;
            var r=ctx.session.start1%3;
          if(r==0)
            {
              ctx.session.start1++;
            }
          else if(r==1)
            {
             ctx.session.start1++;
            }
          else if(r==2)
            {
              ctx.session.start1++;
            }
        }
        else
        {
            res=`Oh No..It's Wrong!\nCorrect answer :${question.options[question.correct]}\nTime Taken is :${di[0]} mins and ${r} seconds.Usual time taken is ${question.avgtime}`;
            ctx.session.start1++;
        }
        ctx.editMessageText(res,Extra.markup( m=>m.inlineKeyboard(keyboard1(m,2))))
    }
    else if(actionName=='Next' && ctx.session.start1<11)
    {      
        var today=new Date();
        ctx.session.time1=today;
        let question = await newQuestion1(ctx);
        let logo=question.quest;
        let msg=logo;
        ctx.editMessageText(msg,
            Extra.HTML().markup( m=>m.inlineKeyboard(keyboard1(m,1,question.options))))
    }else if(actionName=='Quit' || ctx.session.start1>=11)
    {
        console.log(ctx.session.contact);
        var today = new Date();
        var today1 =ctx.session.totaltime1;
        var diff =(today.getTime() - today1.getTime()) / 1000;
        diff /= 60;
        diff+="";
      var di=diff.split('\.');
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
      uri: 'https://motley-cut-calf.glitch.me/api/details/',
      headers: {
        'Content-Type': 'application/json'
      },
      body:{
        'Name':ctx.from.first_name,
        'Phone_Number':ctx.session.contact,
        'Total_Score':ctx.session.score,
        'Time_Consumed':`${di[0]}mins and ${r}secs`
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
    else if(actionName=='solution')
    {
        let video=ctx.session.question.answers[ctx.session.start1].video;
        ctx.reply(`<a href="${video}">Here is the solution video</a>`,
            Extra.HTML().markup( m=>m.inlineKeyboard(keyboard1(m,3))))
    }
}

const keyboard1=(m,step,answers)=>{
       if(step===1)
       {
       return [
           [m.callbackButton(answers[0],'answers0'),m.callbackButton(answers[1],'answers1')],
           [m.callbackButton(answers[2],'answers2'),m.callbackButton(answers[3],'answers3')]
       ]
    }else if(step===2)
    {
    return [
        [m.callbackButton('NEXT','Next')],
        [m.callbackButton('QUIT','Quit')],
        [m.callbackButton('SOLUTION','solution')]
    ]
 }
  else if(step==3)
    {
      return [
        [m.callbackButton('NEXT','Next')],
        [m.callbackButton('QUIT','Quit')]
    ]
}
}

const newQuestion1=async ctx => {
    ctx.session.start1=ctx.session.start1 || 0;
    let w=ctx.session.start1;
    const filePath1='./average.json';
    const coins=await readFile1(filePath1);
    const question ={
        answers :[],
        correct :'',
        url:'',
        quest:'',
        options:[],
        avgtime:''
    }
    question.answers=randomAnswers1(coins,4);
    console.log(question.answers);
    question.options=question.answers[w].options;
    //console.log(question.answers[w].ques);
    question.correct=question.answers[w].ans;
    question.url=question.answers[w].video;
    question.quest=question.answers[w].ques;
    question.avgtime=question.answers[w].avgtime;
    console.log(ctx.from);
    if(w>=4)
    w=0;
    ctx.session.question=question;
    //ctx.session.start1++;
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
const randomAnswers1=(coins,answersQuantity)=>{
    const answers=[];
    const tmpArr=[];
    let a=0;
    while(tmpArr.length<=answersQuantity)
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

const readFile1 =filePath1 =>{
    try{
      let rawData=fs.readFileSync(filePath1);
      return JSON.parse(rawData);
    }catch(err)
    {
        console.log(err);
    }
}
