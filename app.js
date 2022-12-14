
const Start = require('./routes/start');
const bot = require('./index');

class App {
   session = {
    // "123456": {
    //   current: new Start();
    // }
   };

    msg = null;
    metadata = null;

    setCurrent(cr){
      console.log(cr);
      this.session[this.msg.from.id] = {
        
        current: cr.sendMsg(this.msg, this.metadata)
      }
    }

    addSession(){
      console.log("--------new session---------");

      this.session[this.msg.from.id] = {
        current: new Start().sendMsg(this.msg, this.metadata)
      }

      console.log(this.session);
      

    }

    
   available_cr = [];


   constructor(){

      bot.on('message', async (msg, metadata)=>{
        this.msg = msg;
        this.metadata = metadata;
        console.clear();

            if( this.session[this.msg.from.id] == null || msg.text == "/start"){
              this.addSession();
              return;
            }

            let cr = this.session[this.msg.from.id]
            .current.handleMsg(this.msg, this.metadata);

            if(cr != false){
              this.setCurrent(cr);
            }else{
              this.unknownMsg();
            }
      });
      console.log("Bot is running...");
      return this;
   }

   unknownMsg(){
    bot.sendMessage(this.msg.chat.id, "unknown command");
   }



   sendMsg(){

   }

}




module.exports = App;