# 바르미(팀명 : Bareumi)

## 💥서비스 소개
* 서비스명 : 개인맞춤형 자세 교정 모바일 서비스
* 서비스 설명 : 불량자세를 취할 시 개인에게 알림을 제공하고, 딥러닝으로 패턴을 분석하여 사용자가 올바른 자세를 유지하도록 도움을 주는 서비스 
    <br/>
## 🎈프로젝트기간
2024.12.09~2024.12.19(2주)
    <br/>
## ✨주요기능
* 주제: 9축자이로센서를 사용해 사용자가 직접 제품을 착용하여 척추교정의 도움을 주는 웹/앱 서비스
* 딥러닝과 GPT API를 사용하여 사용자 개인맞춤형 교정서비스 제공
* 사용자가 앱에서 센서시작을 누르면 일일알림 데이터를 모아 딥러닝 모델이 측만증 현황을 알려줌
* 누적된 데이터를 이용해 GPT API로 상태 문장과 네이버쇼핑몰과 연동하여 맞춤 상품 추천
    <br/>
## 🔨기술스택
<table>
    <tr>
        <th>구분</th>
        <th>내용</th>
    </tr>
    <tr>
        <td> IoT</td>
        <td>
            <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white"/> 
        </td>
    </tr>
    <tr>
        <td> Front End</td>
        <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
        </td>
    </tr>
    <tr>
        <td> BackEnd</td>
        <td>
           <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white"/>
            <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
        </td>
    </tr>
    <tr>
        <td>DB </td>
        <td>
            <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>  
          <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
        </td>
    </tr>
    <tr>
        <td> API</td>
        <td>
            GPT API, Naver쇼핑몰 API
        </td>
    </tr>
    <tr>
        <td>DeepRunning</td>
        <td>
           CNN Model
        </td>
    </tr>
        <tr>
        <td> DesignTool</td>
        <td>
             <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
        </td>
    </tr>
</table>
<br>

## 🎉시스템 아키텍처
![image](https://github.com/user-attachments/assets/323dbf8f-54df-4a07-afe6-e8ba2e81a73f)
    <br/>
## 🖼유스케이스
![image (1)](https://github.com/user-attachments/assets/5bc90350-59ea-43f6-b602-0413c6d9c8e3)
    <br/>
## 📊서비스 흐름도
* 메인화면 접속 프로세스
      <br/>
  ![image](https://github.com/user-attachments/assets/b63f2b0f-3ed9-4cbb-83d5-a644f4a4a9ed)
* 맞춤 서비스 접속  프로세스
      <br/>
  ![image](https://github.com/user-attachments/assets/7ca1cdb1-6da2-43da-bcb8-41ca03a2cfaf)
* 마이페이지 프로세스
      <br/>
  ![image](https://github.com/user-attachments/assets/b13b94ce-829a-4f61-89f3-61bd7a0f49b3)

## 🗂ER 다이어그램
![image](https://github.com/user-attachments/assets/06a77ce6-85b4-4f0d-84bd-5d6ae234d3c6)
    <br/>
## 📱화면구성
* 메인페이지
   <br/>
![image](https://github.com/user-attachments/assets/0516ecf3-cdaa-4e5b-8fd9-fd992ab42bb1)

* 기록 페이지
    <br/>
![KakaoTalk_20241220_113427635](https://github.com/user-attachments/assets/35277d69-9f23-477a-bb06-55ae1e973b3d)

* 알림설정페이지
    <br/>
![KakaoTalk_20241220_113427635_03](https://github.com/user-attachments/assets/ccc57ce7-69cf-4e38-9aa4-56982132eb23)

* 사용자설정 페이지
    <br/>
![KakaoTalk_20241220_113427635_02](https://github.com/user-attachments/assets/3b7871a9-e951-4e0c-870f-94b8d2a1f448)

* 맞춤제품 추천 페이지
    <br/>
![KakaoTalk_20241220_113427635_01](https://github.com/user-attachments/assets/c873c01f-d2ae-4857-930b-ea0a85046d66)
    <br/>
## 👨‍👩‍👧‍👧팀원역할
<table>
  <tr>
    <td align="center"><strong>김보라</strong></td>
    <td align="center"><strong>김옥현</strong></td>
    <td align="center"><strong>송건창</strong></td>
    <td align="center"><strong>전정우</strong></td>
    <td align="center"><strong>정제원</strong></td>
    <td align="center"><strong>한승찬</strong></td>
  </tr>
  <tr>
    <td align="center"><b>IoT 설계 및 제작, 서류 작성, Back-End</b></td>
    <td align="center"><b>Notion 관리, 서류 작성</b></td>
    <td align="center"><b>Front-End, 개발 및 디자인</b></td>
    <td align="center"><b>아이디어 제안, 서류 작성</b></td>
    <td align="center"><b>Back-End, Front-End, 디자인, 발표</b></td>
    <td align="center"><b>Notion 관리, IoT 회로구성, 딥러닝, PPT 제작, 시연영상</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/bongbong1234/bareumi/edit/master" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/자신의username작성해주세요" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/Song-geon-chang" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/envy-logi" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/CingDam" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/halong61" target='_blank'>github</a></td>
  </tr>
</table>

    <br/>
## 💢트러블슈팅
- 문제1
  * 자이로센서의 값이 불안정하게 출력되어서 어려움이 있었는데,  컴플리멘터리 필터를 적용하여 일정한 센서값은 출력받음 
![image](https://github.com/user-attachments/assets/e400f8e7-fcda-44c6-9dce-98a6818eecb5)

- 문제2
  * Webserver와 센서 연동에 어려움이 있었는데, WebSocket을 사용하여 통신에 성공함
    

