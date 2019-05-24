class Channel {
    constructor(io, title) {
        this.title = title
        this.id = require('uniqid')(this.title)
        this.io = io        
        this.users = [] // Chaque channel va gÃ©rer sa propre liste d'utilisateurs
        this.message = [];
    }

    addMessage(user, room, message) {}

    pushUser(user) {}

    removeUser(user) {}
    
    getUsersList() {}

    destroy() {}
}

module.exports = Channel