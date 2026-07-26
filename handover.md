# Pack Prep Tools — handover.md

> 이 문서는 `packpreptools.com` 프로젝트의 유일한 기준 문서다.
> 회사와 집 어디서 작업하든 GitHub `main` 브랜치와 이 파일을 기준으로 이어서 진행한다.
> 작업 시작 전 전체를 읽고, 작업 완료 전 현재 상태와 다음 작업을 갱신한다.

---

## 1. 프로젝트 정보

| 항목 | 내용 |
|---|---|
| 사이트 | https://packpreptools.com/ |
| GitHub 저장소 | https://github.com/canghun13/packpreptools |
| Git remote | https://github.com/canghun13/packpreptools.git |
| 브랜드 | Pack Prep Tools |
| 공개 언어 | 영어 |
| 문서 언어 | 한국어 |
| 기술 스택 | 정적 HTML / CSS / Vanilla JavaScript |
| 호스팅 | GitHub Pages |
| DNS / CDN / SSL | Cloudflare |
| GA4 | G-XR7JWJ36CD |
| 연락 이메일 | canghun13@naver.com |
| 수익화 | Google AdSense 우선 |
| 기준일 | 2026-07-26 |

### 고정 사항

- 도메인, 브랜드, GA4 ID, 이메일을 임의 변경하지 않는다.
- React, Vue, Next.js, Astro, PHP, CMS, 데이터베이스를 도입하지 않는다.
- 유료 API와 월 고정비 서비스를 추가하지 않는다.
- 다른 프로젝트의 디자인과 코드를 그대로 복사하지 않는다.
- 기존 CNAME, GitHub Pages, Cloudflare 관련 파일을 임의 삭제하지 않는다.

---

## 2. 사이트 목적

Pack Prep Tools는 온라인 판매자와 소형 브랜드가 완성된 상품을 포장하고 출고 준비할 때 사용하는 계산기와 참고 자료 사이트다.

### 핵심 범위

- 상품에 맞는 박스 크기
- Dimensional weight
- Length + girth
- 박스 내부 빈 공간
- 버블랩, 포장지, 테이프 사용량
- 폴리메일러 크기
- 주문당 포장 원가
- 포장 작업시간과 처리량
- 포장재 필요 수량과 재고 계획
- Case pack과 carton count

### 제외 범위

- 실시간 택배 요금 조회
- 운송장 구매 및 배송 예약
- 특정 운송사 계약 요금
- 통관, 관세, 세금 자동 계산
- 위험물, 의약품, 식품, 냉장·냉동 규제 포장
- 로그인, 사용자 데이터 저장, 주문관리시스템
- 법적 또는 규제 적합성 보증

---

## 3. Maker Print Tools와의 경계

### Maker Print Tools

- 3D 프린팅 제작
- 필라멘트 사용량과 비용
- 출력 시간
- 인필과 서포트
- 프린터 전기료
- 3D 출력물 판매가격과 손익분기

### Pack Prep Tools

- 완성된 상품의 포장
- 박스와 메일러 치수
- DIM weight
- 완충재와 테이프 사용량
- 포장 원가와 인건비
- 포장 작업량과 출고 준비

### 금지

- Pack Prep Tools에 필라멘트, 프린터 설정, 인필, 출력 시간, 3D 모델 스케일 계산기를 넣지 않는다.
- Maker Print Tools의 로고, 색상, 헤더, 카드, 계산기 UI를 복사하지 않는다.
- Pack Prep Tools는 포장 작업대, 상자 치수선, 패킹 슬립, 배송 라벨, 자재 태그를 연상시키는 독립 디자인을 사용한다.

---

## 4. 회사·집 작업 규칙

### 새 PC에서 최초 시작

```bash
git clone https://github.com/canghun13/packpreptools.git
cd packpreptools
git branch --show-current
git remote -v
git pull --ff-only origin main
```

`origin`은 반드시 다음 주소여야 한다.

```text
https://github.com/canghun13/packpreptools.git
```

### 매 작업 시작 전

```bash
git status
git branch --show-current
git remote -v
git log -5 --oneline
git pull --ff-only origin main
```

단, 미커밋 변경이 있으면 먼저 아래를 확인한다.

```bash
git status
git diff
git diff --staged
```

### 금지

- `git reset --hard`
- `git checkout .`
- 의미를 확인하지 않은 stash
- 기존 사용자 수정사항 무단 삭제
- 다른 프로젝트 저장소에서 작업
- origin을 확인하지 않고 push

