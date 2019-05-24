
class Users {
    constructor() {    
      this.name = []; // Liste des utilisateurs    
    }
  }
  
  class Data {      
    constructor() {
      this.socket = io.connect("http://127.0.0.1:9000");
      this.username ;
      this.message = []; // Liste des utilisateurs    
    }
    emit(){
     this.socket.emit('chatmessage',{
          message : this.message,
          pseudo: this.username
        });
        
        $('#message').val(''); 
        return false;        
    }
    
    emitTyping(UserName){
      this.socket.emit("typing", UserName);
      return false;
    }    
  }
  
  export default {Users, Data};
