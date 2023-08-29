const lineByLine = require('n-readlines');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
const question = (str) => new Promise(resolve => rl.question(str, resolve));

var aeronaves = []
var tdaltitudes = [25000,26000,27000,28000,29000,30000,31000,32000,33000,34000,35000]


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
                    "habilitacao": results[2] == 'false' ? false : true
                    }; 
                }   
            }
            lineNumber++;
        } 
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

//const servicoPilotos = new ServicoPilotos();
//const pil = servicoPilotos.todos();
//console.log(pil);


const aeroviasTxt = new lineByLine('./src/assets/aerovias.txt');

class ServicoAerovia{
    recuperaID(id){
        let line;
        let lineNumber = 1;
        let aerovias = {};
        while (line = aeroviasTxt.next()) {
            var results = line.toString('ascii').split(',');
            if (lineNumber > 1) {
                
                if (results[0] == id) {
                    
                    var aerovia = {
                        "id": results[0],
                        "origem": results[1],
                        "destino": results[2],
                        "tamanho": Number(results[3])
                    };
                    return aerovia
                }
            }
            lineNumber++;
        }

    }
    
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
    todas(){
       console.log(aeronaves)
        return aeronaves
    }
}

class Aeronave{
    constructor( object, prefixo, velocidadeCruzeiro, autonomia){
        
        var objAeronave = {
            ...object,
            prefixo:prefixo,
            velocidadeCruzeiro:velocidadeCruzeiro,
            autonomia:autonomia
        }
        aeronaves.push(objAeronave) 
        console.log(aeronaves)
        
    }
}


class AeronaveParticular{
    constructor(respManutencao){
             
        var ob = {respManutencao:respManutencao}
        var uni = 'aeronave_particular'
        new Aeronave(ob, uni, vlc, aut)

    }
    async partVel(){
        var velocicru = await question("Qual a velocidade de cruzeiro da aeronave? ", function(answer) {
            return answer
            });
            return velocicru
    }

