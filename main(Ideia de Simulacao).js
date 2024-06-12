const serialport = require('serialport'); // Módulo para comunicação serial
const express = require('express'); // Módulo para criar um servidor web
const mysql = require('mysql2'); // Módulo para conectar ao MySQL

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

const HABILITAR_OPERACAO_INSERIR = true;

const randomizeValue = (value, variation) => {
    return value + (Math.random() * 2 * variation - variation);
};

const serial = async (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade
) => {
    let poolBancoDados = '';

    poolBancoDados = mysql.createPool({
        host: 'localhost',
        user: 'cliente',
        password: '#Cliente123',
        database: 'smartfarm',
        port: 3307
    }).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    const arduino = new serialport.SerialPort({
        path: portaArduino.path,
        baudRate: SERIAL_BAUD_RATE
    });

    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(',');
        const dht11Umidade = parseFloat(valores[0]);
        const dht11Temperatura = parseFloat(valores[1]);
        const luminosidade = parseFloat(valores[2]);

        // Randomiza os valores em 15 vezes por um for
        for (let i = 0; i < 15; i++) {
            const estufaUmidade = randomizeValue(dht11Umidade, 2.0);
            const estufaTemperatura = randomizeValue(dht11Temperatura, 1.0);
            const estufaLuminosidade = randomizeValue(luminosidade, 50);

            if (valoresDht11Umidade[i] === undefined) {
                valoresDht11Umidade[i] = [];
                valoresDht11Temperatura[i] = [];
                valoresLuminosidade[i] = [];
            }

            valoresDht11Umidade[i].push(estufaUmidade);
            valoresDht11Temperatura[i].push(estufaTemperatura);
            valoresLuminosidade[i].push(estufaLuminosidade);

            if (valoresDht11Umidade[i].length > 15) valoresDht11Umidade[i].shift();
            if (valoresDht11Temperatura[i].length > 15) valoresDht11Temperatura[i].shift();
            if (valoresLuminosidade[i].length > 15) valoresLuminosidade[i].shift();

            // Insere no banco, e mostra no console o que ele inseriu, e em qual conjunto de sensores.
            if (HABILITAR_OPERACAO_INSERIR) {
                await poolBancoDados.execute(
                    'INSERT INTO leitura (temperatura, umidade, luminosidade, fk_sensores) VALUES (?, ?, ?, ?)',
                    [estufaTemperatura, estufaUmidade, estufaLuminosidade, 1000 + i]
                );
                console.log(`valores inseridos no banco o conjunto de sensores ${i + 1}: ${estufaTemperatura}, ${estufaUmidade}, ${estufaLuminosidade}`);
            }
        }
    });

    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`);
    });
}

const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade
) => {
    const app = express();

    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
    app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    });
}

(async () => {
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    const valoresLuminosidade = [];

    await serial(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresLuminosidade
    );

    servidor(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresLuminosidade
    );
})();
