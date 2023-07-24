const express = require('express');
const jade = require('jade');
const socket = require('socket.io');
const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);


app.get('/', function(req, res) {
    res.render('page_chat');
});

//Static file
app.use(express.static(__dirname + '/public'));

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});

const io = socket(server);

io.sockets.on('connection', function(socket) {
    //Emit message 
    socket.emit('message', { message: 'Welcome to the chat' });
    //Socket to listen on send 
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});
