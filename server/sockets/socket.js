const { io } = require('../server');
const { Users } = require('../classes/user');

const usuario = new Users();


io.on('connection', (client) => {


client.on('entrarChat', (data, callback) => {
    console.log(data);
    if (!data.nombre) {
        return callback({
            error: true,
            mensaje: 'El usuario es necesario'
        });
    }
    let personas = usuario.addPerson(client.id, data.nombre);

    callback(personas);
});





});