// Importa os módulos necessários
// não altere!
const serialport = require('serialport'); // Módulo para comunicação serial
const express = require('express'); // Módulo para criar um servidor web
const mysql = require('mysql2'); // Módulo para conectar ao MySQL

// Constantes para configurações
// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// Habilita ou desabilita a inserção de dados no banco de dados
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// Função para comunicação serial
const serial = async (
    valoresDht11Umidade1,
    valoresDht11Temperatura1,
    valoresLuminosidade1,
    valoresDht11Umidade2,
    valoresDht11Temperatura2,
    valoresLuminosidade2,
    valoresDht11Umidade3,
    valoresDht11Temperatura3,
    valoresLuminosidade3,
    valoresDht11Umidade4,
    valoresDht11Temperatura4,
    valoresLuminosidade4,
    valoresDht11Umidade5,
    valoresDht11Temperatura5,
    valoresLuminosidade5
) => {
    let poolBancoDados = ''

    // Conexão com o banco de dados MySQL
    poolBancoDados = mysql.createPool(
        {
            // altere!
            // Credenciais do banco de dados
            host: '10.18.35.248',
            user: 'cliente',
            password: '#Cliente123',
            database: 'smartfarm',
            port: 3308
        }
    ).promise();

    // Lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // Configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // Evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // Processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(',');
        const dht11Umidade1 = parseFloat(valores[0]);
        const dht11Temperatura1 = parseFloat(valores[1]);
        const luminosidade1 = parseFloat(valores[2]);
        const dht11Umidade2 = parseFloat(valores[3]);
        const dht11Temperatura2 = parseFloat(valores[4]);
        const luminosidade2 = parseFloat(valores[5]);
        const dht11Umidade3 = parseFloat(valores[6]);
        const dht11Temperatura3 = parseFloat(valores[7]);
        const luminosidade3 = parseFloat(valores[8]);
        const dht11Umidade4 = parseFloat(valores[9]);
        const dht11Temperatura4 = parseFloat(valores[10]);
        const luminosidade4 = parseFloat(valores[11]);
        const dht11Umidade5 = parseFloat(valores[12]);
        const dht11Temperatura5 = parseFloat(valores[13]);
        const luminosidade5 = parseFloat(valores[14]);

        // Armazena os valores dos sensores nos arrays correspondentes
        valoresDht11Umidade1.push(dht11Umidade1);
        valoresDht11Temperatura1.push(dht11Temperatura1);
        valoresLuminosidade1.push(luminosidade1);
        valoresDht11Umidade2.push(dht11Umidade2);
        valoresDht11Temperatura2.push(dht11Temperatura2);
        valoresLuminosidade2.push(luminosidade2);
        valoresDht11Umidade2.push(dht11Umidade3);
        valoresDht11Temperatura2.push(dht11Temperatura3);
        valoresLuminosidade2.push(luminosidade3);
        valoresDht11Umidade2.push(dht11Umidade4);
        valoresDht11Temperatura2.push(dht11Temperatura4);
        valoresLuminosidade2.push(luminosidade4);
        valoresDht11Umidade2.push(dht11Umidade5);
        valoresDht11Temperatura2.push(dht11Temperatura5);
        valoresLuminosidade2.push(luminosidade5);



        // Insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // altere!
            // Este insert irá inserir os dados na tabela "medida"
            const query = `
    INSERT INTO leitura (temperatura, umidade, luminosidade, fk_sensores) VALUES 
    (?, ?, ?, 1000), (?, ?, ?, 1001), (?, ?, ?, 1002), (?, ?, ?, 1003), (?, ?, ?, 1004), 
    (?, ?, ?, 1005), (?, ?, ?, 1006), (?, ?, ?, 1007), (?, ?, ?, 1008), (?, ?, ?, 1009), 
    (?, ?, ?, 1010), (?, ?, ?, 1011), (?, ?, ?, 1012), (?, ?, ?, 1013), (?, ?, ?, 1014),
    (?, ?, ?, 1015), (?, ?, ?, 1016), (?, ?, ?, 1017), (?, ?, ?, 1018), (?, ?, ?, 1019),
    (?, ?, ?, 1020), (?, ?, ?, 1021), (?, ?, ?, 1022), (?, ?, ?, 1023), (?, ?, ?, 1024),
    (?, ?, ?, 1025), (?, ?, ?, 1026), (?, ?, ?, 1027), (?, ?, ?, 1028), (?, ?, ?, 1029),
    (?, ?, ?, 1030), (?, ?, ?, 1031), (?, ?, ?, 1032), (?, ?, ?, 1033), (?, ?, ?, 1034),
    (?, ?, ?, 1035), (?, ?, ?, 1036), (?, ?, ?, 1037), (?, ?, ?, 1038), (?, ?, ?, 1039),
    (?, ?, ?, 1040), (?, ?, ?, 1041), (?, ?, ?, 1042), (?, ?, ?, 1043), (?, ?, ?, 1044),
    (?, ?, ?, 1045), (?, ?, ?, 1046), (?, ?, ?, 1047), (?, ?, ?, 1048), (?, ?, ?, 1049),
    (?, ?, ?, 1050), (?, ?, ?, 1051), (?, ?, ?, 1052), (?, ?, ?, 1053), (?, ?, ?, 1054),
    (?, ?, ?, 1055), (?, ?, ?, 1056), (?, ?, ?, 1057), (?, ?, ?, 1058), (?, ?, ?, 1059),
    (?, ?, ?, 1060), (?, ?, ?, 1061), (?, ?, ?, 1062), (?, ?, ?, 1063), (?, ?, ?, 1064),
    (?, ?, ?, 1065), (?, ?, ?, 1066), (?, ?, ?, 1067), (?, ?, ?, 1068), (?, ?, ?, 1069),
    (?, ?, ?, 1070), (?, ?, ?, 1071), (?, ?, ?, 1072), (?, ?, ?, 1073), (?, ?, ?, 1074);
`;

            const valores = [
                // Valores alternados entre as estufas de 1000 a 1074
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5,
                dht11Temperatura1, dht11Umidade1, luminosidade1,
                dht11Temperatura2, dht11Umidade2, luminosidade2,
                dht11Temperatura3, dht11Umidade3, luminosidade3,
                dht11Temperatura4, dht11Umidade4, luminosidade4,
                dht11Temperatura5, dht11Umidade5, luminosidade5
            ];

            await poolBancoDados.execute(query, valores);
            console.log("Valores inseridos no banco:", valores);
        }

    });

    // Evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
