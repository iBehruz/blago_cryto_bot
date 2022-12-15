class Msg {
    
    msg = null;
    metadata = null;

    getType(){
 
    }
    getMeta(){
        return this.metadata;
    }
    get(){
        return this.msg;
    }

    set(msg, metadata){
        this.msg = msg;
        this.metadata = metadata;
    }
}

module.exports = new Msg();