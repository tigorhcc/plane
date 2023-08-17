const lineByLine = require('n-readlines'); 
const aeroviasTxt = new lineByLine('./src/assets/aerovias.txt');
class ServicoAerovia{

recupera(origem, destino) {
    console.log("Iniciando a função com origem:", origem, "e destino:", destino);

    // Inicialização de variáveis
    let line;
    let lineNumber = 1;
    let aerovias = [];

    // Loop para ler cada linha do arquivo de aerovias
    while (line = aeroviasTxt.next()) {
        console.log("Lendo linha:", line);

        // Separar os dados da linha por vírgula
        var results = line.toString('ascii').split(',');

        // Verificar se a linha não é a primeira (cabeçalho)
        if (lineNumber > 1) {
            // Verificar se a origem ou o destino coincidem com os parâmetros
            if (results[1] == origem || results[2] == destino) {
                console.log("Encontrada aerovia:", results[0]);

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

    console.log("Aerovias lidas:", aerovias);

    // Verificar se há mais de 3 aerovias possíveis
    if (aerovias.length > 3) {
        console.log("Há mais de 3 aerovias possíveis.");

        // Filtrar aerovias de partida e chegada
        var aeroviasPartida = aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino !== destino);
        var aeroviasChegada = aerovias.filter(aerovia => aerovia.destino === destino && aerovia.origem !== origem);

        console.log("Aerovias de partida:", aeroviasPartida);
        console.log("Aerovias de chegada:", aeroviasChegada);

        // Inicialização de variáveis para encontrar a melhor aerovia
        let melhorAerovia = null;
        let menorTamanhoTotal = Infinity;

        // Loop para encontrar a melhor combinação de aerovias
        aeroviasPartida.forEach(aeroviaPartida => {
            console.log("Analisando aerovia de partida:", aeroviaPartida);

            aeroviasChegada.forEach(aeroviaChegada => {
                console.log("Verificando aerovia de chegada:", aeroviaChegada);

                if (aeroviaPartida.destino === aeroviaChegada.origem) {
                    console.log("Conexão encontrada!");

                    const tamanhoTotal = aeroviaPartida.tamanho + aeroviaChegada.tamanho;

                    console.log("Tamanho total:", tamanhoTotal);

                    if (tamanhoTotal < menorTamanhoTotal) {
                        menorTamanhoTotal = tamanhoTotal;
                        console.log("Menor tamanho total atualizado para:", menorTamanhoTotal);

                        melhorAerovia = [aeroviaPartida, aeroviaChegada];
                        console.log("Melhor aerovia atualizada:", melhorAerovia);
                    }
                }
            });
        });

        console.log("Melhor combinação de aerovias:", melhorAerovia);
        console.log("Menor tamanho total:", menorTamanhoTotal);

        // Retornar a melhor combinação de aerovias
        return melhorAerovia;
    } else {
        // Se há menos de 3 aerovias, retornar as aerovias diretas
        console.log("Menos de 3 aerovias possíveis, retornando aerovias diretas.");
        return aerovias.filter(aerovia => aerovia.origem == origem && aerovia.destino === destino);
    }
}}
