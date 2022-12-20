
const Buy = require('./buy/buy');
const Base = require('./base');
const Session = require('../controllers/session.js');
const Msg = require('../controllers/msg');

const {
  InverseClient,
  LinearClient,
  InverseFuturesClient,
  SpotClient,
  SpotClientV3,
  UnifiedMarginClient,
  USDCOptionClient,
  USDCPerpetualClient,
  AccountAssetClient,
  CopyTradingClient,
} = require('bybit-api');


const API_KEY = 'OejfLONASTklYPaEeS';
const API_SECRET = 'aFOqqk5XXfn0xarOT3LNXlNCgDGaurlMNf7a';
const useTestnet = false;
const wallet_address = '0x47bc67b59281e4bb9dacc07ab3809d1f33bd4659';

const client = new SpotClientV3({
  key: API_KEY,
  secret: API_SECRET,
  testnet: useTestnet,
});

const clientAsset= new AccountAssetClient({
  key: API_KEY,
  secret: API_SECRET,
  testnet: useTestnet,
});

class Start extends Base{
   static tx = '/start';

   text = `Приветствую ${Msg.get().from.first_name}!
   У тебя большой обмен?!
   Тогда ты по адресу...
   
   Ваш текущий бонус: 0 сум
   Ваше количество успешных сделок: 0
   Команды /start /course /echo /help`;

   options = {
    reply_markup: {
      // selective: true,
      // one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: [
        [{text: Buy.tx}, {text: "Мой Баланс"}],
        [{text: "🟢 Мои активные сделки"}],
        [{text: "🔢 Калькулятор"}],
        [{text: "👥 Рефералка"}, {text: "Перевод LTC"}],
        [{text: "📘 Контакты"}, {text: "📭 Оставить отзыв"}],
      ],
    }};


    available_cr = {
      "BUY": new Buy()
    };

    constructor(){
      super();
      this.init();
    }
    handleMsg(){

      if(Msg.get().text == Base.backCrText && this.backCr != null){
        return  Session.setCurrent(this.backCr);
      }

      if(Msg.get().text == "Мой Баланс"){
          Msg.sendText("TEst");
          client.getBalances().then((res)=>{
            console.log("WALLET BALANCE");
            res.result.balances.forEach(element => {
              Msg.sendText(element.coin + " - "+ element.total);
            });
          console.log();
        });
      }

      if(Msg.get().text == "Перевод LTC"){
        clientAsset.submitWithdrawal({
          address: wallet_address, 
            chain: "BEP20", 
            amount: "10"
          }).then((res)=>{
          console.log("submitWithdrawal");
          console.log(res);
        });
      }




      return true;
    }

}

  module.exports = Start;
