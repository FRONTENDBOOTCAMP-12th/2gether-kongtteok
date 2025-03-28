# 🐰 힐링공간 일기 서비스앱 말랑콩떡

## 프로젝트 소개

개발 기간 : 2025.02.24 ~ 2025.03.24

배포 링크 : https://kongtteok.netlify.app

테스트 ID : test1@naver.com

테스트 PW : asdf1234@

말랑콩떡은 감정을 기록하고 서로 공감하는 특별한 일기 서비스 앱입니다. 단순한 일기 작성을 넘어 감정의 깊이를 이해하고 공유할 수 있는 플랫폼입니다.

- 하루의 감정을 기록할 수 있는 직관적인 일기 작성 인터페이스
- AI가 사용자의 일기를 읽고 따뜻하고 공감적인 위로와 조언 제공
- 날짜별 감정 상태를 한눈에 볼 수 있는 캘린더 기능
- 월별 감정 분포와 감정 변화를 그래프로 제공

향후 계획

- 다른 유저의 일기 둘러보기 기능
- 사용자 간 쪽지 기능

## 팀원 구성

 <div align="center">

|                                 [🍓 민준기](https://github.com/wnsrl7250)                                 |                                [🍌 박혜미](https://github.com/bohyemian)                                 |                                 [🍑 김수정](https://github.com/peachily)                                  |
| :-------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/103577262?v=4" height="100" style="border-radius:50%;"> | <img src="https://avatars.githubusercontent.com/u/31885579?v=4" height="100" style="border-radius:50%;"> | <img src="https://avatars.githubusercontent.com/u/182451123?v=4" height="100" style="border-radius:50%;"> |
|              스크럼 마스터 <br> 로그인 <br> 회원가입 <br> 캘린더 <br> 통계 <br> 일기 리스트               |                                  공통 컴포넌트 <br> 일기 쓰기 <br> 알림                                  |                                      일기 상세 <br> 프로필 <br> 설정                                      |

</div>

## 개발 환경

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) <br>
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white)

### Backend

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### Styling & UI

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=recharts&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-0C4B8D?style=for-the-badge&logo=swiper&logoColor=white)

### API

