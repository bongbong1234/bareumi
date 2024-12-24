#include "MPU9250.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <WebSocketsClient.h>

MPU9250 mpu;

const char* ssid = "AICAM_301B"; //WiFi의 이름 => ESP32는 와이파이 주파수가 2.4Ghz밖에 못씀
const char* password = "a123456789"; // 와이파이의 비밀번호 
const char* websocketServer = "127.0.0.0";  // Flask 서버 IP
const int websocketPort = 5000;

WebSocketsClient webSocket;

// MPU9250 객체 생성
MPU9250 mpu;



// 초기값 저장 변수
float initialYaw = 0.0, initialPitch = 0.0, initialRoll = 0.0; // 초기
bool isInitialized = false; // 초기값 설정 여부 플래그

// 필터링된 Pitch, Roll 값
float filteredPitch = 0.0;
float filteredRoll = 0.0;

// 필터 상수 (자이로와 가속도에 대한 가중치 비율)
const float alpha = 0.98; // 자이로 98%, 가속도 2%의 가중치를 부여

// 기울어진 상태 유지 시간 확인을 위한 변수~
unsigned long tiltStartTime = 0; // 기울어진 상태가 시작된 시간
bool isTilted = false;           // 현재 기울어진 상태 여부를 나타내는 플래그

// 핀 정의
const int ledPin = 13; // LED 또는 전구 연결 핀

// 깜박임 제어 변수
unsigned long lastBlinkTime = 0;  // 마지막 깜박임 시간
bool ledState = LOW;               // LED 상태 (켜짐/꺼짐)
unsigned long blinkInterval = 1000; // 깜박임 간격 (1초)


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

void setup() {
    Serial.begin(115200); // 시리얼 통신 시작
    Wire.begin();         // I2C 통신 초기화
    delay(2000);          // 센서 초기화 대기 시간
    Serial.println("{\"status\":\"initial_values_captured\"}");

    // MPU9250 초기화 확인
    if (!mpu.setup(0x68)) {  // MPU9250의 I2C 주소 (기본값: 0x68)
        while (1) {
            Serial.println("MPU connection failed. Please check your connection.");
            delay(5000); // 5초 간격으로 연결 실패 메시지 출력
        }
    }

    pinMode(ledPin, OUTPUT); // LED 핀을 출력 모드로 설정
    digitalWrite(ledPin, LOW); // 초기 LED 상태 OFF

    Serial.println("MPU9250 initialized successfully!");
}

void loop() {
    // MPU 데이터 갱신
    if (mpu.update()) {
        // 초기값 설정 (최초 한 번만 실행)  
        // 자이로에서 각속도 추출 (Pitch, Roll 각속도)
        float gyroYaw = mpu.getGyroZ();
        float gyroPitchRate = mpu.getGyroX(); // Pitch 각속도
        float gyroRollRate = mpu.getGyroY();  // Roll 각속도

        // 가속도에서 Pitch, Roll 계산
        float accelPitch = atan2(mpu.getAccY(), mpu.getAccZ()) * 180 / M_PI; 
        float accelRoll = atan2(-mpu.getAccX(), sqrt(mpu.getAccY() * mpu.getAccY() + mpu.getAccZ() * mpu.getAccZ())) * 180 / M_PI; 

        // 컴플리멘터리 필터 적용
        filteredPitch = alpha * (filteredPitch + gyroPitchRate * 0.01) + (1 - alpha) * accelPitch;
        filteredRoll = alpha * (filteredRoll + gyroRollRate * 0.01) + (1 - alpha) * accelRoll;

        if (!isInitialized) {
            initialPitch = filteredPitch;
            initialRoll = filteredRoll;
            isInitialized = true; // 초기값 설정 완료 플래그
            Serial.println("Initial values captured:");
            Serial.print("Pitch: "); Serial.println(initialPitch, 2);
            Serial.print("Roll: "); Serial.println(initialRoll, 2);
        }

    
        // 기울기 상태 LED 제어
        if (abs(filteredPitch - initialPitch) > 4.0 || abs(filteredRoll - initialRoll) > 0.4) {
            digitalWrite(ledPin, HIGH); // LED ON
        } else {
            digitalWrite(ledPin, LOW); // LED OFF
        }

        // 현재 상태 출력
        //Serial.print("Pitch: "); Serial.println(initialPitch, 2);
        //Serial.print("Roll: "); Serial.println(initialRoll, 2);
        Serial.print("{");
        Serial.print("\"Yaw\": ");  Serial.print(mpu.getYaw(), 2);
        Serial.print(", \"FilteredPitch\": "); Serial.print(filteredPitch, 2);
        Serial.print(", \"FilteredRoll\": "); Serial.print(filteredRoll, 2);
        Serial.print(", \"GyroX\": "); Serial.print(mpu.getGyroX(), 2);
        Serial.print(", \"GyroY\": "); Serial.print(mpu.getGyroY(), 2);
        Serial.print(", \"GyroZ\": "); Serial.print(mpu.getGyroZ(), 2);
        Serial.println("}");

        filteredRoll = 0, filteredPitch = 0;

    } else {
        Serial.println("Failed to update MPU9250 data.");
    }

    delay(1000); // 10ms 간격으로 데이터 출력
}
