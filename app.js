
const bot = require('./index');
const Msg = require('./controllers/msg');
const Session = require('./controllers/session.js');
const Start = require('./routes/start');




class App {
   available_cr = [];

   constructor(){
      bot.on('message', async (msg, metadata)=>{
        Msg.set(msg, metadata);

        console.clear();

            if( Session.find() == null || msg.text == "/start"){
              Session.addSession(new Start());
              return;
            }

            let cr = Session.find()
            .current.handleMsg();

            if(cr != false){
             
            }else{
              this.unknownMsg();
            }
      });
      console.log("Bot is running...");
      return this;
   }

   unknownMsg(){
    bot.sendMessage(Msg.get().chat.id, "unknown command");
   }




   sendMsg(){

   }

}




module.exports = App;