### 작업 완료 전

```bash
git status
git diff --check
```

QA 통과 후:

```bash
git add .
git commit -m "Describe completed Pack Prep Tools work"
git push origin main
```

### 운영 원칙

- GitHub `main`과 이 문서가 기준이다.
- 채팅 기억이나 로컬 메모를 기준으로 삼지 않는다.
- 작업 종료 시 미커밋 변경을 남기지 않는 것을 원칙으로 한다.
- push 실패 시 원인을 숨기지 말고 정확한 명령을 기록한다.

---

## 5. 디자인 기준

### 방향

Packing bench / measurement station / order prep worksheet

### 원칙

- 일반 SaaS 랜딩페이지처럼 만들지 않는다.
- 모든 섹션을 같은 흰색 둥근 카드로 반복하지 않는다.
- 결과 영역은 포장 사양서나 작업표처럼 명확하게 만든다.
- 숫자와 단위의 가독성을 장식보다 우선한다.
- 로고 영역이 줄바꿈되거나 눌리지 않게 한다.
- `%`, `in`, `cm`, `lb`, `kg`, `ft²` 같은 suffix를 입력값과 분리해 안정적으로 표시한다.
- 이미지 없이도 전문적인 포장 도구 사이트로 보이게 한다.

### 반응형 기준

반드시 아래 폭에서 확인한다.

- 1440px
- 1280px
- 1024px
- 768px
- 390px

검사 항목:

- 로고 깨짐 없음
- 메뉴 겹침 없음
- 입력 라벨과 단위 줄바꿈 이상 없음
- 버튼 잘림 없음
- 결과표 가로 넘침 없음
- 모바일 가로 스크롤 없음
- About, Contact, Privacy 여백 정상
- Footer 링크 누락 없음

---

## 6. Phase 1 범위

### 기본 페이지

- Homepage
- Tools
- Guides
- Reference
- About
- Contact
- Privacy
- 404

### 계산기 10개

1. Dimensional Weight Calculator
2. Length + Girth Calculator
3. Box Size Calculator
4. Box Volume Calculator
5. Void Fill Calculator
6. Bubble Wrap Calculator
7. Packing Paper Calculator
8. Tape Usage Calculator
9. Poly Mailer Size Calculator
10. Packaging Cost per Order

### Guides 4개

1. How to Measure a Box Correctly
2. Dimensional Weight Explained for Small Sellers
3. How Much Clearance Should Packaging Have?
4. How to Reduce Packaging Cost per Order

### Reference 4개

1. Package Measurement Terms
2. Common Packaging Materials and Uses
3. Dimensional Weight Divisors
4. Box Dimensions: Internal vs External

### Phase 1 예상 공개 HTML

26개

---

## 7. 계산기 페이지 필수 구성

각 계산기 페이지에는 반드시 다음이 있어야 한다.

1. 고유한 H1
2. 용도 설명
3. 명확한 입력 라벨과 단위
4. Calculate 버튼
5. Reset 버튼
6. 결과 요약
7. 공식 또는 계산 방식
8. Worked example
9. 결과 해석
10. Assumptions and limitations
11. 관련 계산기 링크
12. Guide 또는 Reference 링크
13. Last reviewed 날짜
14. 필요한 경우 estimate only 안내

### 오류 처리

- 빈 값
- 0 또는 음수
- NaN
- Infinity
- 지나치게 큰 값
- 제품이 박스보다 큰 경우
- 단위 전환
- 소수점 반올림
- Reset 후 초기화
- 모바일 숫자 키패드
- suffix 줄바꿈

---

## 8. GA4