![OpenAI](https://img.shields.io/badge/OpenAI-00A3E0?style=for-the-badge&logo=openai&logoColor=white)

### Version Control System

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

### Deployment

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

### Code Quality

![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

### [커밋컨벤션](https://github.com/FRONTENDBOOTCAMP-12th/2gether-kongtteok/wiki/%EA%B9%83-%EC%BB%A8%EB%B2%A4%EC%85%98)

### [코드컨벤션](https://github.com/FRONTENDBOOTCAMP-12th/2gether-kongtteok/wiki/%EC%BD%94%EB%94%A9-%EC%BB%A8%EB%B2%A4%EC%85%98)

## 디자인

### [피그마 시안](https://www.figma.com/design/jTFvdhEvinJLeauIHLBX1S/%EB%A7%90%EB%9E%91%EC%BD%A9%EB%96%A1?node-id=2-11&p=f&t=0pvu7c4BClktfzfR-0)

## 플로우 차트

## 주요 기능

### [회원가입]

|                                                                  동작 화면                                                                   | 기능                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="회원가입 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/signup.gif"> | - 이메일과 비밀번호, 닉네임을 입력하면 validation에 따른 유효성 검사가 진행되고 경고 문구를 하단에 표시 <br> - 이메일과 닉네임 입력 후 중복 확인 버튼을 누르면 중복된 이메일, 닉네임인지 확인 <br> - 관심사를 최대 3개까지 선택 가능 <br> - 이메일, 비밀번호, 닉네임의 유효성 검사를 통과하고 관심사를 한개 이상 골라야 회원가입 버튼이 활성화 |

### [로그인]

|                                                                 동작 화면                                                                  | 기능                                                                                                                                                       |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="로그인 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/signin.gif"> | - 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭 <br> - 로그인 버튼 클릭 시 일치하지 않을 경우 경고 문구가 나타나고, 로그인에 성공하면 메인 화면으로 이동 |

### [메인]

|                                                               동작 화면                                                                | 기능                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="메인 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/main.gif"> | - 월별 캘린더 UI 제공 <br> - 월 선택 기능을 통해 원하는 월로 쉽게 이동 가능 <br> - 캘린더의 특정 날짜 선택 시 해당 날짜에 일기가 없다면 일기 작성 화면으로, 일기가 있다면 일기 상세 화면으로 이동 <br> - 작성된 일기의 감정 상태가 자동으로 캘린더에 반영 <br> - 현재 달의 전체 감정 분포를 시각적 그래프로 제공 <br> - 이번 달과 지난 달의 감정 분포를 나란히 비교하는 파이 그래프 제공함으로써 감정 변화 트렌드를 한눈에 확인 가능 <br> - 리스트보기 클릭 시 일기 목록 페이지로 이동 |

### [일기 작성]

|                                                                     동작 화면                                                                     | 기능                                                                                                                                                                                                                                                         |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="일기 작성 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/diarywrite.gif"> | - 하루에 하나의 일기만 작성 가능 <br> -오늘 하루의 감정 (설렘, 행복, 뿌듯, 괜찮음, 피곤, 우울, 화남, 슬픔)과 날씨 선택 <br> - 일기 제목과 일기 내용 작성 (최대 500자) <br> - 일기의 공개/비공개 여부 선택 가능 <br> - 여러 장의 사진 업로드 가능 (선택 사항) |

### [일기 상세]

|                                                                    동작 화면                                                                     | 기능                                                                                                                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="일기 상세 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/diaryview.gif"> | - 작성한 일기의 상세한 내용 확인 가능 <br> - 첨부된 이미지가 여러장이면 슬라이드로 좌우 넘김 가능 <br> - 일기 수정 및 삭제 가능 <br> - 해당 일기의 좋아요 수 확인 가능 <br> - 말랑이의 응원 받기 버튼 클릭 시 해당 일기에 대한 개인화된 응원 메시지를 AI가 제공 |

### [프로필]

|                                                                  동작 화면                                                                  | 기능                                                                                                                                                      |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="프로필 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/profile.gif"> | - 사용자의 정보 제공 (프로필 이미지, 닉네임, 인사말, 관심사) <br> - 사용자가 작성한 일기 목록 확인 가능 <br> - 각 일기를 클릭하여 상세 페이지로 이동 가능 |

### [프로필 편집]

|                                                                      동작 화면                                                                       | 기능                                                                                                                                                                                                                                                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="프로필 편집 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/profileedit.gif"> | - 프로필 이미지 선택 시 바텀시트 호출 <br> - 바텀시트에서 이미지 편집, 이미지 삭제 선택 <br> - 닉네임 입력 후 확인하기 버튼 클릭 시 validation에 따라 유효성 검사, 닉네임 중복 확인 <br> - 검사 결과에 따른 메시지를 입력창 하단에 표시 <br> - 소개글, 관심사 변경 가능 <br> - 닉네임 유효성 검사를 통과하고 관심사를 최소 1개 이상 선택해야 저장하기 버튼 활성화 |

### [알림]

|                                                                   동작 화면                                                                   | 기능                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="알림 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/profileedit.gif"> | - 사용자의 일기에 대한 상호작용 알림 제공 <br> - 최대 일주일 동안 알림 보관 <br> - 좋아요를 누른 사용자의 프로필 이미지, 좋아요를 누른 날짜, 좋아요를 누른 일기의 날짜 제공 |

### [설정]

|                                                                 동작 화면                                                                  | 기능                                                                                                                                                                                                                       |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" alt="알림 화면" src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/settings.gif"> | - 프로필 편집 화면으로 이동 가능 <br> - 화면의 색상 테마를 어두운 모드로 전환 가능 <br> - 로그아웃 클릭 시 모달창으로 사용자에게 한번 더 확인 <br> - 로그아웃 성공 시 로그인 화면으로 이동 <br> - 회원탈퇴도 동일하게 동작 |