// Função para criar e configurar o servidor web
const servidor = (
    valoresDht11Umidade1,
    valoresDht11Temperatura1,
    valoresLuminosidade1,
    valoresDht11Umidade2,
    valoresDht11Temperatura2,
    valoresLuminosidade2,
    valoresDht11Umidade3,
    valoresDht11Temperatura3,
    valoresLuminosidade3,
    valoresDht11Umidade4,
    valoresDht11Temperatura4,
    valoresLuminosidade4,
    valoresDht11Umidade5,
    valoresDht11Temperatura5,
    valoresLuminosidade5
) => {
    const app = express();

    // Configurações de CORS
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // Inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Define os endpoints da API para cada tipo de sensor
    app.get('/sensores/dht11/umidade1', (_, response) => {
        return response.json(valoresDht11Umidade1);
    });
    app.get('/sensores/dht11/temperatura1', (_, response) => {
        return response.json(valoresDht11Temperatura1);
    });
    app.get('/sensores/luminosidade1', (_, response) => {
        return response.json(valoresLuminosidade1);
    });
    app.get('/sensores/dht11/umidade2', (_, response) => {
        return response.json(valoresDht11Umidade2);
    });
    app.get('/sensores/dht11/temperatura2', (_, response) => {
        return response.json(valoresDht11Temperatura2);
    });
    app.get('/sensores/luminosidade2', (_, response) => {
        return response.json(valoresLuminosidade2);
    });
    app.get('/sensores/dht11/umidade3', (_, response) => {
        return response.json(valoresDht11Umidade3);
    });
    app.get('/sensores/dht11/temperatura3', (_, response) => {
        return response.json(valoresDht11Temperatura3);
    });
    app.get('/sensores/luminosidade3', (_, response) => {
        return response.json(valoresLuminosidade3);
    });
    app.get('/sensores/dht11/umidade4', (_, response) => {
        return response.json(valoresDht11Umidade4);
    });
    app.get('/sensores/dht11/temperatura4', (_, response) => {
        return response.json(valoresDht11Temperatura4);
    });
    app.get('/sensores/luminosidade4', (_, response) => {
        return response.json(valoresLuminosidade4);
    });
    app.get('/sensores/dht11/umidade5', (_, response) => {
        return response.json(valoresDht11Umidade5);
    });
    app.get('/sensores/dht11/temperatura5', (_, response) => {
        return response.json(valoresDht11Temperatura5);
    });
    app.get('/sensores/luminosidade5', (_, response) => {
        return response.json(valoresLuminosidade5);
    });

}

// Função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // Arrays para armazenar os valores dos sensores
    const valoresDht11Umidade1 = [];
    const valoresDht11Temperatura1 = [];
    const valoresLuminosidade1 = [];
    const valoresDht11Umidade2 = [];
    const valoresDht11Temperatura2 = [];
    const valoresLuminosidade2 = [];
    const valoresDht11Umidade3 = [];
    const valoresDht11Temperatura3 = [];
    const valoresLuminosidade3 = [];
    const valoresDht11Umidade4 = [];
    const valoresDht11Temperatura4 = [];
    const valoresLuminosidade4 = [];
    const valoresDht11Umidade5 = [];
    const valoresDht11Temperatura5 = [];
    const valoresLuminosidade5 = [];



    // Inicia a comunicação serial
    await serial(
        valoresDht11Umidade1,
        valoresDht11Temperatura1,
        valoresLuminosidade1,
        valoresDht11Umidade2,
        valoresDht11Temperatura2,
        valoresLuminosidade2,
        valoresDht11Umidade3,
        valoresDht11Temperatura3,
        valoresLuminosidade3,
        valoresDht11Umidade4,
        valoresDht11Temperatura4,
        valoresLuminosidade4,
        valoresDht11Umidade5,
        valoresDht11Temperatura5,
        valoresLuminosidade5
    );

    // Inicia o servidor web
    servidor(
        valoresDht11Umidade1,
        valoresDht11Temperatura1,
        valoresLuminosidade1,
        valoresDht11Umidade2,
        valoresDht11Temperatura2,
        valoresLuminosidade2,
        valoresDht11Umidade3,
        valoresDht11Temperatura3,
        valoresLuminosidade3,
        valoresDht11Umidade4,
        valoresDht11Temperatura4,
        valoresLuminosidade4,
        valoresDht11Umidade5,
        valoresDht11Temperatura5,
        valoresLuminosidade5
    );
})();
