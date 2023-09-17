const lineByLine = require('n-readlines');
const { resourceUsage } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
const question = (str) => new Promise(resolve => rl.question(str, resolve));
var planoDeVoo = [
    {
        id: '3o44v2ex',
        matricPiloto: '1',
        idAerovia: 'r2',
        data: '09-19-2023',
        horario: '02:00',
        altitude: '31000',
        slots: 3,
        cancelado: false
    },

    {
        id: '3o44v2ex',
        matricPiloto: '1',
        idAerovia: 'r2',
        data: '09-18-2023',
        horario: '02:00',
        altitude: '33000',
        slots: 3,
        cancelado: false
    },

    {
        id: '3o44v2ex',
        matricPiloto: '1',
        idAerovia: 'r2',
        data: '09-18-2023',
        horario: '02:00',
        altitude: '31000',
        slots: 3,
        cancelado: false
    }
]

var aeronaves = [
    {
        pesoMax: '5000',
        nomeCia: 'latam',
        prefixo: 'aeronave_carga',
        velocidadeCruzeiro: '800',
        autonomia: '2000'
    }
]

var tdaltitudes = [25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000]


const pilotosTxt = new lineByLine('./src/assets/pilotos.txt');
class ServicoPilotos {
    recupera(matricula) {
        let line;
        let lineNumber = 1;
        let piloto = {}

        while (line = pilotosTxt.next()) {
            if (lineNumber > 1) {
                var results = line.toString('ascii').split(',');
                if (results[0] == matricula) {
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
    todos() {
        let line;
        let lineNumber = 1;
        let pilotos = [];

        while (line = pilotosTxt.next()) {
            if (lineNumber > 1) {
                var results = line.toString('ascii').split(',');
                var piloto = {
                    "matricula": results[0],
                    "nome": results[1],
                    "habilitacao": Boolean(results[2])
                };
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

class ServicoAerovia {
    recuperaID(id) {
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

class ServicoAeronaves {
    todas() {
        console.log(aeronaves)
        return aeronaves
    }
}

class Aeronave {

    constructor(object, prefixo, velocidadeCruzeiro, autonomia) {

        var objAeronave = {
            ...object,
            prefixo: prefixo,
            velocidadeCruzeiro: velocidadeCruzeiro,
            autonomia: autonomia
        }

        aeronaves.push(objAeronave)
        console.log(aeronaves)

    }


}


class AeronaveParticular {
    constructor(respManutencao) {
        this.toExecuteQuestions(respManutencao);
    }

    async toExecuteQuestions(respManutencao) {
        var velocicru = await question('qual a velocidade de cruzeiro da aeronave?',
            function (answer) {
                return answer
            });

        var autonomia_part = await question('Qual a autonomia da aeronave?',
            function (answer) {
                return answer
            });



        var ob = { respManutencao: respManutencao }
        var uni = 'aeronave_particular'
        new Aeronave(ob, uni, velocicru, autonomia_part)
    }
}


class AeronaveComercial {
    constructor(object, nomeCia) {
        this.toExecuteQuestions(object, nomeCia);

    }
    async toExecuteQuestions(object, nomeCia) {
        var velocicru = await question('Qual a velocidade de cruzeiro da aeronave? ',
            function (answer) {
                return answer
            });

        var autonomia = await question('Qual a autonomia da aeronave? ',
            function (answer) {
                return answer
            });

        var obj = { ...object, nomeCia: nomeCia };

        var tipo = object['pesoMax'] === undefined ? 'aeronave_passageiros' : 'aeronave_carga'
        new Aeronave(obj, tipo, velocicru, autonomia)
    }

}

class AeronaveCarga {
    constructor(pesoMax) {
        this.toExecuteQuestions(pesoMax);
    }

    async toExecuteQuestions(pesoMax) {
        var nomecom = await question('Qual o nome da companhia aérea? ',
            function (answer) {
                return answer
            });


        var objt = { pesoMax: pesoMax }

        new AeronaveComercial(objt, nomecom)



    }
}

class AeronavePassageiros {
    constructor(maxPas) {
        this.toExecuteQuestions(maxPas);
    }



    async toExecuteQuestions(maxPas) {
        var nomecom = await question('Qual o nome da companhia aérea? ',
            function (answer) {
                return answer
            });


        var object = { maxPassageiros: maxPas }
        new AeronaveComercial(object, nomecom)


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



class OcupacaoAerovia {
    altitudesOcupadas(idAerovia, data) {
        /* mm-dd-yyyy*/
        var dateFormat = new Date(data)
        var altitudes = planoDeVoo.map(voo => {
            if (voo.data === data && idAerovia === voo.idAerovia) {
                return voo.altitude
            } else {
                return
            }


        })


        console.log(altitudes.filter(value => value !== undefined))
        return altitudes.filter(value => value !== undefined)

    }

    slotsOcupados(idAerovia, data, altitude) {
        /* mm-dd-yyyy*/
        var dateFormat = new Date(data)

        var slotsOcupados = planoDeVoo.map(voo => {
            var [horas, minutos] = voo.horario.split(':').map(Number)
            var horariosOcupadas = []

            if (voo.data === data && idAerovia === voo.idAerovia && altitude === voo.altitude) {
                


                for (var i = 0; i < voo.slots; i++) {
                    var horasOcupadas = horas + Math.floor((minutos + i * 60) / 60)
                    var minutosOcupados = (minutos + i * 60) % 60
                    var horarioOcupado = horasOcupadas + ':' + minutosOcupados
                    horariosOcupadas.push(horarioOcupado)

                }
                return horariosOcupadas
            }
        })



        console.log(slotsOcupados.filter(value => value !== undefined))
        return slotsOcupados.filter(value => value !== undefined)

    }




    ocupa(idAerovia, data, altitude, slot) {
        if (this.isOcupado(idAerovia, data, altitude, slot)) {
            console.log('O slot já está ocupado.');
        } else {
            // Crie um novo plano de voo com os parâmetros fornecidos
            planoDeVoo.push({
                id: Math.floor(Date.now() * Math.random()).toString(36),
                idAerovia,
                data,
                altitude,
                horario: slot,
                cancelado: false
            });
    
            console.log('Slot ocupado com sucesso.');
        }
    

    
    }

    libera(idAerovia, data, altitude, slot) {
        const index = planoDeVoo.findIndex(voo => {
            return (
                voo.idAerovia === idAerovia &&
                voo.data === data &&
                voo.altitude === altitude &&
                voo.horario === slot
            );
        });
    
        if (index !== -1) {
            // Remove o plano de voo
            planoDeVoo.splice(index, 1);
            console.log('Slot liberado com sucesso.');
        } else {
            console.log('Nenhum plano de voo encontrado para liberar.');
        }
        


    }

    isOcupado(idAerovia, data, altitude, slot) {
        const plano = planoDeVoo.find(voo => {
            return (
                voo.idAerovia === idAerovia &&
                voo.data === data &&
                voo.altitude === altitude &&
                voo.horario === slot
            );
        });
        
    
        return !!plano;



    
}
}

new OcupacaoAerovia().altitudesOcupadas('r2', '09-18-2023');
new OcupacaoAerovia().slotsOcupados('r2', '09-18-2023','31000' );
new OcupacaoAerovia().isOcupado('r2', '09-15-2023','31000', '01:00' )



class ServicoPlanos {
    consiste(matricPiloto, prefixoAeronave, idAerovia, data, horario, altitude) {

        var pilotoAtivo = new ServicoPilotos().recupera(matricPiloto);
        //console.log(pilotoAtivo)
        if (!pilotoAtivo.habilitacao) {
            console.log('sua habilitação está inválida')
            return
        }


        var aeronaveAutonomia = aeronaves.filter(aeronave => aeronave.prefixo === prefixoAeronave);


        if (aeronaveAutonomia.length == 0) {
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
        //if (!(aeronave.prefixo === 'aeronave_particular' && altitude >= 25000 && altitude <= 27000)) {
        // console.log('Altitude incompatível com aeronave particular.');
        // return;
        //} 

        /*if (!(aeronave.prefixo === 'aeronave_passageiros' && altitude > 28000)) {
            console.log('Altitude incompatível com aeronave de passageiros.');
            return;
        }*/
        if (aeronave.prefixo === 'aeronave_carga') {
            if (!(horario === '00:00' || horario === '01:00' ||
                horario === '02:00' || horario === '03:00' || horario === '04:00' || horario === '05:00' ||
                horario === '06:00')) {
                console.log('Horario incompativel com aeronave de carga')
                return
            }
        }

        var tempoHoras = aeroviaAutonomia.tamanho / aeronave.velocidadeCruzeiro
        var tempMinu = tempoHoras * 60
        var horas = Math.floor(tempMinu / 60)
        var minutos = tempMinu % 60

        var minuTotal = horas * 60 + minutos
        var slotsOcupados = Math.ceil(minuTotal / 60)


        planoDeVoo.push(
            {
                id: Math.floor(Date.now() * Math.random()).toString(36),
                matricPiloto: matricPiloto,
                idAerovia: idAerovia,
                data: data,
                horario: horario,
                altitude: altitude,
                slots: slotsOcupados,
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
    constructor() {
        console.log('-----------------')
        console.log('##### Menu #####')
        console.log('----------------------')
        console.log('| 1-listar aerovias  |')
        console.log('| 2-listar altitudes |')
        console.log('| 3-aprovar plano de voo|')
        console.log('| 4-listar plano de voo |')
        console.log('| 5-listar ocupação de aerovias |')
        console.log('| 6-cancelar plano de voo |')
        console.log('| 7-criar nova aeronave |')
        console.log('| 0-sair             |')
        console.log('----------------------')
        console.log('Escolha sua opção: ')
        rl.on('line', (option) => {
            if (option === '1') {
                this.listarAerovias();
            } else if (option === '2') {
                this.listarAltitudesLivres();
            } else if (option === '3') {
                this.aprovarPlanoDeVoo();
            } else if (option === '4') {
                this.listarPlanos();
            } else if (option === '5') {
                this.listarOcupacaoAerovias();
            } else if (option === '6') {
                this.cancelaPlano();
            } else if (option === '7') {
                this.novaAeronave();

            }

            else if (option === '0') {
                rl.close()
            } else {
                console.log('Escolha uma opção válida.')
            }
        });






    }
    async novaAeronave() {
        console.log('1 - aeronave de carga')
        console.log('2 - aeronave passageiros')
        console.log('3 - aeronave particular')

        var tipoaero = await question("Qual o tipo de aeronave? ", function (answer) {
            return answer
        });

        if (tipoaero === '1') {
            var capacidade = await question("Qual a capacidade maxima de carga? ", function (answer) {
                return answer
            });
            new AeronaveCarga(capacidade);
        }

        if (tipoaero === '2') {
            var capacidadePas = await question("Qual a capacidade maxima de passageiros? ", function (answer) {
                return answer
            });
            new AeronavePassageiros(capacidadePas);
        }
        if (tipoaero === '3') {
            var manut = await question("Quem e o responsavel pela manutenção? ", function (answer) {
                return answer
            });
            new AeronaveParticular(manut);
        }
    }

    async listarAerovias() {
        console.log('')
        console.log('poa - Porto Alegre', '|', 'flo - Florianópolis', '|', 'gru - Guarulhos', '|', 'cwb - Curitiba')
        var origem = await question("Qual e sua origem? ", function (answer) {
            return answer
        });
        console.log(origem);

        var destino = await question("Qual e sua destino? ", function (answer) {
            return answer
        });
        console.log(destino);


        const lists = new ServicoAerovia()
        console.log(lists.recupera(origem, destino))
    }

    async  listarAltitudesLivres() {
        var idAerovia = await question("Qual a aerovia? ", function (answer) {
            return answer
        });

        var data = await question("Qual qual data (mm-dd-yyyy)? ", function (answer) {
            return answer
        });

        var altitudesOcupadas = planoDeVoo
        .filter((voo) => voo.idAerovia === idAerovia && voo.data === data)
        .map((voo) => voo.altitude);
        var minalt = tdaltitudes
        var maxalt = tdaltitudes 

        var altitudesLivres = []

        for ( altitude = minalt ; altitude <= maxalt; altitude++){
            if (!altitudesOcupadas.includes(altitude)){
                altitudesLivres.push(altitude);
            }
        }

        console.log(`Altitudes livres na aerovia ${idAerovia} na data ${data}:`, altitudesLivres);

    }

    async aprovarPlanoDeVoo() {
        var matric = await question("Qual a matricula do piloto? ", function (answer) {
            return answer
        });

        var prefaero = await question("Qual o prefixo da aeronave? ", function (answer) {
            return answer
        });

        var id_aerovia = await question("Qual o ID da aerovia ? ", function (answer) {
            return answer
        });

        var dt = await question("Qual a data do voo ? ", function (answer) {
            return answer
        });

        var horario_voo = await question("Qual horário do voo ? ", function (answer) {
            return answer
        });

        var alt = await question("Qual altitude do voo ? ", function (answer) {
            return answer
        });

        var cria_plano = new ServicoPlanos().consiste(matric, prefaero, id_aerovia, dt, horario_voo, alt);
        console.log(cria_plano);


    }

     async listarOcupacaoAerovias() {
        console.log('Lista de Ocupação de Aerovias:');
        console.log('poa - Porto Alegre', '|', 'flo - Florianópolis', '|', 'gru - Guarulhos', '|', 'cwb - Curitiba')
        var origem = await question("Qual a origem do voo ? ", function (answer) {
            return answer
        });

        var destino = await question("Qual o destino do voo ? ", function (answer) {
            return answer
        });

        var data1 = await question("Qual a data do voo ? ", function (answer) {
            return answer
        });
        
        // Iterar sobre as aerovias disponíveis
        var aero_via = new ServicoAerovia();
        const aerovias = aero_via.recupera(origem,destino)  // Preencha isso com as aerovias disponíveis do seu sistema
        
        for (const aerovia of aerovias) {
            console.log(`Aerovia: ${aerovia}`);
    
            // Verificar a ocupação para cada altitude e slot de tempo
            const altitudes = tdaltitudes; // Preencha isso com as altitudes disponíveis do seu sistema
            const slots = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00'
        ,'12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00']; // Preencha isso com os slots de tempo disponíveis do seu sistema
    
            for (const altitude of altitudes) {
                for (const slot of slots) {
                    const ocu = new OcupacaoAerovia();
                    const ocupado = ocu.isOcupado(aerovia, data1,altitude, slot); // Use a sua função isOcupado aqui
                    console.log(`Altitude ${altitude}, Slot ${slot}: ${ocupado ? 'Ocupado' : 'Livre'}`);
                }
            }
            console.log('----------------------');
        }
    }

    listarPlanos() {
        console.log("Lista de planos de voo:");
        for (const plano of planoDeVoo) {
            console.log(`ID: ${plano.id}, Matrícula do Piloto: ${plano.matricPiloto}, ID da Aerovia: ${plano.idAerovia}, Data: ${plano.data}, Horário: ${plano.horario}, Altitude: ${plano.altitude}, Slots: ${plano.slots}, Cancelado: ${plano.cancelado}`);
        }
    }

    async cancelaPlano(id) {
        var id_voo = await question("Qual ID do voo? ", function (answer) {
            return answer;
        });
    
        const index = planoDeVoo.findIndex((plano) => plano.id === id_voo);
    
        if (index === -1) {
            console.log('Plano de voo não encontrado.');
        } else {
            const planoCancelado = planoDeVoo.splice(index, 1);
            console.log(`Plano de voo com ID ${planoCancelado[0].id} cancelado com sucesso.`);
        }
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



















