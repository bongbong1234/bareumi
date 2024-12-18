#include "MPU9250.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <WebSocketsClient.h>

MPU9250 mpu;

const char* ssid = "AICAM_301B"; //WiFi의 이름 => ESP32는 와이파이 주파수가 2.4Ghz밖에 못씀
const char* password = "a123456789"; // 와이파이의 비밀번호 
const char* websocketServer = "192.168.219.56";  // Flask 서버 IP
const int websocketPort = 5000;

WebSocketsClient webSocket;

// 핀 정의
const int ledPin = 13; // LED 또는 릴레이 제어 핀

// 변수 정의
bool mpuEnable = false;
float angleX, angleY, angleZ; // 각도 값
int riskScore = 0;            // 위험 점수

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case WStype_CONNECTED:
      Serial.println("WebSocket Connected!");
      webSocket.sendTXT("Hello from ESP32!");
      break;
    case WStype_DISCONNECTED:
      Serial.println("WebSocket Disconnected!");
      break;
    case WStype_TEXT:
      Serial.print("Received Update: ");
      Serial.println((char*)payload); // 서버에서 보낸 데이터 출력
      Serial.println(strcmp((char*)payload, "ON") == 0);
      if(strcmp((char*)payload, "ON") == 0) {
        mpuEnable = true;
      } else if (strcmp((char*)payload, "OFF") == 0) {
        mpuEnable = false;
      }
      break;
    default:
      break;
  }
}

void setup() {
    Serial.begin(115200);
    Wire.begin();
    WiFi.begin(ssid,password);
    delay(2000);

    while(WiFi.status() != WL_CONNECTED){ // WIFI의 상태가 연결이 안되어 있다면
      delay(1000);
      Serial.println("Wifi에 연결중");
    }
    //while문에서 탈출하면 나오는 시리얼 로그
    Serial.println("연결성공");

    webSocket.begin(websocketServer, websocketPort, "/ws");
    webSocket.onEvent(webSocketEvent);

    if (!mpu.setup(0x68)) {  // MPU9250의 I2C 주소 (기본값: 0x68)
        while (1) {
            Serial.println("MPU connection failed. Please check your connection with `connection_check` example.");
            delay(5000);
        }
    }
    pinMode(ledPin, OUTPUT); // LED 핀을 출력으로 설정
    digitalWrite(ledPin, LOW); // 초기 LED 상태 OFF    
}

void loop() {
    webSocket.loop();
       if (mpuEnable && mpu.update()) {
        // 자이로 값 읽기
        float gyroX = mpu.getGyroX();
        float gyroY = mpu.getGyroY();
        float gyroZ = mpu.getGyroZ();

        // 각속도를 각도로 변환 (예: ±500°/s 기준으로 각속도 데이터를 각도로 변환)
        angleX = gyroX / 65.5;
        angleY = gyroY / 65.5;
        angleZ = gyroZ / 65.5;

        // 규칙 기반 점수 계산
        if (abs(angleX) > 15 || abs(angleY) > 10) {
            // 기울기 편차 점수 추가
            if (abs(angleX) > 30 || abs(angleY) > 30) {
                riskScore += 10;
            } else {
                riskScore += 5;
            }

            // 시간 기반 점수 추가
            static unsigned long startTime = 0;
            if (startTime == 0) startTime = millis();
            if (millis() - startTime > 5000) { // 5초 이상 지속
                riskScore += 10;
            }
        } else {
            riskScore = 0; // 정상 자세일 경우 점수 초기화
        }

        // 점수 기반 위험 판단
        if (riskScore > 50) {
            Serial.println("위험 자세! LED ON");
            digitalWrite(ledPin, HIGH); // LED ON
        } else {
            digitalWrite(ledPin, LOW); // LED OFF
        }

        // 25ms마다 데이터 갱신
        static uint32_t prev_ms = millis();
        if (millis() > prev_ms + 25) {
            send_data_to_flask();  // 데이터 전송 함수 호출
            prev_ms = millis();
        }
    }

}
void send_data_to_flask() {
    // JSON 형식으로 데이터를 전송
    Serial.print("{");
    Serial.print("\"Yaw\": ");
    Serial.print(mpu.getYaw(), 2);
    Serial.print(", \"Pitch\": ");
    Serial.print(mpu.getPitch(), 2);
    Serial.print(", \"Roll\": ");
    Serial.print(mpu.getRoll(), 2);
    Serial.print(", \"GyroX\": ");
    Serial.print(mpu.getGyroX(), 2);
    Serial.print(", \"GyroY\": ");
    Serial.print(mpu.getGyroY(), 2);
    Serial.print(", \"GyroZ\": ");
    Serial.print(mpu.getGyroZ(), 2);
    Serial.println("}");
    delay(1000);
}
