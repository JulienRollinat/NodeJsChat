const chalk = require('chalk');
const Channel = require('./channel.js');

class Connector{

    constructor(io) {
        this.io = io;
        this.ListUsers = [];
        this.Channels = [new Channel(io, "Générale"), new Channel(io, "Graphisme"), new Channel(io, "Développement")];   
      }      

    connect(socket){
        socket.on('chatmessage', (Chatdata) => {            
            console.log(chalk.green('Bien reçu !')); 
            
            socket.broadcast.emit('chatmessage', Chatdata);      
            socket.emit('chatmessage', Chatdata);
            
        });
        
        this.io.sockets.emit("channelsList", this.Channels.map(channel => {return channel.title}));        

        socket.on('typing', (UserName) => {
            this.io.sockets.emit("typing", UserName);
        });        

        socket.on("channelData", (ChannelName, AncienChannel, Message ) => {           
            console.log("Le nom de la chaîne est " + ChannelName );           
            
            for (var i = 0; i < this.Channels.length; i++){

                if(this.Channels[i].title == ChannelName){
                    
                    var IndexChannelEnCours = i;
                    
                }               
            }

            //Gestion des Messages            
            this.Channels[IndexChannelEnCours].message.push(Message);            
            this.io.sockets.emit('Messages', this.Channels[IndexChannelEnCours].message);                          
                        
        });

        socket.on('MajDataChannel', (SelectedChannel) => {
            console.log("Channel en cours =>" + SelectedChannel)

            for (var i = 0; i < this.Channels.length; i++){

                if(this.Channels[i].title == SelectedChannel){
                    
                    var IndexChannelEnCours = i;
                    
                }               
            }

            this.io.sockets.emit('Messages', this.Channels[IndexChannelEnCours].message);                  
            
        });       
        

        socket.on("MajUsers", (ChannelName, AncienChannel, Utilisateur) => {

            // Chargement des nouveaux utilsateurs dans la channel en cours
        for (var i = 0; i < this.Channels.length; i++){

            if(this.Channels[i].title == ChannelName){
                
                var IndexChannelEnCours = i;
                
            }               
        }        

         //Suppression de l'ancien utilisateur dans l'ancien channel
         if(ChannelName != AncienChannel && AncienChannel != undefined){

            for (var i = 0; i < this.Channels.length; i++){

                if(this.Channels[i].title == AncienChannel){
                    
                    var IndexAncienChannel = i;
                    
                }               
            }

            if(Utilisateur != undefined){

                var i = this.Channels[IndexAncienChannel].users.indexOf(Utilisateur);
                    if(i != -1) {
                        this.Channels[IndexAncienChannel].users.splice(i, 1);
                    }
                                    
                console.log("Ancienne channel après suppression ==> " + this.Channels[IndexAncienChannel].users);
            }  

            var UsersList = this.Channels[IndexAncienChannel].users;

        }  

        //Gestion des Users
        console.log("User en cours est " + Utilisateur);
        //this.Channels[IndexChannelEnCours].users = [];
        this.Channels[IndexChannelEnCours].users.push(Utilisateur);          
        var DistinctUsers = [...new Set(this.Channels[IndexChannelEnCours].users)];
        this.Channels[IndexChannelEnCours].users = DistinctUsers;            
        console.log("Nouvelle channel après ajout ==> " + this.Channels[IndexChannelEnCours].users);
        
        if(UsersList == undefined){

            this.io.sockets.emit('ListingOfUsers', [], ChannelName);
        }
        else{

            this.io.sockets.emit('ListingOfUsers', this.Channels[IndexAncienChannel].users, ChannelName);
        }

        this.io.sockets.emit('ListingOfUsers', this.Channels[IndexChannelEnCours].users, ChannelName);   
            
    });
    

    }    

}

module.exports = Connector