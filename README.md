<img width="1907" height="929" alt="스크린샷 2026-01-06 084329" src="https://github.com/user-attachments/assets/bc76a155-1420-488c-abe3-352d23840acb" />
주요 특징
실시간 데이터 연동: Steam API를 활용하여 유저의 플레이 타임 TOP 10 정보를 정확하게 가져옵니다.

동적 배경 시스템: 게임 카드를 클릭하는 순간, 대시보드 전체 배경이 해당 게임의 고화질 아트워크로 부드럽게 전환됩니다.

직관적인 연결: 아이콘 하나로 스팀 상점 페이지에 바로 접속하거나 유저 프로필로 이동할 수 있습니다.

깔끔한 다크 디자인: 게임 감성에 최적화된 다크 모드 UI와 카드 레이아웃을 적용했습니다.: 다크 모드 기반의 세련된 디자인과 깔끔한 그리드 레이아웃을 제공합니다.

---

##  사용 기술 스택

### Frontend
* **React**: UI 컴포넌트 기반 개발
* **Axios**: 백엔드 API 통신
* **CSS3**: 커스텀 다크 테마 및 애니메이션

### Backend
* **Django**: RESTful API 서버 구축
* **Python**: Steam API 데이터 가공 및 서빙

---

##  시작하기

### 1. 환경 설정
프로젝트 최상위 폴더에 `.env` 파일을 생성하고 스팀 API 키를 입력합니다.
```
STEAM_API_KEY=your_api_key_here
```
### 2.백엔드 실행
```
cd backend
python manage.py runserver
```
### 프론트엔드 실행
```
cd front
npm install
npm start
```


