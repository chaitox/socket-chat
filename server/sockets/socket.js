const { io } = require('../server');
const { Users } = require('../classes/user');
const { crearMensaje } = require('../util/util')

const usuario = new Users();


io.on('connection', (client) => {


client.on('entrarChat', (data, callback) => {
    console.log(data);
    if (!data.nombre ||!data.sala) {
        return callback({
            error: true,
            mensaje: 'El usuario/sala es necesario'
        });
    }

    client.join(data.sala);
    usuario.addPerson(client.id, data.nombre, data.sala);

    client.broadcast.to(data.sala).emit('listaPersona',usuario.getPersonaPorSala(data.sala) );
    callback(usuario.getPersonaPorSala(data.sala));
});

client.on('crearMensaje', (data)=>{
    let persona = usuario.getPersona(client.id)
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
});



    client.on('disconnect', ()=>{
        let personaBorrada = usuario.borrarPersona( client.id );
        client.broadcast.emit('crearMensaje',
        crearMensaje('administrador', `${personaBorrada} se ha desconectado`));
        client.broadcast.emit('listaPersona',usuario.getPersonaPorSala(personaBorrada.sala) );
    });


        //mensaje privado
    client.on('mensajePrivado', (data)=>{
        let persona = usuario.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});