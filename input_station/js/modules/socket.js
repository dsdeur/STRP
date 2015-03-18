function Socket(url, messageHandler) {
    var self = this;
    this.url = url;
    this.messageHandlers
    this.socket = null;
    this.isopen = false;

    // Connects te socket
    this.connect = function() {
        log('Trying to connect socket on: ' + this.url);

        this.socket = new WebSocket(this.url);
        this.socket.binary = 'arraybuffer';

        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
    };

    this.onOpen = function() {
        log('Socket connection established');

        this.isopen = true;
    };

    // Try reconnecting the socket if connection is closed
    this.onClose = function(e) {
        log('Socket connection closed');

        this.isopen = false;

        // Poll for socket connection
        setTimeout(function() {
            self.connect();
        }, 3*1000);
    };

    // Processes incoming messages and call message handler
    this.onMessage = function(e) {
        if(!messageHandlers) {
            return;
        }

        // Call the message handler and pass the data
        messageHandler(data);
    }

    // Sends messages to server
    this.sendMessage = function(message, data) {
        if(!this.isopen) {
            log("Cannot send message, not connected");
            return;
        }

        // Create JSON string from message and data
        console.log(JSON.stringify(data));
        this.socket.send(JSON.stringify(data));
    }

    this.sendTextMessage = function(message) {
        if(!this.isopen) {
            log("Cannot send message, not connected");
            return;
        }

        this.socket.send(message);
    }

    function log(message) {
        console.log('%c ' + message, 'background: #222; color: #bada55');
    }

    this.connect();
}
