const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5803547277:AAGYmA7WjcyB_W6Pna60CWe10uqVPE0ORDo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const session = {
  "12356454": {
    "availeable_commands": [],
    "availeable_routes": [],
    "current": "start"
  }
};

const routes = {
  "start": {text: "/start", back: null},
  "buy": { text: "Купить криптовалюту", back: "start"},
  "sell": { text: "Продать криптовалюту", back: "start"},
  "active_orders": { text: "Активные сделки", back: "start"},
  "colculator": { text: "Калкулятор", back: "start"},
  "referal": { text: "Рефералка", back: "start"},
  "promocodes": { text: "Промокоды", back: "start"},
  "contacts": { text: "Контакты", back: "start"},
  "feadback":{ text: "Оставить отзыв", back: "start"},
  "LTC": {text: "BUY_LTC", back: "buy"},
  "enter_LTC": {text: "ENTER_LTC", back: "buy"},
}


bot.onText(/ /, async function (msg)  {
  
  let text = ".!", options = {};



  switch(msg.data){
    case "start":
        options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "LTC",
                  callback_data: "BUYLTC"
                }
              ]
            ]
          }, parse_mode: 'Markdown'
        };
      break;
    case "buy":

      break;
    case "sell":

      break;
    default:

      break
  }
  
  
  
  
  bot.sendMessage(msg.chat.id, text, options);
   
 
});

function onCallbackQuery(){

}

function initRoute(route){
  session["12356454"].availeable_routes = [];
  session["12356454"].current = route;
  for(let el in routes){
     if(routes[el].back == route){
        session["12356454"].availeable_routes.push(el);
     }
  }
}
//callback_query,  onText, message

runApp();



function start(msg, match){
  
  const chatId = msg.chat.id;
  console.clear();
  console.log(msg);
  let md = `Приветствую ${msg.from.first_name}!
  У тебя большой обмен?!
  Тогда ты по адресу...
  
  Ваш текущий бонус: 0 сум
  Ваше количество успешных сделок: 0
  Команды /start /course /echo /help`;

  bot.sendMessage(chatId, md, {
    reply_markup: {
      // selective: true,
      // one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: [
        [{text: "💵 Купить криптовалюту"}, {text: "🥇 Продать криптовалюту"}],
        [{text: "🟢 Мои активные сделки"}],
        [{text: "🔢 Калькулятор"}],
        [{text: "👥 Рефералка"}, {text: "🎁 Промокоды"}],
        [{text: "📘 Контакты"}, {text: "📭 Оставить отзыв"}],
      ],
    }})
}




function runApp() {
  bot.setMyCommands(
    [
      {command: '/start', description: "Начальное приветствие"},
      {command: '/course', description: "Узнать курс валют"},
    ]
  );
  
  bot.onText(/\/start/, (msg, match) => {
    start(msg, match);
  });
  bot.onText(/❌ Отменить покупку/, (msg, match) => {
    start(msg, match);
  });
  
  bot.onText(/💵 Купить криптовалюту/, (msg, match) => {
    const chatId = msg.chat.id;

    let md2 = `Выберите криптовалюту`;

    bot.sendMessage(chatId, md2, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "LTC",
              callback_data: "BUYLTC"
            }
          ]
        ]
      }, parse_mode: 'Markdown'
    },);
   
  });


  
  bot.on('message', (msg, match)=>{
    console.clear();
    console.log(msg,match);
  })
  
  bot.on('callback_query', msg=>{
  
    console.log(msg, msg.message.chat.id);
   // bot.deleteMessage(chat_id, message_id);


  //   let chat_id = msg.chat.id;
  //   let message_id = msg.message_id;
  if(msg.data == 'BUYLTC'){
    bot.deleteMessage(msg.message.chat.id, msg.message.message_id); //then delete
    let text = "Ведите сумму LTC, которую хотите купить по курсу 76$ ~ 951600 сум \n минимальная сумма - 0,17 LTC";
    bot.sendMessage(msg.message.chat.id, text,
    {
      reply_markup: {
        // selective: true,
        // one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: [
          [{text: "❌ Отменить покупку"}],
        ],
      }});


  }
    
    //console.log(msg.data);


    // bot.editMessageReplyMarkup({
    //         inline_keyboard: [
    //             [
    //               {
    //                 text: "<- Назад",
    //                 callback_data: "BACK"
    //             },
    //                 {
    //                     text: "LTC",
    //                     callback_data: "LTC"
    //                 }
    //             ],
    //         ]
      // }, {
      //   chat_id: msg.from.id, 
      //   message_id: msg.message.message_id
      // });
  
    
  })

  

  console.log("app is running...");
 return true;
}





module.exports = bot;
