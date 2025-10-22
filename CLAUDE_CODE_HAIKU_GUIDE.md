# Claude Code - Haiku 모델 사용 가이드

## 개요
이 프로젝트에서 Claude Code를 사용할 때는 **항상 Haiku 모델**을 사용합니다.

## 모델 설정 방법

### 1. Claude Code에서 모델 변경하기
Claude Code 사용 시 모델을 변경하려면:

```bash
claude code --model claude-haiku-4-5-20251001
```

또는 Claude Code 내 설정에서 모델을 선택할 수 있습니다.

### 2. 기본 설정으로 만들기 (권장)
`.claude/settings.local.json` 파일에서 다음과 같이 설정:

```json
{
  "model": "claude-haiku-4-5-20251001"
}
```

## 사용 가능한 Haiku 모델
- **claude-haiku-4-5-20251001** (최신 버전) ✅ 추천

## 왜 Haiku를 사용하나?
- ⚡ 빠른 응답 속도
- 💰 낮은 비용
- 🎯 대부분의 개발 작업에 충분한 성능
- 🔄 반복적인 개발 작업에 최적화

## 체크리스트
- [ ] Claude Code 실행 전 모델 확인
- [ ] 모델을 항상 claude-haiku-4-5-20251001로 설정
- [ ] 자동 설정을 위해 .claude/settings.local.json 구성

## 참고사항
Claude Code를 실행할 때마다 이 가이드를 참고하여 모델 설정을 확인하세요.
