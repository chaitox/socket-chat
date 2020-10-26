class Users{
    constructor(){
        this.personas = []
    }

    addPerson(id, nombre, sala){
        let persona = {id, nombre, sala}
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        let person = this.personas.filter( persona =>{
            return persona.id === id;
        } )[0];
        return person;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonaPorSala( sala ){
        let personaEnSala = this.personas.filter( persona =>{
            return persona.sala === sala;
        });
        return personaEnSala;
    }

    borrarPersona(id){
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(personas=>{
            return personas.id != id;
        });

        return personaBorrada;
    }
}

module.exports = {
    Users
}