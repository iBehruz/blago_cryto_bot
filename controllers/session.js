
const Start = require('../routes/start');
const Msg = require('./msg');
class Session{
    session = {
        // "123456": {
        //   current: new Start();
        // }
       };

       find(){
        return this.session[Msg.get().from.id];
       }
       get(){
        return this.session;
       }

       setCurrent(cr){
        console.log(cr);
        this.session[Msg.get().from.id] = {
          
          current: cr.activate()
        }
      }

       addSession(){
        console.log("--------new session---------");
  
        this.session[Msg.get().from.id] = {
          current: new Start().activate()
        }
  
        console.log(this.session);
        
  
      }




}

module.exports = new Session();