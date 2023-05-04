var knex = require("../database/connection");
// const { update } = require("./User");


class Obitos{


    

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
            return undefined; 
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
        await knex.insert({
            ubs,    
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
               return undefined; 
          }
       }
   

//////////////// obitos ////////////////
    async obitos(
        responsavel, 
        ubs,    
        nome,
        nomedamae,
        idade,
        endereco,
        municipioderesidencia,
        sexo,
        prontuario,
        datadoobito,
        localdoobito,
        Causa,){
       try{
        await knex.insert({ubs,
            responsavel,    
            nome,
            nomedamae,
            idade,
            endereco,
            municipioderesidencia,
            sexo,
            prontuario,
            datadoobito,
            localdoobito,
            Causa,}).table("obitos");
            
       }catch(err){
            console.log(err);
            return undefined; 
       }
    }


/////////////////////////////////encontrar formulario/////////////////

     async findFormAll(){
          try{
          var result = await knex.select([
               "responsavel",
               "id",
               "ubs",
               "nome",
               "nomedamae",
               "idade",
               "endereco",
               "municipioderesidencia",
               "sexo",
               "prontuario",
               "datadoobito",
               "localdoobito",
               "Causa"]).table("obitos");
          return result;

          }catch(err){
          console.log(err);
          return [];
          }
     }

     async findFormById(id){
          try{
          var result = await knex.select([
          "responsavel",
          "id",
          "ubs",
          "nome",
          "nomedamae",
          "idade",
          "endereco",
          "municipioderesidencia",
          "sexo",
          "prontuario",
          "datadoobito",
          "localdoobito",
          "Causa"]).where({id:id}).table("obitos");
          
          if(result.length > 0){
               return result[0];
          }else{
               return undefined;
          }

          }catch(err){
          console.log(err);
          return undefined;
          }
     }
///////////////////edtiar formularlio encontraro /////////////////
     async findFormByNome(nome){
          try{
               var result = await knex.select([
                    "responsavel",
                    "id",
                    "ubs",
                    "nome",
                    "nomedamae",
                    "idade",
                    "endereco",
                    "municipioderesidencia",
                    "sexo",
                    "prontuario",
                    "datadoobito",
                    "localdoobito",
                    "Causa"]).where({nome:nome}).table("obitos");

                    if(result.length > 0){
                         return result[0];
                    }else{
                         return undefined;
                    }
     
               }catch(err){
                    console.log(err);
                    return undefined;
               }
     }
   /////////////////////
     async findFormNome(nome){
     try{
         var result = await knex.select("*").table("obitos").where({nome: nome});
         
         if(result.length > 0){
             return true;
         }else{
             return false;
         }

     }catch(err){
         console.log(err);
         return false;
     }
 } 

/////////////////////////


     async updateObitos(
          responsavel,
          id, 
          ubs, 
          nome,
          nomedamae,
          idade, 
          endereco, 
          municipioderesidencia,
          sexo,             
          prontuario,
          datadoobito,
          localdoobito,
          Causa,){

          var obito = await this.findFormById(id);

          if(obito != undefined){

               var editObito = {};

               if(nome != undefined){ 
                    if(nome != obito.nome){
                         var result = await this.findFormNome(nome);
                         if(result == false){
                              editObito.nome = nome;
                         }else{
                              return {status: false,err: "Falecido ja Morreu"}
                         }
                    }
               }

               if(nome != undefined){
                    editObito.nome = nome;
               }
               if(ubs != undefined){
                    editObito.ubs = ubs;
               }
               if(nomedamae != undefined){
                    editObito.nomedamae = nomedamae;
               }
               if(idade != undefined){
                    editObito.idade = idade;
               }
               if(endereco != undefined){
                    editObito.endereco = endereco;
               }
               if(municipioderesidencia != undefined){
                    editObito.municipioderesidencia = municipioderesidencia;
               }
               if(sexo != undefined){
                    editObito.sexo = sexo;
               }
               if(prontuario != undefined){
                    editObito.prontuario = prontuario;
               }
               if(datadoobito != undefined){
                    editObito.datadoobito = datadoobito;
               }
               if(localdoobito != undefined){
                    editObito.localdoobito = localdoobito;
               }
               if(Causa != undefined){
                    editObito.Causa = Causa;
               }
               if(responsavel != undefined){
                    editObito.Causa = responsavel;
               }
               try{
                    await knex.update(editObito).where({id: id}).table("obitos");
                    return {status: true}
               }catch(err){
                    return {status: false,err: err}
               }
          
          }else{
          return {status: false,err: "O Formulario Não EXISTE"}
          }
     } 

     async deleteObito(id){
          var user = await this.findFormById(id);
          if(user != undefined){
  
              try{
                  await knex.delete().where({id: id}).table("obitos");
                  return {status: true}
              }catch(err){
                  return {status: false,err: err}
              }
          
          }else{
              return {status: false,err: "O usuário não existe, portanto não pode ser deletado."}
          }
  
          
      } 
}

module.exports = new Obitos();
