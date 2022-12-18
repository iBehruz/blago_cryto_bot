
const Start = require('../routes/start');
const Msg = require('./msg');
class Session{
    session = {
        // "123456": {
        //   current: new Start();
        // }
       };

       get user(){
        return this.session[Msg.get().from.id];
       }

       set user(value){
        this.session[Msg.get().from.id] = value;
       }

       setData(data){
        this.user.data = Object.assign(this.user.data, data);
       }
 
       getData(){
          return this.user.data;
       }

       find(){
        return this.user;
       }
       get(){
        return this.session;
       }

       setCurrent(cr){
      //  console.log(cr);
        this.user = {
          data: null,
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