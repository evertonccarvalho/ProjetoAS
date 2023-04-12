// var Ssa2 = require("../models/User");
var FormSsa2 = require("../models/FormSsa2");
const { default: knex } = require("knex");

class FormsController
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
       
        
        if(ubs == undefined ){
            res.status(400);            
            res.send("preencha UBS");
            return;

        }
     
        await FormSsa2.new(
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
        res.send("pegando formulario ssa2");
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
       
        
        if(ubs == undefined ){
            res.status(400);            
            res.send("preencha UBS");
            return;

        }
     
        await FormSsa2.nasviv(
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
        res.send("pegando formulario Nascidos Vivos");
        console.log(req.body);
        // res.status(406);
        // res.send(result.err)
    }
    async createObitos(req, res){
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
       
        
        if(ubs == undefined ){
            res.status(400);            
            res.send("preencha UBS");
            return;

        }
     
        await FormSsa2.obitos(
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
        res.send("pegando formulario obitos");
        console.log(req.body);
        // res.status(406);
        // res.send(result.err)
    }
}


module.exports = new FormsController();