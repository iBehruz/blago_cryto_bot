const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5803547277:AAGYmA7WjcyB_W6Pna60CWe10uqVPE0ORDo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

module.exports = bot;

const App = require('./app');

runApp();

function runApp(){
    new App();
}




