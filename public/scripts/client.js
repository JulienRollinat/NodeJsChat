import Chat from './chat.js'

var NewUser = new Chat.Users();
var ChatData = new Chat.Data();
var AncienChannel;

var socket = io.connect("http://127.0.0.1:9000");

socket.on("channelsList", function(channels){
  $('#channels').empty();

    for (var i = 0; i < channels.length; i++){      
      $('#channels').append("<input class='button' id='" + channels[i] + "'" + " value='" + channels[i] + "'</input>"); 
    }   
})

$('form').submit(function(e){
    e.preventDefault();   

    //Envoi de la donnée pour ChannelData
    var ChannelName = $('#ChanelName span').text();    
    var Utilisateur = $('#name').val();
    var Texte = $('#message').val();
    
    var Message = Utilisateur  + " : " + Texte;

    console.log(Message);

    socket.emit("channelData", ChannelName, AncienChannel, Message);  


    //Envoi de la donnée pour l'User
         
    ChatData.emit('chatmessage', ChatData);    
    /*ChatData.username = $('#name').val();
    ChatData.message = $('#message').val();*/   
    $('#message').val(''); 

    return false;
});

$('#message').keyup(function(e){
    e.preventDefault();  
    var UserName = $('#name').val();
    ChatData.emitTyping(UserName);
});

socket.on('Messages', function(TouslesMessages){
    console.log(TouslesMessages);
    if(TouslesMessages.length == 0){
      TouslesMessages[0] = "Aucun";
    }

    $('#chat-messages').empty(); 
    for (var i = 0; i < TouslesMessages.length; i++){
      $('#chat-messages').prepend($('<li>').text(TouslesMessages[i]));
    }      
});

socket.on('ListingOfUsers', function(ListingOfUsers,ChannelName){
    var length = ListingOfUsers.length; 
     console.log(ListingOfUsers); 

    var ActuelleChannel = $('#ChanelName span').text();

    if(ChannelName == ActuelleChannel ){

      $('#User-list').empty();  

      if(ListingOfUsers.length == 0){
        ListingOfUsers[0] = "Aucun";
      }

      for(var i = 0; i <ListingOfUsers.length; i++){
        $('#User-list').append($('<li>').html(ListingOfUsers[i] + " <i class='fas fa-circle' style='color:#00FF7F'></i>"));
      } 

    }
    
});

socket.on("typing", function(UserName){
  $('#typing').html(UserName + " écrit " + "<i class='fas fa-pencil-alt'></i> " + " ...");
  setTimeout("$('#typing').empty();", 1000);
})

$("#channels").click(function(e) {
  e.preventDefault();
   
  AncienChannel = $('#ChanelName span').text(SelectedChannel);
  AncienChannel = AncienChannel.text();
  console.log("Ancien Channel => " + AncienChannel);  
  var SelectedChannel = e.target.value;
  console.log("Nouveau Channel => " + SelectedChannel);
  $('#ChanelName span').text(SelectedChannel);  
  //$('section.hero').removeClass('.is-success').addClass('.is-warning');

  if(SelectedChannel == "Développement"){

    $(".hero").removeClass().addClass("hero is-warning");
    $(".button").removeClass().addClass("button is-warning");
  }

  if(SelectedChannel == "Graphisme"){

    $(".hero").removeClass().addClass("hero is-primary");
    $(".button").removeClass().addClass("button is-primary");
  }

  if(SelectedChannel == "Générale"){

    $(".hero").removeClass().addClass("hero is-success");
    $(".button").removeClass().addClass("button is-success");
  }

  socket.emit("MajDataChannel", SelectedChannel);
  
  var ActuelleChannel = $('#ChanelName span').text();
  var Utilisateur = $('#name').val();
  socket.emit("MajUsers", ActuelleChannel, AncienChannel, Utilisateur); 
});

setTimeout(function(){   

  var ActuelleChannel = $('#ChanelName span').text();
  
  var Utilisateur = $('#name').val();
  
  socket.emit("MajUsers", ActuelleChannel, AncienChannel, Utilisateur); 

},1000);


