const fd = require('fs');

class Tickets {

    constructor(numero, escritorio){
        this.numero=numero;
        this.escritorio=escritorio;
    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarContro();
        }
    }

    siguiente() {
        this.ultimo++;
        const ticket = new Tickets(this.ultimo,null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    getUltimo() {
        return `Ticket ${ this.ultimo }`;
    }


    getUltimos4() {
        return this.ultimos4;
    }


    atenderTicket( escritorio ) {
        if ( this.tickets.length === 0 ){
            return 'No hay tickets';
        } 
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        
        const atenderTicket = new Tickets(numeroTicket,escritorio);
        this.ultimos4.unshift( atenderTicket );
        if ( this.ultimos4.length >4 ) {
            this.ultimos4.splice(-1,1);
        }
        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarContro() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado');
    }

    grabarArchivo() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        const jsonDataString = JSON.stringify(jsonData);
        fd.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}