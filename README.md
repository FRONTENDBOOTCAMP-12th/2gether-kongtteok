# 🐰 말랑콩떡
### [🍡 배포 링크 바로가기](https://kongtteok.netlify.app)
### [✍️ 백로그 바로가기](https://github.com/orgs/FRONTENDBOOTCAMP-12th/projects/21)
### [📖 위키 바로가기](https://github.com/FRONTENDBOOTCAMP-12th/2gether-kongtteok/wiki)



## 1️⃣ 프로젝트 소개
### [피그마 시안](https://www.figma.com/design/jTFvdhEvinJLeauIHLBX1S/%EB%A7%90%EB%9E%91%EC%BD%A9%EB%96%A1?node-id=41-558&t=hdlP635Ubug00J3X-1)
### [플로우차트](https://www.canva.com/design/DAGgFfGZcVs/A-jixnLmFTtrGD8euXG-HA/edit)


## 2️⃣ 팀 정보

| 🍓 민준기 | 🍌 박혜미 | 🍑 김수정 |
| :------: | :------: | :------: |
| [<img src="https://github.com/FRONTENDBOOTCAMP-12th/2gether-kongtteok/blob/develop/public/images/emotion/angry.png?raw=true" width="100" height="100" alt="딸기 콩떡이" /> <br/> @wnsrl7250](https://github.com/wnsrl7250) |[<img src="https://github.com/FRONTENDBOOTCAMP-12th/2gether-kongtteok/blob/develop/public/images/emotion/happy.png?raw=true" width="100" height="100" alt="바나나 콩떡이" /> <br/> @bohyemian](https://github.com/bohyemian) | [<img src="https://github.com/FRONTENDBOOTCAMP-12th/2gether-kongtteok/blob/develop/public/images/emotion/exciting.png?raw=true" width="100" height="100" alt="복숭아 콩떡이" /> <br/> @peachily](https://github.com/peachily) |
  | - 스크럼 마스터 <br> - 로그인/회원가입 <br> - 통계 | - 일기 쓰기 <br> - 알림  | - 일기 보기 <br> - 프로필 <br> - 설정 |


## 3️⃣ 기술 스택
### Frontend
  : React v19, TypeScript, Vite, React Router, Zustand
### Styling & UI
  : Tailwind CSS v4, Swiper, Recharts
### API
  : OpenAI GPT-4o API
### Backend
  : Supabase
### Deployment
  : Netlify
### Code Quality
  : Prettier, ESLint


## 4️⃣ 주요 기능

- 회원가입

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![회원가입](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/signup.gif) | - useFormValidation 커스텀 훅을 사용하여 입력값 및 유효성 검사 관리 <br> - supabase에서 관심사 목록 불러오기 -> 사용자가 선택한 관심사 추적 |

- 로그인

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![로그인](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/signin.gif) | - 이메일과 비밀번호를 통한 사용자 인증 <br> - Supabase 인증 시스템 연동 <br> - Zustand로 로그인 상태 관리 및 유저 정보 저장 <br> - form 유효성 검사 |

- 메인

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![메인](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/main.gif) | - 로그인한 사용자 정보와 일기 데이터를 상태로 관리 <br> - 선택된 월의 시작일과 종료일을 계산하여 날짜 범위로 일기 데이터 필터링 <br> - 사용자 ID와 일치하는 데이터만 조회 <br> - 일기 데이터를 순회하며 감정별 발생 빈도 계산 <br> - Promise.all을 사용해 이번 달과 지난 달 데이터를 병렬로 요청하여 성능 최적화 <br> - 로딩 상태와 에러 처리로 사용자 경험 개선|

- 일기 쓰기

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![일기 쓰기](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/diarywrite.gif) | - 날씨, 감정, 제목, 내용을 필수 값으로 입력 <br> - form 전송 후 필수값 미입력 시 안내메세지 출력 |

- 일기 보기

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![일기 쓰기](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/diaryview.gif) | - URL에서 전달받은 diaryId 값으로 해당 일기의 상세 데이터를 요청하여 화면에 출력 <br> - 응답 받은 AI 메시지를 DB에 저장하여 재방문 시에도 동일한 피드백을 제공 |

- 프로필

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![프로필](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/profile.gif) | - users 테이블에서 전역 상태에 저장된 userId로 사용자 정보 요청 <br> - user_interests 테이블에서 userId를 키로 갖는 rows 조회 |

- 프로필 편집

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![프로필 편집](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/profileedit.gif) | - 사용자의 기존 프로필 정보를 불러오고, 관심사 목록과 함께 초기 상태를 구성 <br> - 프로필 이미지 supabase storage에 업로드 후 URL을 DB 컬럼에 저장 |

- 알림

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![알림](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/notification.gif) | - likes 테이블에서 created_at 날짜가 최근 일주일 이내인 내가 작성한 일기 id의 수를 카운트 |

- 설정

  | 동작 화면 | 기능 및 구현 방법 |
  | :------: | :------ |
  | ![설정](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/2gether-kongtteok/README/settings.gif) | - 로그인 시 저장되는 전역상태 초기화 후 로그인 화면으로 이동 <br> - user_id를 참조하는 모든 연관 데이터 삭제 <br> - theme을 전역상태로 관리하여 data-theme 속성 토글 |

