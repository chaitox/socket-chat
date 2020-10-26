var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre  y la sala es necesario');
}

var usuario = {
    nombre : params.get('nombre'),
    sala : params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('quiero los usuarios conectados', resp);
        
    })
    //escuchar cambios de usuario


});

socket.on('listaPersona', function(mensaje){
    console.log('Lista',mensaje);
});

socket.on('crearMensaje', function(mensaje){
    console.log(mensaje);
});

// escuchar
socket.on('disconnect', function() {
    socket.on('crearMensaje', function(mensaje){
        console.log(mensaje);
    });
    console.log('Perdimos conexión con el servidor');

});

//MENSJES PRIVADOS
socket.on('mensajePrivado', function(mensaje){
    console.log('mensajePrivado', mensaje);
});
