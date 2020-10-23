class Users{
    constructor(){
        this.personas = []
    }

    addPerson(id, nombre){
        let persona = {id, nombre}
        this.personas.push(persona);
        return this.personas;
    }

    gerPersona(id){
        let person = this.personas.filter( persona =>{
            return persona.id === id;
        } )[0];
        return person;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonaPorSala( sala ){

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