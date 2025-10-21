# 북마크 클립보드 관리자 (Bookmark & Clipboard Manager)

프로젝트별 북마크와 클립보드를 효율적으로 관리하는 PWA 애플리케이션입니다.

## 📋 주요 기능

- 📁 **프로젝트 기반 조직화** - 프로젝트별로 북마크와 클립보드 항목 관리
- 📌 **클라우드 동기화** - Firebase Firestore를 통한 데이터 동기화
- 📱 **오프라인 지원** - Service Worker를 통한 오프라인 기능
- 🔍 **전역 검색** - 모든 프로젝트에서 빠른 검색
- 🎨 **템플릿 시스템** - 계층적 템플릿 및 변수 치환
- 📤 **Import/Export** - JSON 형식의 데이터 백업 및 복구
- 💾 **자동 저장** - 로컬 스토리지 + Firebase 자동 백업
- ⭐ **즐겨찾기** - TODAY 프로젝트에서 즐겨찾기 항목 모아보기

## 🚀 시작하기

### 설치

1. 저장소 클론
```bash
git clone https://github.com/smartyoni/BOOKMARK_CLIPBOARD.git
cd BOOKMARK_CLIPBOARD
```

2. 로컬 서버 실행 (또는 직접 index.html 열기)
```bash
# Python 3
python -m http.server 8000

# 또는 Node.js의 http-server
npx http-server
```

3. 브라우저에서 `http://localhost:8000` 접속

### Firebase 설정

1. `.env.example`을 복사하여 `.env` 파일 생성
```bash
cp .env.example .env
```

2. `.env` 파일에 Firebase 자격증명 입력
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

3. `.env` 파일이 `.gitignore`에 추가되어 있는지 확인 (이미 추가됨)

## 📱 PWA 설치

브라우저 주소 표시줄의 "설치" 버튼을 클릭하여 앱으로 설치할 수 있습니다.

### 지원하는 브라우저
- Chrome/Edge (Windows, macOS, Linux, Android)
- Firefox (모든 플랫폼)
- Safari (iOS 11+, macOS)

## 🔒 보안

- 보안 개선사항은 [SECURITY_IMPROVEMENTS.md](./SECURITY_IMPROVEMENTS.md) 참고
- Firebase 보안 규칙 설정 필수
- 환경변수를 통한 자격증명 관리

### 보안 우려사항 보고

보안 문제를 발견하면 GitHub Issues에서 보고하세요.

## 🛠️ 기술 스택

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** Firebase Firestore
- **Offline:** Service Worker
- **PWA:** Web Manifest

## 📁 프로젝트 구조

```
.
├── index.html              # 메인 애플리케이션
├── manifest.json           # PWA 매니페스트
├── sw.js                   # Service Worker
├── .env.example            # 환경변수 템플릿
├── .gitignore              # Git 무시 파일
├── README.md               # 이 파일
└── SECURITY_IMPROVEMENTS.md # 보안 개선 가이드
```

## 📊 데이터 구조

### Firebase Collections

**userdata/bookmark-app**
```javascript
{
  projects: {
    "Project Name": {
      bookmarks: [{
        id: string,
        text: string,
        color: string,
        favorite: boolean,
        createdAt: timestamp,
        type: string // 'bookmark' or 'divider'
      }],
      clipboard: [{ ... }]
    }
  },
  currentProject: string,
  projectOrder: string[],
  lastUpdated: ISO8601 date
}
```

## 🎯 주요 기능 사용법

### 프로젝트 생성
1. 왼쪽 사이드바 상단의 "+" 버튼 클릭
2. 프로젝트 이름 입력

### 북마크/클립보드 추가
1. 오른쪽 영역에서 해당 탭 선택
2. 텍스트 입력 후 "추가" 버튼 클릭

### 템플릿 사용
1. 우측 상단의 "템플릿" 버튼 클릭
2. 기존 템플릿 선택 또는 새 템플릿 생성
3. 변수 입력 후 적용

### 데이터 백업
1. 우측 상단 메뉴에서 "내보내기" 클릭
2. JSON 파일 다운로드

### 데이터 복구
1. 우측 상단 메뉴에서 "가져오기" 클릭
2. 백업 파일 선택

## 🔄 동기화

- **로컬 저장:** 변경 시 즉시 localStorage에 저장
- **Firebase 저장:** 변경 시 자동으로 Firebase에 전송
- **오프라인:** 오프라인 상태에서 변경사항 저장, 온라인 복귀 시 자동 동기화

## ⚙️ 개발

### 파일 편집
- HTML/CSS/JavaScript는 모두 `index.html`에 포함되어 있습니다.
- 수정 후 브라우저 새로고침으로 변경사항 확인

### 디버깅
브라우저 개발자 도구(F12)의 콘솔에서 확인할 수 있습니다.

### 번들링 (향후 개선)
- 모듈 분리 및 번들러 적용 예정
- TypeScript 도입 계획

## 📝 버전 이력

### v2.1.0 (2024-10-21)
- ✅ Firebase 자격증명 환경변수 관리 추가
- ✅ XSS 취약점 개선
- ✅ 보안 문서 추가
- ✅ .gitignore 추가

### v2.0.0
- 클립보드 요약 기능 추가
- 템플릿 시스템 개선

### v1.0.0
- 초기 버전

## 🤝 기여

개선사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

## 📄 라이센스

이 프로젝트의 라이센스는 [LICENSE](./LICENSE) 파일을 참고하세요.

## 🆘 트러블슈팅

### Firebase 연결 안 됨
- 네트워크 연결 확인
- Firebase 프로젝트 ID 확인
- 보안 규칙 확인

### 데이터가 동기화되지 않음
- 로컬 스토리지에는 저장되어 있음 (F12 > Application > Local Storage)
- Firebase 연결 상태 확인
- 브라우저 콘솔에서 에러 메시지 확인

### PWA 설치 안 됨
- manifest.json 로딩 확인
- HTTPS 사용 (localhost 제외)
- Service Worker 등록 확인

## 📞 문의

문제가 발생하면 GitHub Issues를 통해 질문해주세요.

---

**Made with ❤️ by smartyoni**
