# 프로젝트 컨텍스트

## 프로젝트 개요
김실장넷은 병원 상담실장과 코디네이터에 대한 평판을 공유하는 폐쇄형 커뮤니티 플랫폼입니다.

## 핵심 기능
1. 의사면허증/사업자번호 기반 인증
2. 5개 메트릭 기반 평가 시스템 (전문성, 소통능력, 책임감, 협업능력, 친절도)
3. 평가 작성 후 열람 가능한 상호 평가 시스템
4. 익명 평가 기능
5. 레이더 차트를 통한 시각화

## 기술 스택
- Frontend: Next.js 15, TypeScript, Tailwind CSS
- Backend: Next.js API Routes, Prisma ORM
- Database: PostgreSQL
- Authentication: NextAuth.js v5
- Architecture: Domain-Driven Design (DDD)

## 도메인 엔티티
- User: 병원 관계자
- Coordinator: 상담실장/코디네이터
- Review: 평가
- ReviewView: 평가 조회 기록

## 현재 구현 상태
✅ 완료:
- DDD 아키텍처 설계
- 인증 시스템 (NextAuth.js)
- 평가 시스템 (5개 메트릭)
- 레이더 차트 시각화
- 법적 고지사항 페이지
- UI/UX 구현

🔄 진행 중:
- 검증 API 인터페이스 (Mock 구현)

⏳ 예정:
- 파일 업로드 처리
- 관리자 승인 프로세스
- 실제 검증 API 연동

## 주요 제약사항
- 병원 관계자만 가입 가능
- 평가 작성 후에만 열람 가능
- 익명성 보장 필수
- 개인정보보호법 준수

## 운영 정보
- 운영 주체: 에이젠틀리 (개인사업자, 대표: 황준엽)
- 법적 고지사항 완비
- 보안 가이드라인 수립