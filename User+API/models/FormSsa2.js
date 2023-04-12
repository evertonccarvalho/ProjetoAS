var knex = require("../database/connection");


class FormSsa2{


    

    async new(ubs,
        nome,
        criancasMenor6Meses,
        criancaAme,
        criancas2Anos,
        gestantes,
        gestantesAte20Anos,
        familias,
        familiasAcompanhada){
       try{
        await knex.insert({ubs,
            nome,
            criancasMenor6Meses,
            criancaAme,
            criancas2Anos,
            gestantes,
            gestantesAte20Anos,
            familias,
            familiasAcompanhada}).table("ssa2");
       }catch(err){
            console.log(err);
       } 
       
    }

    //vivos

    async nasviv(ubs,    
        nome,
        nomedamae,
        idade,
        endereco,
        municipioderesidencia,
        sexo,
        peso,
        datadenascimento,
        tipodeparto,
        localdeparto,){
       try{
        await knex.insert({ubs,    
            nome,
            nomedamae,
            idade,
            endereco,
            municipioderesidencia,
            sexo,
            peso,
            datadenascimento,
            tipodeparto,
            localdeparto,}).table("nascidosvivos");
       }catch(err){
            console.log(err);
       } 
       
    }

    async obitos(ubs,    
        nome,
        nomedamae,
        idade,
        endereco,
        municipioderesidencia,
        sexo,
        peso,
        datadenascimento,
        tipodeparto,
        localdeparto,){
       try{
        await knex.insert({ubs,    
            nome,
            nomedamae,
            idade,
            endereco,
            municipioderesidencia,
            sexo,
            peso,
            datadenascimento,
            tipodeparto,
            localdeparto,}).table("obitos");
       }catch(err){
            console.log(err);
       }
    }

}
module.exports = new FormSsa2();
