const lineByLine = require('n-readlines'); 
var aeronaves = []


const pilotosTxt = new lineByLine('./src/assets/pilotos.txt');
class ServicoPilotos{
    recupera(matricula){
        let line;
        let lineNumber = 1;
        let piloto = {}

        while (line = pilotosTxt.next()){
            if (lineNumber  > 1 ) {
                var results=line.toString('ascii').split(',');
                if (results[0] == matricula){
                    piloto = {
                    "matricula": results[0],
                    "nome": results[1],
                    "habilitacao": Boolean(results[2])
                    }; 
                }   
            }
            lineNumber++;
        } 
        console.log(piloto);
        return piloto

    }
    todos(){
        let line;
        let lineNumber = 1;
        let pilotos = [];
        
        while (line = pilotosTxt.next()) {
            if (lineNumber  > 1 ) {
                var results=line.toString('ascii').split(',');
                var piloto={
                    "matricula": results[0],
                    "nome": results[1],
                    "habilitacao": Boolean(results[2])};
                pilotos.push(piloto);  
            }
            lineNumber++;
        }
        
        return pilotos
    }

}
var sp = new ServicoPilotos();
//var allPilotos = sp.todos();
//var firstPiloto = sp.recupera(2);


 
const aeroviasTxt = new lineByLine('./src/assets/aerovias.txt');

class ServicoAerovia{
    
    recupera(origem, destino) {
        //console.log("Iniciando a função com origem:", origem, "e destino:", destino);
    
        // Inicialização de variáveis
        let line;
        let lineNumber = 1;
        let aerovias = [];
    
        // Loop para ler cada linha do arquivo de aerovias
        while (line = aeroviasTxt.next()) {
            //console.log("Lendo linha:", line);
    
            // Separar os dados da linha por vírgula
            var results = line.toString('ascii').split(',');
    
            // Verificar se a linha não é a primeira (cabeçalho)
            if (lineNumber > 1) {
                // Verificar se a origem ou o destino coincidem com os parâmetros
                if (results[1] == origem || results[2] == destino) {
                    //console.log("Encontrada aerovia:", results[0]);
    
                    // Criar um objeto "aerovia" com os dados relevantes
                    var aerovia = {
                        "id": results[0],
                        "origem": results[1],
                        "destino": results[2],
                        "tamanho": Number(results[3])
                    };
                    // Adicionar a aerovia ao array "aerovias"
                    aerovias.push(aerovia);
                }
            }
            // Incrementar o número da linha
            lineNumber++;
        }
    
        //console.log("Aerovias lidas:", aerovias);
    
        // Verificar se há mais de 3 aerovias possíveis
        if (aerovias.length > 3) {
            ///console.log("Há mais de 3 aerovias possíveis.");
    
            // Filtrar aerovias de partida e chegada
            var aeroviasPartida = aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino !== destino);
            var aeroviasChegada = aerovias.filter(aerovia => aerovia.destino === destino && aerovia.origem !== origem);
    
            //console.log("Aerovias de partida:", aeroviasPartida);
            //console.log("Aerovias de chegada:", aeroviasChegada);
    
            // Inicialização de variáveis para encontrar a melhor aerovia
            let melhorAerovia = null;
            let menorTamanhoTotal = Infinity;
    
            // Loop para encontrar a melhor combinação de aerovias
            aeroviasPartida.forEach(aeroviaPartida => {
                //console.log("Analisando aerovia de partida:", aeroviaPartida);
    
                aeroviasChegada.forEach(aeroviaChegada => {
                    //console.log("Verificando aerovia de chegada:", aeroviaChegada);
    
                    if (aeroviaPartida.destino === aeroviaChegada.origem) {
                        //console.log("Conexão encontrada!");
    
                        const tamanhoTotal = aeroviaPartida.tamanho + aeroviaChegada.tamanho;
    
                        //console.log("Tamanho total:", tamanhoTotal);
    
                        if (tamanhoTotal < menorTamanhoTotal) {
                            menorTamanhoTotal = tamanhoTotal;
                            //console.log("Menor tamanho total atualizado para:", menorTamanhoTotal);
    
                            melhorAerovia = [aeroviaPartida, aeroviaChegada];
                            //console.log("Melhor aerovia atualizada:", melhorAerovia);
                        }
                    }
                });
            });
    
            //console.log("Melhor combinação de aerovias:", melhorAerovia);
            //console.log("Menor tamanho total:", menorTamanhoTotal);
    
            // Retornar a melhor combinação de aerovias
            return melhorAerovia;
        } else {
            // Se há menos de 3 aerovias, retornar as aerovias diretas
            //console.log("Menos de 3 aerovias possíveis, retornando aerovias diretas.");
            return aerovias.filter(aerovia => aerovia.origem == origem && aerovia.destino === destino);
        }
    }
}

class ServicoAeronaves{

}


class Aeronave{
    constructor(object, prefixo, velocidadeCruzeiro, autonomia){
        
        var objAeronave = {
            ...object,
            prefixo:prefixo,
            velocidadeCruzeiro:velocidadeCruzeiro,
            autonomia:autonomia
        }
        aeronaves.push(objAeronave)

       
        
    }
}

class AeronaveParticular extends Aeronave{
    constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao){
    super(prefixo, velocidadeCruzeiro, autonomia)
    this.respManutencao = respManutencao

    }
}

class AeronaveComercial {
    constructor(object,nomeCia){
        
        var obj={...object,nomeCia:nomeCia};
        var tipo = object['pesoMax'] === undefined ? 'aeronave_passageiros' : 'aeronave_carga'
        new Aeronave(obj,tipo, 800, 2000) 
    }
}


class AeronaveCarga{
    constructor(pesoMax){
        var objt = {pesoMax:pesoMax}
        new AeronaveComercial(objt, 'azul')
    }
}

class AeronavePassageiros{
    constructor(maxPas){
        var object  = {maxPassageiros:maxPas}
        new AeronaveComercial(object,'latam')
        
        
    }
}

//console.log("qual o numero máximo de passageiros?")
//process.stdin.on('readable', ()=>{ 
    // reads what is being typed. 
    //let variable = process.stdin.read(""); 
    // trying to read 
    //variable = variable.toString().replace(/\n/, ""); 
    //variable = variable.replace(/\r/, ""); 

    //new AeronavePassageiros(Number(variable))
//});

var aerocarga = new AeronaveCarga(5000)

console.log(aeronaves);

class PlanoDeVoo {
    constructor(id, matricPiloto, idAerovia, data, horario, altitude, slots) {
        this.id = id;
        this.matricPiloto = matricPiloto;
        this.idAerovia = idAerovia;
        this.data = data;
        this.horario = horario;
        this.altitude = altitude;
        this.slots = slots;
        this.cancelado = false;
    }

    cancelar() {
        this.cancelado = true;
    }
}

// Exemplo de uso: Plano de Voo
/*const plano1 = new PlanoDeVoo("123", "P123", "POA-FLO", "2023-08-15", "14:00", 30000, [15, 16]);
console.log(plano1); // Exibe as informações do plano de voo

const plano2 = new PlanoDeVoo("2", "3", "POA-FLO", "2023-08-15", "14:00", 30000, [15, 16]);
console.log(plano2);// Exibe as informações do plano de voo
plano1.cancelar();

console.log(plano1.cancelado); 
console.log(plano2.cancelado); // teste de atualizacao. */


// teste de atualizacao. 


// teste de atualizacao. 

class Menu {
    listarAerovias(){
        const lists = new ServicoAerovia()
        console.log(lists.recupera('flo','gru'))
    }
    
}
var mn= new Menu();
//mn.listarAerovias();














