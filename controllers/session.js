
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
        this.session[Msg.get().from.id] = {
          data: null,
          current: cr
        }
        cr.onShow();
        Msg.sendMsg(cr.text, cr.options);
      }

       addSession(cr){
        console.log("--------new session---------");
  
        this.session[Msg.get().from.id] = {
          current: cr
        };
        Msg.sendMsg(cr.text, cr.options);
  
        console.log(this.session);
      }





}

module.exports = new Session();