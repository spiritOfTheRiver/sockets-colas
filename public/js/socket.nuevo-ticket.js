

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexión con el servidor');
});

socket.on('ultimo', function( resp ) {
    console.log(resp.actual);
    label.text(resp.actual);
});

$('button').on('click', function () {
    socket.emit('siguienteTicket', null,
        function(siguienteTicket) {
            console.log(siguienteTicket);
            label.text(siguienteTicket);
        });
   
});



