const { SerialPort } = require('serialport');  // SerialPort 모듈 가져오기
const { ReadlineParser } = require('@serialport/parser-readline');  // Readline 파서 모듈 가져오기

function createSerialParser(portPath,baudRate) {
  const port = new SerialPort({
    path: "COM5",  // 아두이노가 연결된 포트 확인 (COM3 또는 다른 포트명)
    baudRate: 115200,  // 아두이노와 동일한 BaudRate
    parser: new ReadlineParser({ delimiter: '\n' })  // 읽을 데이터 구분자 설정
  });
  
  // 데이터 파서 설정
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
  port.on('open', () => {
    console.log('Serial Port Opened');
  });
  
}
  

  