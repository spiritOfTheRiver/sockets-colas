const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('ultimo', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
    });


    client.on('atenderTicket', (data, callback) => {
        if ( !data.escritorio ){
            return callback({
                err: true,
                mensaje: 'El escritorio es mnecesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimo(),
            ultimos4: ticketControl.getUltimos4()
        });

    });

});