모든 색인 가능한 공개 HTML의 `<head>`에 아래 코드를 넣는다.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XR7JWJ36CD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XR7JWJ36CD');
</script>
```

### 검증

- 모든 공개 HTML에서 `G-XR7JWJ36CD`를 자동 검사한다.
- 다른 GA4 ID가 한 건이라도 있으면 QA 실패다.
- 사용자가 입력한 실제 값은 Analytics로 전송하지 않는다.

---

## 9. SEO 기준

모든 색인 가능한 HTML에 적용한다.

- 고유 title
- 고유 meta description
- self-referencing canonical
- H1 1개
- viewport
- Open Graph
- favicon
- GA4
- Header / Footer
- 내부 링크
- 정적 JSON-LD

### 구조화 데이터

계산기:

- WebApplication
- BreadcrumbList

Guide / Reference:

- Article 또는 적절한 문서 schema
- BreadcrumbList

### sitemap.xml

- 색인 가능한 절대 URL만 포함
- 404 제외
- canonical과 일치
- 삭제된 URL 제거
- 중복 URL 제거

### robots.txt

- 공개 페이지를 불필요하게 차단하지 않는다.
- sitemap 절대 URL을 포함한다.

### llms.txt

- 사이트 목적
- 주요 허브
- 계산 결과 한계
- 연락처
- sitemap 위치

---

## 10. Header / Footer 기준

### Header

- Home
- Tools
- Guides
- Reference
- About

### Footer

- Tools
- Guides
- Reference
- About
- Contact
- Privacy

### Footer 필수 문구

- 계산 결과는 추정치
- 실제 운송사, 마켓플레이스, 포장재 제조사 조건 확인 안내
- 저작권 연도
- Pack Prep Tools

### 공통 partial 주의

- 각 HTML의 head SEO는 정적으로 유지한다.
- partial 로딩 실패로 페이지 전체가 깨지지 않게 한다.
- 루트와 하위 폴더에서 상대경로를 모두 검증한다.

---

## 11. QA Quality Gate

### 자동 QA

- 모든 공개 HTML 파싱 가능
- title 누락 없음
- meta description 누락 없음
- canonical 누락 또는 중복 없음
- H1 누락 또는 중복 없음
- GA4 누락 없음
- 잘못된 GA4 ID 없음
- 중복 ID 없음
- 깨진 내부 링크 없음
- 존재하지 않는 CSS / JS 참조 없음
- JavaScript 문법 오류 없음
- sitemap 누락 또는 중복 없음
- robots와 sitemap 연결 정상
- 404가 sitemap에 없음
- localhost, 임시 도메인, 다른 프로젝트 도메인 없음
- TODO, placeholder, lorem ipsum 없음

### 계산 검증

각 계산기마다 최소:

- 정상값 2개
- 경계값 1개
- 오류값 1개
- 단위 전환 양방향 검증
- 독립적으로 계산한 expected 값 비교

### 브라우저 QA

확인 페이지:

- Homepage
- Tools
- Guides
- Reference
- 계산기 10개
- Guide 2개 이상
- Reference 2개 이상
- About
- Contact
- Privacy
- 404

확인 폭:

- 1440
- 1280
- 1024
- 768
- 390

### 완료 금지 조건

아래 중 하나라도 있으면 완료라고 보고하지 않는다.

- 계산기 버튼 미동작
- NaN 또는 Infinity
- suffix 줄바꿈
- 헤더 로고 깨짐
- 모바일 가로 스크롤
- Footer 링크 누락
- About, Contact, Privacy 레이아웃 깨짐
- 다른 프로젝트 도메인 또는 GA4 ID 잔존
- sitemap과 실제 페이지 불일치
- JS 콘솔 오류
- 테스트하지 않은 계산 로직
- 얇은 계산기 설명

---

## 12. 낭비 방지 규칙

### 디자인 재작업 방지

- 디자인 시스템을 먼저 확정한다.
- Homepage와 대표 계산기 1개를 먼저 완성한다.
- 1440px와 390px에서 확인한 뒤 나머지에 확장한다.
- 대량 생성 후 전면 재설계하지 않는다.

### 페이지 누락 방지

- Header와 Footer 메뉴를 고정한다.
- 모든 페이지에서 About, Contact, Privacy 접근성을 검사한다.
- orphan page를 허용하지 않는다.

### 잘못된 일괄 치환 방지

- 전체 치환 전 git diff를 확인한다.
- canonical, JSON-LD, href, 계산기 ID는 치환 후 전수 검사한다.
- 다른 프로젝트 브랜드, 도메인, 이메일, GA4 ID를 검색한다.

### 계산식 복붙 오류 방지

- 계산기별 실제 입력 ID만 읽는다.
- 존재하지 않는 DOM 요소를 공통 함수가 읽지 않게 한다.
- 계산 공식은 별도 검증 스크립트에서 다시 계산한다.
- 단위 변환 로직은 한곳에서 관리한다.

### 캐시 혼동 방지

화면이 이상해도 바로 코드를 다시 고치지 않는다.

먼저 확인:

1. 원격 main 커밋
2. GitHub Pages 배포 상태
3. 실제 HTTP 응답
4. Cloudflare 캐시
5. 강력 새로고침
6. 시크릿 창

### 토큰 낭비 방지

- Phase 1 완료 전 Phase 2를 시작하지 않는다.
- 구조 확정 전 대량 페이지를 만들지 않는다.
- 통과한 영역을 이유 없이 전면 재작성하지 않는다.
- 작업 범위를 벗어난 추가 개선을 임의로 하지 않는다.

---

## 13. Phase 로드맵

### Phase 1 — Foundation Build

- 기본 페이지 8개
- 계산기 10개
- Guides 4개
- Reference 4개
- 디자인, SEO, QA 기반
- HIGH 위험 0

### Phase 2 — Seller Operations Expansion

후보:

- Carton Count Calculator
- Case Pack Calculator
- Packaging Material Budget
- Order Packing Time
- Labor Capacity per Shift
- Reorder Point for Packaging Supplies
- Box Utilization
- Multi-item Box Fit
- Label Cost Calculator
- Insert Quantity Calculator
- Packaging Waste Allowance
- Monthly Packaging Spend

Phase 1 완료 전 시작하지 않는다.

### Phase 3 — Fulfillment and Bulk Prep

후보:

- Pallet Layer Count
- Cases per Pallet
- Pallet Height
- Carton Cube
- Master Carton Planning
- Kitting Cost
- Bundle Packing Cost
- Prep Batch Estimator

### Phase 4 — 운영 데이터 기반 보강

GSC와 GA4 데이터가 쌓인 뒤 검토한다.

- 실제 노출 검색어
- 검색 순위
- 계산 실행률
- 이탈 페이지
- 색인 상태
- thin content
- 내부 링크
- AdSense 준비 상태

---

## 14. 현재 상태

### 완료

- [x] 도메인 설정
- [x] GitHub 저장소 생성
- [x] GitHub Pages 기본 설정
- [x] Cloudflare 기본 설정
- [x] GA4 ID 확정
- [x] 기본 배포 페이지 존재

### 미완료

- [ ] 저장소 전체 구조 점검
- [ ] 디자인 시스템
- [ ] 기본 페이지
- [ ] 계산기
- [ ] Guides
- [ ] Reference
- [ ] 자동 QA
- [ ] 계산 검증
- [ ] 브라우저 QA
- [ ] sitemap / robots / llms 검증

### 현재 공개 HTML 수

Codex 첫 작업에서 실제 저장소 기준으로 집계한다.

### 현재 계산기 수

Codex 첫 작업에서 실제 저장소 기준으로 집계한다.

### 현재 위험

#### HIGH

- 저장소 점검 전 확정 금지

#### MEDIUM

- 기본 배포 상태만 완료되어 실제 구조와 SEO 미검증
- 회사와 집의 로컬 origin 상태 미검증

#### LOW

- GitHub Pages 배포 지연과 Cloudflare 캐시 혼동 가능성

---

## 15. 작업 기록

작업 완료 전 아래를 갱신한다.

### 최근 완료 내역

- 날짜:
- 작업 환경:
- 사용 모델:
- 추론 강도:
- 작업 범위:
- 변경 파일:
- 공개 HTML 수:
- 계산기 수:
- Guides 수:
- Reference 수:
- 자동 QA:
- 계산 검증:
- 브라우저 QA:
- 커밋:
- push:
- 실배포 확인:
- 남은 문제:

### 다음 작업

- 작업:
- 권장 모델:
- 추론 강도:
- 완료 조건:

### 최근 검증 명령

```bash
# 실제 실행한 명령으로 교체
```

### 최근 계산 검증 사례

| Calculator | Input | Expected | Actual | Result |
|---|---|---:|---:|---|
| - | - | - | - | - |

### 최근 브라우저 QA

| Page | 1440 | 1280 | 1024 | 768 | 390 |
|---|---|---|---|---|---|
| Homepage | - | - | - | - | - |
| Tools | - | - | - | - | - |
| Representative calculator | - | - | - | - | - |

---

## 16. 현재 다음 작업

### 작업

Phase 1 — Foundation Build

### 권장 모델

Sol

### 추론 강도

중간

### 완료 조건

- 기본 페이지 8개
- 계산기 10개
- Guides 4개
- Reference 4개
- 독립 디자인 시스템
- 공통 Header / Footer
- GA4 / SEO / JSON-LD
- robots / sitemap / llms / 404
- 자동 QA PASS
- 계산 검증 PASS
- 1440 / 1280 / 1024 / 768 / 390 브라우저 QA PASS
- HIGH 위험 0
- handover.md 갱신
- commit 및 가능한 경우 push
