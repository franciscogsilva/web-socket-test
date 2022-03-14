require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );

        this.middlewares();

        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routes() {}

    sockets() {
        this.io.on( "connection", socketController );
    }

    run() {
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port} ...`);
            console.log('CORS-enabled ...');
            console.log('Listening ...');
        });
    }
}

module.exports = Server;