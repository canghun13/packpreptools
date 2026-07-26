# Pack Prep Tools — handover.md

> 이 문서는 `packpreptools.com` 프로젝트의 기준 문서다.
> 회사와 집 어느 PC에서 작업하더라도 GitHub `main` 브랜치와 이 문서를 기준으로 이어서 진행한다.
> 작업 시작 전 전체를 읽고, 작업 완료 전 현재 상태·검증 결과·다음 작업을 갱신한다.

---

## 1. 확정 정보

| 항목 | 내용 |
|---|---|
| 사이트 | https://packpreptools.com/ |
| GitHub 저장소 | https://github.com/canghun13/packpreptools |
| Git remote | https://github.com/canghun13/packpreptools.git |
| 브랜드 | Pack Prep Tools |
| 공개 언어 | 영어 |
| 인수인계 문서 | 한국어 |
| 기술 스택 | 정적 HTML / CSS / Vanilla JavaScript |
| 호스팅 | GitHub Pages |
| DNS / CDN | Cloudflare |
| GA4 | G-XR7JWJ36CD |
| 연락 이메일 | canghun13@naver.com |
| 이미지 정책 | 원칙적으로 이미지 없이 구성 |
| 수익화 | Google AdSense 우선 |
| 기준일 | 2026-07-26 |

### 변경 금지

- 도메인, 브랜드, GA4 ID, 연락 이메일을 임의 변경하지 않는다.
- React, Vue, Next.js, Astro, PHP, CMS, 데이터베이스를 도입하지 않는다.
- 유료 API나 월 고정비 서비스를 추가하지 않는다.
- 기존 `CNAME`과 GitHub Pages 관련 설정을 임의 삭제하지 않는다.
- 다른 프로젝트의 HTML, CSS, 로고, 헤더, 카드, 계산기 UI를 그대로 복사하지 않는다.

---

## 2. 현재 저장소 상태

2026-07-26 Phase 1–3 1차 완성 기준:

- 실제 공개 HTML 62개
- 기본 페이지 8개
- 계산기 32개
- Guides 12개
- Reference 10개
- 공통 스타일: `assets/styles.css`
- 공통 UI 동작: `assets/site.js`
- 계산 로직: `assets/calculators.js`
- 정적 페이지 생성기: `scripts/generate-site.js`
- 자동 QA: `scripts/qa.js`
- 계산 검증: `scripts/verify-calculators.js`
- 검색·크롤링 파일: `robots.txt`, `sitemap.xml`, `llms.txt`
- 유지 파일: `CNAME`, `README.md`, `handover.md`

### 현재 상태 판정

- Phase 1 Foundation·디자인 차별화와 Phase 2·3 기능/콘텐츠 확장 완료
- GitHub `main`에 1차 완성 구현 push 완료
- GitHub Pages / Cloudflare 실도메인에서 Homepage와 대표 계산기 응답 및 동작 확인 완료
- 모든 공개 HTML에 고유 SEO 메타데이터, Open Graph, favicon, GA4, 정적 JSON-LD 적용
- 자동 QA, 계산기 32개·독립 검사 160개, 62페이지 × 5개 반응형 폭 브라우저 QA 통과
- HIGH 위험 0

---

## 3. 사이트 목적

Pack Prep Tools는 온라인 판매자, 소형 브랜드, Etsy·Shopify·eBay·Amazon 판매자와 소규모 포장 작업자가 완성된 상품을 포장하고 출고 준비할 때 사용하는 계산기 및 참고 자료 사이트다.

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
- 운송장 구매와 배송 예약
- 특정 운송사 계약 요금
- 통관, 관세, 세금 자동 계산
- 위험물, 의약품, 식품, 냉장·냉동 규제 포장
- 법적 또는 규제 적합성 보증
- 로그인, 사용자 데이터 저장, 주문관리시스템
- AI 챗봇

---

## 4. Maker Print Tools와의 차별화

### Maker Print Tools 범위

- 3D 프린팅 제작
- 필라멘트 사용량과 비용
- 출력 시간
- 인필과 서포트
- 프린터 전기료
- 3D 출력물 판매가격과 손익분기

