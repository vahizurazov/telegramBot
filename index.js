const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '1342899936:AAHFYBdwzuCh8TFU8daECkIj8GpFmD9JMT4';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'Выберите какая валюта вас интересует', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '€ - EUR',
            callback_data: 'EUR'
          }, {
            text: '$ - USD',
            callback_data: 'USD'
          }, {
            text: '₽ - RUR',
            callback_data: 'RUR'
          }, {
            text: '₿ - BTC',
            callback_data: 'BTC'
          }
        ]
      ]
    }
  });
});

bot.on('callback_query', query => {
  const id = query.message.chat.id;

  request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {
    const data = JSON.parse(body);
    const result = data.filter(item => item.ccy === query.data)[0];
    const flag = {
      'EUR': '🇪🇺',
      'USD': '🇺🇸',
      'RUR': '🇷🇺',
      'UAH': '🇺🇦',
      'BTC': '₿'
    }
    let md = `
      *${flag[result.ccy]} ${result.ccy} 💱 ${result.base_ccy} ${flag[result.base_ccy]}*
      Buy: _${result.buy}_
      Sale: _${result.sale}_
    `;
    bot.sendMessage(id, md, {parse_mode: 'Markdown'});
    // bot.sendPhoto(chatId,'./assets/image/Без названия.jpg');
  })
})



// bot.onText(/\/echo (.+)/, (msg, match) => {
// console.log('MASSAGE',msg)
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   bot.sendMessage(chatId, resp);
// });

// bot.on('message', (msg,) => {
//   const chatId = msg.chat.id;
//   console.log('MASSAGE',msg)
//   if(msg.text === 's'){
//     console.log('===========>>>>>>> SSSSSSSSSS', chatId);
//    return newText(chatId)
//   }
//   bot.sendMessage(chatId, 'Первое сообщение на любой текст');
// });

// newText = (chatId) => {
//   console.log("======>>>>chatId",chatId);
//   bot.sendMessage(chatId,'Trying method');
//   bot.sendPhoto(chatId,'./assets/image/Без названия.jpg');
// }
 





// document.querySelector('button').onclick = function () {
//     let message = document.querySelector('.swing').value;
//     var token = '1342899936:AAHFYBdwzuCh8TFU8daECkIj8GpFmD9JMT4';
//     const url = 'https://api.telegram.org/bot'+token+'/sendMessage?chat_id=451378467&text=';
//     let xhttp = new XMLHttpRequest();
//     xhttp.open("GET", url+message,true);
//     xhttp.send()
// }
// // https://api.telegram.org/bot1342899936:AAHFYBdwzuCh8TFU8daECkIj8GpFmD9JMT4/getUpdates
// // https://api.telegram.org/bot1342899936:AAHFYBdwzuCh8TFU8daECkIj8GpFmD9JMT4/sendMessage?chat_id=451378467&text=hi_i_am_ROBOT


