#include "DHT.h" //importar biblioteca do DHT
#define dht_type DHT11 // definir tipo 

// definição de variáveis
//LDR
int ldr_sensorPin = A0;
int luminosidade1 = 0;

// int ldr_sensorValue2 = 0;

//DHT
int dht_pin = A1;
DHT dht_1 = DHT(dht_pin, dht_type); // definindo objeto tipo DHT

// float max = 50;
// float min = 0;

void setup() {
  Serial.begin(9600); // setar baudRate para 9600
  dht_1.begin();
}

void loop() {
  // AMBIENTE 1
  float umidade1 = dht_1.readHumidity();         
  float temperatura1 = dht_1.readTemperature();  
  // LDR AMBIENTE 1
  luminosidade1 = analogRead(ldr_sensorPin);

  // AMBIENTE 2
  float umidade2 = dht_1.readHumidity() * 1.15;
  float temperatura2 = dht_1.readTemperature() * 1.15;
  float luminosidade2 = (luminosidade1 * 17) * 1.15; 
  
  // AMBIENTE 3
  float umidade3 = dht_1.readHumidity() * 1.17;
  float temperatura3 = dht_1.readTemperature() * 1.17;
  float luminosidade3 = (luminosidade1 * 17) * 1.17; 

  // AMBIENTE 4
  float umidade4 = dht_1.readHumidity() * 1.12;
  float temperatura4 = dht_1.readTemperature() * 1.12;
  float luminosidade4 = (luminosidade1 * 17) * 1.12; 

  //AMBIENTE 5
  float umidade5 = dht_1.readHumidity() * 1.10;
  float temperatura5 = dht_1.readTemperature() * 1.10;
  float luminosidade5 = (luminosidade1 * 17) * 1.10; 

  if (isnan(temperatura1) or isnan(umidade1)) { // checando se o valor for inváliado 

    Serial.println("Erro ao ler");
  
  } else { 
    // Ambiente 1
    Serial.print(umidade1); 
    Serial.print(","); 
    Serial.print(temperatura1);
    Serial.print(",");
    Serial.print(luminosidade1 * 17);
    Serial.print(",");
    // Ambiente 2
    Serial.print(umidade2);
    Serial.print(","); 
    Serial.print(temperatura2);
    Serial.print(","); 
    Serial.print(luminosidade2);
    Serial.print(","); 
  // Ambiente 3
    Serial.print(umidade3);
    Serial.print(","); 
    Serial.print(temperatura3);
    Serial.print(","); 
    Serial.print(luminosidade3);
    Serial.print(","); 
    // Ambiente 4
    Serial.print(umidade4);
    Serial.print(","); 
    Serial.print(temperatura4);
    Serial.print(","); 
    Serial.print(luminosidade4);
    Serial.print(","); 
    // Ambiente 5
    Serial.print(umidade5);
    Serial.print(","); 
    Serial.print(temperatura5);
    Serial.print(","); 
    Serial.println(luminosidade5);
    


  }
  delay(10000); // delay 👍
}
