#include "DHT.h" //importar biblioteca do DHT
#define dht_type DHT11 // definir tipo 

// definição de variáveis
//LDR
int ldr_sensorPin = A0;
int ldr_sensorValue1 = 0;

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
  // DHT11 AMBIENTE 1
  float umidade1 = dht_1.readHumidity();         
  float temperatura1 = dht_1.readTemperature();  

  //DHT11 AMBIENTE 2
  // float umidade2 = dht_1.readHumidity() * 10;
  // float temperatura2 = dht_1.readTemperature() * 10;

  if (isnan(temperatura1) or isnan(umidade1)) { // checando se o valor for inváliado 

    Serial.println("Erro ao ler");
  
  } else { 
    
    //AMBIENTE 1
    
    // Serial.print("Umidade:");
    Serial.print(umidade1); 

    Serial.print(","); 

    // Serial.print("Temperatura:");
    Serial.print(temperatura1);

    Serial.print(",");
    
    //LDR
    luminosidade1 = analogRead(ldr_sensorPin); 
    // Serial.print("Luminosidade:") ;
    Serial.println(luminosidade1);

    //AMBIENTE 2
    // Serial.print("Umidade2:");
    // Serial.print(umidade2);

    // Serial.print(", "); 

    // Serial.print("Temperatura2:");
    // Serial.print(temperatura2);

    // Serial.print(", "); 
    
    // //LDR
    // ldr_sensorValue2 = analogRead(ldr_sensorPin) * 10; 
    // Serial.print("Luminosidade2:") ;
    // Serial.print(ldr_sensorValue2); 

    // Serial.print(", ");

    // Serial.print("Max:");
    // Serial.print(max);

    // Serial.print(", ");

    // Serial.print("Min:");
    // Serial.println(min);

  }
  delay(5000); // delay 👍
}