    async partAutonomia(){
        var autonomia_part = await question("Qual a autonomia da aeronave? ", function(answer) {
            return answer
            });
            return autonomia_part
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
 
/*var aeropassageiros = new AeronavePassageiros(400);

var aerocarga = new AeronaveCarga(5000);

var part = new AeronaveParticular('manSul');
var allaero = new ServicoAeronaves();
var td = allaero.todas();*/




// Exemplo de uso: Plano de Voo
//const plano1 = new PlanoDeVoo("1", "2", "POA-FLO", "2023-08-15", "14:00", 25000, [14, 15]);
//console.log(plano1); // Exibe as informações do plano de voo

//const plano2 = new PlanoDeVoo("2", "3", "POA-GRU", "2023-08-28", "18:00", 29000, [18, 19]);
//console.log(plano2);// Exibe as informações do plano de voo

//const plano3 = new PlanoDeVoo("3", "1", "CWB-GRU", "2023-08-30", "02:00", 30000, 2);
//console.log(plano3);// Exibe as informações do plano de voo


//teste para ver se esta cancelado o voo 
//console.log(plano1.cancelado); 
//console.log(plano2.cancelado);  

class OcupacaoAerovia{
    constructor() {
        this.ocupacoes = [];
        
    }
     
    altitudesOcupadas(idAerovia,data){
       return this.ocupacoes.filter(ocupacao =>ocupacao.idAerovia === idAerovia && ocupacao.data === data)
       .map(ocupacao => ocupacao.altitude)
    

    }

    slotsOcupados(idAerovia,data,altitude){
        return this,this.ocupacoes.filter(ocupacao =>ocupacao.idAerovia === idAerovia && ocupacao.data === data && ocupacao.altitude === altitude)
        .map(ocupacao => ocupacao.slot)
        

    }

    ocupa(idAerovia,data,altitude,slot){
        this.ocupacoes.push({idAerovia,data,altitude,slot})
        console.log(`Ocupação registrada: Aerovia ${idAerovia}, Data ${data}, Altitude ${altitude}, Slot ${slot}`);
        
        
    }

    libera(idAerovia,data,altitude,slot){
        this.ocupacoes = this.ocupacoes.filter(ocupacao =>
            !(ocupacao.idAerovia === idAerovia && ocupacao.data === data && ocupacao.altitude === altitude && ocupacao.slot === slot)
            );
    }

    isOcupado(idAerovia,data,altitude,slot){
        return this.ocupacoes.some(ocupacao =>
            ocupacao.idAerovia === idAerovia && ocupacao.data === data && ocupacao.altitude === altitude && ocupacao.slot === slot
        );
    }
}

var planoDeVoo = []

class ServicoPlanos{
    consiste(matricPiloto, prefixoAeronave, idAerovia, data, horario, altitude){
        
        var pilotoAtivo = new ServicoPilotos().recupera(matricPiloto);
        //console.log(pilotoAtivo)
        if (!pilotoAtivo.habilitacao){
            console.log('sua habilitação está inválida')
            return
        }
        
            
        var aeronaveAutonomia = aeronaves.filter(aeronave => aeronave.prefixo === prefixoAeronave);
        
        
        if (aeronaveAutonomia.length == 0){
            console.log('aeronave nao encontrada')
            return
        }
        aeronaveAutonomia = aeronaveAutonomia[0]
        var aeroviaAutonomia = new ServicoAerovia().recuperaID(idAerovia);
        if (aeroviaAutonomia) {
            var calcAutonomia = aeroviaAutonomia.tamanho * 0.10;
            calcAutonomia = calcAutonomia + aeroviaAutonomia.tamanho;
            if (!(Number(aeronaveAutonomia.autonomia) > Number(calcAutonomia))) {
                console.log('Capacidade da aeronave incompatível com o voo');
                return;
            }
        } 

        var aeronave = aeronaves.find(aeronave => aeronave.prefixo === prefixoAeronave);

        if (!aeronave) {
            console.log('Aeronave não encontrada.');
            return;
        }
        //true && true && true
        //true && true 
        if (!(aeronave.prefixo === 'aeronave_particular' && altitude >= 25000 && altitude <= 27000)) {
            console.log('Altitude incompatível com aeronave particular.');
            return;
        } 
                
        if (!(aeronave.prefixo === 'aeronave_passageiros' && altitude > 28000)) {
            console.log('Altitude incompatível com aeronave de passageiros.');
            return;
        }
        if (aeronave.prefixo === 'aeronave_carga'){
            if (!(horario === '00:00' || horario === '01:00' || 
                horario === '02:00' || horario === '03:00' || horario === '04:00' || horario === '05:00' || 
                horario === '06:00')){
                console.log('Horario incompativel com aeronave de carga')
                return
            }
        }

        planoDeVoo.push(
            {
                id: Math.floor(Date.now() * Math.random()).toString(36),
                matricPiloto: matricPiloto,
                idAerovia:idAerovia,
                data: new Date(data),
                horario: horario,
                altitude: altitude,
                slots: 'slots',
                cancelado: false
            }
            
        )
        return planoDeVoo
    }
        
    recupera(id) {
        var procura = planoDeVoo.find(plano => plano.id === id);
        if (!procura) {
            console.log('Plano de voo não encontrado.');
            return null; // Retorna null para indicar que o plano não foi encontrado
        }
        
        return procura; // Retorna o plano de voo encontrado
    }

}



// classe menu com algumas funcoes 
class Menu {
    constructor(){
        console.log('-----------------')
        console.log('##### Menu #####')
        console.log('----------------------')
        console.log('| 1-listar aerovias  |')
        console.log('| 2-listar altitudes |')
        console.log('| 3- aprovar plano de voo|')
        console.log('| 4-listar plano de voo |')
        console.log('| 5-listar ocupação de aerovias |')
        console.log('| 6-cancelar plano de voo |')
        console.log('| 7-criar nova aeronave |')
        console.log('| 0-sair             |')
        console.log('----------------------')
        console.log('Escolha sua opção: ')
        rl.on('line', (option) => {
            if (option === '1'){
                this.listarAerovias();
            } else if (option === '2'){
                this.listarAltitudesLivres();
            } else if (option === '3'){
                this.aprovarPlanoDeVoo();
            } else if (option === '4'){
                this.listarPlanos();
            } else if (option === '5'){
                this.alistarOcupacao();
            } else if (option === '6'){
                this.cancelarPlano();
            } else if (option ==='7'){
                this.novaAeronave();
                
            }
            
            else if (option === '0'){
                rl.close()
            } else {
                console.log('Escolha uma opção válida.')
            }
        });
            
            

       
        
        
    }
    async novaAeronave(){
        console.log('1 - aeronave de carga')
        console.log('2 - aeronave passageiros')
        console.log('3 - aeronave particular')

        var tipoaero = await question("Qual o tipo de aeronave? ", function(answer) {
            return answer
            });
            
            if (tipoaero === '1'){
                var capacidade = await question("Qual a capacidade maxima de carga? ", function(answer) {
                    return answer
                    });
                new AeronaveCarga(capacidade);
            }
                
            if (tipoaero === '2'){
                var capacidadePas = await question("Qual a capacidade maxima de passageiros? ", function(answer) {
                    return answer
                    });
                new AeronavePassageiros(capacidadePas);
            }
        if (tipoaero === '3'){
            var manut = await question("Quem e o responsavel pela manutenção? ", function(answer) {
                return answer
                });
            new AeronaveParticular(manut);
            }
    }

    async listarAerovias(){
        console.log('')
        console.log('poa - Porto Alegre','|','flo - Florianópolis','|', 'gru - Guarulhos','|', 'cwb - Curitiba')
        var origem = await question("Qual e sua origem? ", function(answer) {
            return answer
            });
        console.log(origem);

        var destino = await question("Qual e sua destino? ", function(answer) {
            return answer
            });
        console.log(destino);
        
        
        const lists = new ServicoAerovia()
        console.log(lists.recupera(origem,destino))
    } 

    listarAltitudesLivres(){
        
        

    }

    async  aprovarPlanoDeVoo(){
        var matric = await question("Qual a matricula do piloto? ", function(answer) {
            return answer
            });

        var prefaero = await question("Qual o prefixo da aeronave? ", function(answer) {
            return answer
            });

        var id_aerovia = await question("Qual o ID da aerovia ? ", function(answer) {
            return answer
            });

        var dt = await question("Qual a data do voo ? ", function(answer) {
            return answer
            });   
            
        var horario_voo = await question("Qual horário do voo ? ", function(answer) {
            return answer
            });

        var alt = await question("Qual altitude do voo ? ", function(answer) {
            return answer
            });

        var cria_plano = new ServicoPlanos().consiste(matric, prefaero, id_aerovia, dt, horario_voo, alt);
            console.log(cria_plano);
        
        
    }

    //consiste(matricPiloto, prefixoAeronave, idAerovia, data, horario, altitude, slots)

    listarPlanos() {
        console.log("Lista de planos de voo:");
        for (const plano of planoDeVoo) {
            console.log(`ID: ${plano.id}, Matrícula do Piloto: ${plano.matricPiloto}, ID da Aerovia: ${plano.idAerovia}, Data: ${plano.data}, Horário: ${plano.horario}, Altitude: ${plano.altitude}, Slots: ${plano.slots.join(", ")}, Cancelado: ${plano.cancelado}`);
        }
    }

    cancelaPlano(id) {
        const plano = planoDeVoo.find(plano => plano.id === id);

        if (!plano) {
            console.log('Plano de voo não encontrado.');
            return;
        }

        if (plano.cancelado) {
            console.log('Plano de voo já está cancelado.');
            return;
        }

        plano.cancelado = true;
        console.log('Plano de voo cancelado com sucesso.');
    }
    
    
}
new Menu()



/*
// Criar instâncias de ServicoPilotos, ServicoAeronaves e ServicoAerovias
const servicoPilotos1 = new ServicoPilotos();
const servicoAeronaves = new ServicoAeronaves();
const servicoAerovias1 = new ServicoAerovia();

// Exemplo de uso para ServicoPilotos
const piloto = servicoPilotos1.todos();
console.log("Pilotos:", piloto); // Deve imprimir os detalhes do piloto com matrícula 1

// Exemplo de uso para ServicoAeronaves
const todasAeronaves = servicoAeronaves.todas();
console.log("Todas as Aeronaves:", todasAeronaves); // Deve imprimir a lista de todas as aeronaves

// Exemplo de uso para ServicoAerovias
const aerovia = servicoAerovias1.recuperaID("r2");
console.log("Aerovia:", aerovia); // Deve imprimir os detalhes da aerovia com id "r2"

// Exemplo de uso para Hierarquia de Classes de Aeronaves
const aeronaveParticular = new AeronaveParticular("manSul");
console.log("Aeronave Particular:", aeronaveParticular); // Deve criar uma instância de AeronaveParticular

const aeronaveComercial = new AeronaveComercial({ pesoMax: 20000 }, "Azul");
console.log("Aeronave Comercial:", aeronaveComercial); // Deve criar uma instância de AeronaveComercial

const aeronavePassageiros = new AeronavePassageiros();
console.log("Aeronave de Passageiros:", aeronavePassageiros); // Deve criar uma instância de AeronavePassageiros

const aeronaveCarga = new AeronaveCarga();
console.log("Aeronave de Carga:", aeronaveCarga); // Deve criar uma instância de AeronaveCarga

// Exemplo de uso para ServicoPlanos
const servicoPlanos = new ServicoPlanos();
servicoPlanos.consiste("123", 1, "aeronave_passageiros", "r1", "2023-09-02", "15:00", 29000, [15, 16]);
// Deve criar um plano de voo com os parâmetros especificados


// exemplo de uso para o menu 
const menu = new Menu();
menu.listarAerovias(); // Lists aerovias

menu.listarPlanos(); // Lists all plans

menu.cancelaPlano("123"); // Cancels the plan with id "123"

const recuperaPlano = servicoPlanos.recupera("123");
console.log("Plano de Voo Recuperado:", recuperaPlano); // Should retrieve the canceled plan with id "123"
*/



















