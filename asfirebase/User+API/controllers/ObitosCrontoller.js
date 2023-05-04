// var Ssa2 = require("../models/User");
var obitos = require("../models/obitos");
const { default: knex } = require("knex");

class ObitosCrontoller
{   

    async create(req, res){
        var {           
        ubs,
        nome,
        criancasMenor6Meses,
        criancaAme,
        criancas2Anos,
        gestantes,
        gestantesAte20Anos,
        familias,
        familiasAcompanhada} = req.body;
       
        
        if(ubs == undefined || ubs == '' || ubs == ' '){
                
            res.status(400);                    
            res.json({err: "Ubs Precisa ser preenchida"});                
            return;

        }
     
        await obitos.new(
            ubs,
            nome,
            criancasMenor6Meses,
            criancaAme,
            criancas2Anos,
            gestantes,
            gestantesAte20Anos,
            familias,
            familiasAcompanhada);
            

        res.status(200);
        res.send("Formulario de Ssa2 Registrado com Sucesso");
        console.log(req.body);
        // res.status(406);
        // res.send(result.err)
    }
    
    async createVivos(req, res){
        var {       
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
            localdeparto,} = req.body;
       
        
            if(ubs == undefined || ubs == '' || ubs == ' '){
                
                res.status(400);                    
                res.json({err: "Ubs Precisa ser preenchida"});                
                return;

            }
        
        await obitos.nasviv(
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
            localdeparto,);
            

        res.status(200);
        res.send("Formulario de Nascidos Vivos Registrado com Sucesso");
        console.log(req.body);
        // res.status(406);
        // res.send(result.err)
    }



///////////////////////////////////////////





async createObitos(req, res){
        var {     
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
            Causa,} = req.body;
       
                     
            if(ubs == undefined || ubs == '' || ubs == ' '){
                
                res.status(400);                    
                res.json({err: "Ubs Precisa ser preenchida"});                
                return;

            }
     
        await obitos.obitos(
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
            Causa,);
            

        res.status(200);
        res.send("Formulario de Obitos Preenchido com Sucesso");
    
    
        // res.status(406);
        // res.send(result.err)
    }

    async indexForm(req, res){
        var formulario = await obitos.findFormAll();
        res.json(formulario);
    }

    async findForm(req, res){
        var id = req.params.id;
        var formulario = await obitos.findFormById(id);
        if(formulario == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(formulario);
        }
    }
    async editForm(req, res){
        var {
            id,
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
            Causa} = req.body;
        var result = await obitos.updateObitos(
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
            Causa);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK! editado");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }
    async removeForm(req, res){
        var id = req.params.id;

        var result = await obitos.deleteObito(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

}


module.exports = new ObitosCrontoller();