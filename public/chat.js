window.onload = function() {
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var msg = document.getElementById('msg');
    var sendButton = document.getElementById('send');
    var chat = document.getElementById('chat');
    var name = document.getElementById('name');

    //Socket to listen on message
    socket.on('message', function(data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            chat.innerHTML = html;
            chat.scrollTop = chat.scrollHeight;
        }else {
            console.log('Error :', data);
        }
    });

    //Event send message
    sendButton.onclick = function() {
        if(name.value == '') {
            alert('Please type your name!');
        }else {
            var nextMsg = msg.value;
            socket.emit('send', { message: nextMsg, username: name.value });
            msg.value = '';
        }
    };

    //Event : enter key
    msg.addEventListener('keypress',function(event) {
        if(event.key == 'Enter') {
            sendButton.onclick();
        }
    });
};