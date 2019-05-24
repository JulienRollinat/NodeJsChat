const Connector = require('./connector.js');

module.exports = function(io) {
    
    const ConnexionObject = new Connector(io);    
        
    io.on('connection', (socket) => {             
        
          ConnexionObject.connect(socket);
    })

    

}
  