### Pack Prep Tools 범위

- 완성된 상품의 포장
- 박스와 메일러 치수
- DIM weight
- 완충재와 테이프 사용량
- 포장 원가와 인건비
- 포장 작업량과 출고 준비

### 금지

- 필라멘트, 프린터 설정, 출력 시간, 인필, 서포트, 3D 모델 스케일 계산기를 넣지 않는다.
- Maker Print Tools의 디자인과 구성요소를 복사하지 않는다.
- Pack Prep Tools는 shipping operations console, packing manifest, dispatch control sheet를 연상시키는 독립 디자인을 사용한다.

---

## 5. 회사·집 작업 방식

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
```

미커밋 변경이 없을 때만:

```bash
git pull --ff-only origin main
```

미커밋 변경이 있으면 먼저 확인한다.

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
- `origin`을 확인하지 않고 push

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
- 작업 종료 시 미커밋 변경을 남기지 않는다.
- push 실패 시 정확한 원인과 사용자가 실행할 명령을 기록한다.

---

## 6. 디자인 방향

### 핵심 인상

Shipping operations console / packing manifest / dispatch control sheet

### 원칙

- 차가운 흰색·회색, 짙은 네이비, 선명한 블루를 기본으로 하고 앰버는 경고에만 제한한다.
- 밝은 2단 Header, 전폭 Hero, 상태선, 구획선, 수치 정렬로 배송 준비 화면의 인상을 만든다.
- Homepage 도구는 카드가 아니라 Quick Start 행과 운영 테이블로 표시한다.
- Tools, Guides, Reference 허브는 데이터·문서 인덱스 목록으로 구성한다.
- 계산기 입력은 상단 전폭 2~3열 manifest form, 결과는 그 아래 전폭 summary strip으로 구성한다.
- 문서 상세는 단일 본문과 목차를 사용한다.
- workbench, bench, workstation, rotated card, specimen panel, 격자 종이 효과를 사용하지 않는다.
- 일반적인 SaaS 랜딩페이지나 creator lab처럼 만들지 않는다.
- 모든 섹션을 같은 둥근 카드로 반복하지 않는다.
- 결과 영역은 포장 명세서나 출고 체크시트처럼 명확하게 만든다.
- 숫자와 단위 가독성을 장식보다 우선한다.
- 로고 영역이 줄바꿈되거나 눌리지 않게 한다.
- `%`, `in`, `cm`, `lb`, `kg`, `ft²` 같은 suffix를 입력값과 분리해 안정적으로 표시한다.
- 이미지 없이도 전문적인 포장 도구 사이트로 보이게 한다.

### 디자인 확장 순서

1. Homepage
2. 대표 계산기 1개
3. 1440px와 390px 검증
4. Header / Footer
5. 나머지 계산기와 문서로 확장

디자인 검증 전에 페이지를 대량 생성하지 않는다.

### 반응형 확인 폭

- 1440px
- 1280px
- 1024px
- 768px
- 390px

---

## 7. Phase 1 범위

### 기본 페이지 8개

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

### 목표 공개 HTML

26개

Phase 1 품질 검증 전 Phase 2를 시작하지 않는다.

---

## 8. 계산기 페이지 기준

각 계산기 페이지 필수 구성:

1. 고유 H1
2. 용도 설명
3. 입력 라벨과 단위
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
- Reset 후 결과 초기화
- 모바일 숫자 키패드
- suffix 줄바꿈

---

## 9. GA4

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

- 모든 공개 HTML에서 `G-XR7JWJ36CD` 존재 여부를 자동 검사한다.
- 다른 GA4 ID가 한 건이라도 있으면 QA 실패다.
- 사용자가 계산기에 입력한 실제 값은 Analytics로 전송하지 않는다.

---

## 10. SEO와 공통 구조

모든 색인 가능한 HTML에 적용:

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

### 구조화 데이터

계산기:

- WebApplication
- BreadcrumbList

Guide / Reference:

- Article 또는 적절한 문서 schema
- BreadcrumbList

### 필수 파일

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `404.html`

---

## 11. QA Quality Gate

### 자동 QA

- 공개 HTML 파싱 가능
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

확인 대상:

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

## 12. 이전 낭비 방지 규칙

### 디자인 재작업 방지

- 디자인 시스템을 먼저 확정한다.
- Homepage와 대표 계산기 1개를 먼저 완성한다.
- 1440px와 390px에서 확인한 뒤 확장한다.
- 대량 생성 후 전면 재설계하지 않는다.

### 페이지 누락 방지

- Header와 Footer 메뉴를 고정한다.
- 모든 페이지에서 About, Contact, Privacy 접근성을 검사한다.
- orphan page를 허용하지 않는다.

### 일괄 치환 오류 방지

- 전체 치환 전 `git diff`를 확인한다.
- canonical, JSON-LD, href, 계산기 ID는 치환 후 전수 검사한다.
- 다른 프로젝트 브랜드, 도메인, 이메일, GA4 ID를 검색한다.

### 계산식 복사 오류 방지

- 계산기별 실제 입력 ID만 읽는다.
- 존재하지 않는 DOM 요소를 공통 함수가 읽지 않게 한다.
- 계산 공식은 별도 검증 스크립트에서 다시 계산한다.
- 단위 변환 로직은 한곳에서 관리한다.

### 캐시 혼동 방지

화면이 이상해도 바로 코드를 다시 수정하지 않는다.

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
- 범위를 벗어난 추가 개선을 임의로 하지 않는다.

---

## 13. 현재 작업

### 작업

Phase 2 + Phase 3 — Pack Prep Tools 1차 완성 완료

### 권장 모델

Sol

### 추론 강도

중간

### 완료 조건

- [x] 실제 `index.html` 생성
- [x] 기본 페이지 8개
- [x] 계산기 32개
- [x] Guides 12개
- [x] Reference 10개
- [x] 독립 디자인 시스템
- [x] 공통 Header / Footer
- [x] GA4 / SEO / JSON-LD
- [x] robots / sitemap / llms / 404
- [x] 자동 QA PASS
- [x] 계산 검증 160개 PASS
- [x] 공개 HTML 62개 × 1440 / 1280 / 1024 / 768 / 390 브라우저 QA PASS
- [x] Tabletop Maker Lab 비교 Quality Gate PASS
- [x] 자산 버전 키 적용 및 캐시 혼합 방지
- [x] HIGH 위험 0
- [x] handover.md 갱신
- [x] commit 및 push

---

## 14. 작업 기록

작업 완료 전 아래를 갱신한다.

### 최근 완료 내역

- 날짜: 2026-07-26
- 작업 환경: Windows / PowerShell / Codex Desktop
- 사용 모델: Sol
- 추론 강도: 중간
- 작업 범위: Phase 2 + Phase 3 연속 구현, Pack Prep Tools 1차 완성
- 변경 파일: 총 69개 — 신규 공개 HTML 36개, 기존 HTML/생성기/계산·QA/검색 파일 갱신 32개, handover 1개
- 공개 HTML 수: 62
- 계산기 수: 32
- Guides 수: 12
- Reference 수: 10
- 신규 계산기 22개: Carton Count, Case Pack, Box Utilization, Multi-item Box Fit, Packaging Material Budget, Monthly Packaging Spend, Label Cost, Insert Quantity, Packaging Waste Allowance, Packaging Supply Reorder Point, Order Packing Time, Labor Capacity per Shift, Prep Batch Time, Kitting Cost, Bundle Packing Cost, Master Carton Dimensions, Master Carton Weight, Carton Cube, Cases per Pallet, Pallet Layer Count, Pallet Height, Pallet Utilization
- 신규 Guides 8개: Box vs Poly Mailer, How to Choose Void Fill, Packing Station Workflow, Packaging Inventory Basics, Tape Types and Seal Patterns, Packaging Cost Reduction Checklist, Master Carton Planning, Pallet Planning Basics
- 신규 Reference 6개: Packaging Unit Conversion, Packaging Cost Components, Box Style and Closure Glossary, Void Fill Yield Factors, Master Carton Terms, Pallet and Unit Load Terms
- 제외 또는 교체한 계산기: 없음. 요청된 22개 모두 기존 도구와 다른 운영 출력을 제공한다고 판정해 구현함
- Multi-item Box Fit 범위: 6개 직교 방향의 단순 격자 용량 추정이며 3D bin-packing 최적화로 주장하지 않음
- Pallet 범위: 팔레트 크기·최대 높이·레이어를 사용자 입력으로 받고 안정성·압축 강도·무게 중심·장비·규제 적합성을 보증하지 않음
- 자동 QA: PASS — 62 HTML, 61 sitemap URL, JavaScript 5개, 고유 title/description/canonical/H1, GA4, JSON-LD, 중복 ID, 내부 링크, 허브 도달성, robots/sitemap/llms, 404 noindex 검증
- 계산 검증: PASS — 계산기 32개, 독립 검사 160개. 기존 10개 50건 회귀 검사와 신규 22개 110건 정상·경계·오류·재입력 결정성 검사
- 브라우저 QA: PASS — 공개 HTML 62개 × 1440/1280/1024/768/390 = 310 렌더 검사. 가로 넘침, Header·로고·Footer, 테이블, H1, NaN/Infinity 실패 0
- 계산기 UI QA: PASS — Calculate 32개, Reset 32개, 모바일 suffix 32개, 모바일 메뉴, 물리적 불가 입력 오류 3종, 콘솔 오류 0
- 디자인 일관성: PASS — Shipping operations console / packing manifest / dispatch control sheet 유지. 밝은 2단 Header, 전폭 Hero, Quick Start 4개, workflow, 운영 테이블, 문서 인덱스, 전폭 manifest와 summary strip 보존
- 기존 기능 회귀: PASS — 기존 URL, 기존 계산기 10개 공식과 입력/결과 ID, GA4, canonical, JSON-LD, 내부 링크 보존
- 검색 파일: sitemap 61개 색인 URL, 404 제외; robots와 llms를 32/12/10 최종 구조로 재생성
- 캐시 대응: favicon/CSS/site.js/calculators.js 자산 버전을 `20260726-complete`로 갱신
- 구현 커밋: `bb9732e9cb84842cf1feaf5fde20eb63bac040bd` — Complete Pack Prep Tools phases 2 and 3
- push: `origin/main` push 완료
- 실배포 확인: GitHub Pages run `30196409094` build/deploy 성공. 기본 https://packpreptools.com/ 응답에서 32 calculators·22 documents·Quick Start 4개와 `20260726-complete` CSS 확인. Tools hub 32행·6개 카테고리 확인. Master Carton Dimensions 실계산 결과 `25.5 × 11.25 × 7.25 in`, 콘솔 오류 0, 가로 넘침 0 확인
- 남은 문제: HIGH 없음, MEDIUM 없음. LOW — 운송사 divisor, 포장재 yield, 공급 리드타임, 작업 속도는 운영 데이터에 맞춰 주기 보정 필요. Cloudflare HTML 캐시는 배포 직후 TTL 전파 차이가 날 수 있음
- 1차 완성 판정: 가능 — 수량·기능·콘텐츠·SEO·QA·배포 기준 충족

### 다음 작업

- 작업: 1차 완성 운영 관찰과 실제 입력 가정 보정
- 권장 모델: Sol
- 추론 강도: 중간
- 일정: 배포 후 7일에 기본 URL 캐시·404·콘솔·모바일 확인, 30일에 GA4·검색 색인·도구 사용 분포 확인, 이후 분기마다 divisor·yield·lead time·labor pace 검토
- 완료 조건: 운영 데이터로 가정값과 문서 검토일을 갱신하고, 기능 확장은 별도 승인된 범위에서만 시작

### 최근 검증 명령

```bash
node scripts/generate-site.js
node scripts/qa.js
node scripts/verify-calculators.js
git diff --check
git status
```
