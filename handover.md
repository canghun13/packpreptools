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
| 기준일 | 2026-08-02 |

### 변경 금지

- 도메인, 브랜드, GA4 ID, 연락 이메일을 임의 변경하지 않는다.
- React, Vue, Next.js, Astro, PHP, CMS, 데이터베이스를 도입하지 않는다.
- 유료 API나 월 고정비 서비스를 추가하지 않는다.
- 기존 `CNAME`과 GitHub Pages 관련 설정을 임의 삭제하지 않는다.
- 다른 프로젝트의 HTML, CSS, 로고, 헤더, 카드, 계산기 UI를 그대로 복사하지 않는다.

---

## 2. 현재 저장소 상태

2026-08-13 Pack Instruction & Job Release workflow cluster 확장 기준:

- 실제 공개 HTML 76개
- 기본·허브·기타 페이지 10개
- Tool page 40개: 계산기 36개 + workflow Tool 4개
- Guides 14개
- Reference 12개
- 공통 스타일: `assets/styles.css`
- 공통 UI 동작: `assets/site.js`
- 계산 로직: `assets/calculators.js`
- workflow logic: `assets/workflow-tools.js`
- 정적 페이지 생성기: `scripts/generate-site.js`
- 자동 QA: `scripts/qa.js`
- 계산 검증: `scripts/verify-calculators.js`
- workflow 검증: `scripts/verify-workflow-tools.js`
- 검색·크롤링 파일: `robots.txt`, `sitemap.xml`, `llms.txt`
- 유지 파일: `CNAME`, `README.md`, `handover.md`

### 현재 상태 판정

- Phase 1 Foundation·디자인 차별화, Phase 2·3 기능/콘텐츠 확장, Packaging Quality & Damage Control과 Pack Instruction & Job Release 소규모 cluster 추가 완료
- GitHub `main` 배포 상태는 아래 최신 작업 기록을 우선 확인
- GitHub Pages / Cloudflare 실도메인 상태는 아래 최신 작업 기록을 우선 확인
- 모든 공개 HTML에 고유 SEO 메타데이터, Open Graph, favicon, GA4, 정적 JSON-LD 적용
- 자동 QA, 계산기 36개·독립 검사 181개, workflow Tool 4개·검사 46개, 신규·핵심 회귀 페이지의 5개 반응형 폭 브라우저 QA 통과
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

62개 공개 HTML 전수 콘텐츠 감사 및 콘텐츠 포함 1차 완성

### 권장 모델

Sol

### 추론 강도

중간

### 완료 조건

- [x] 공개 HTML 62개 유지
- [x] 계산기 32개 고유 본문 보강
- [x] Guides 12개 독립 실무 문서 수준으로 보강
- [x] Reference 10개 정의·구분·예제·사용 절차 보강
- [x] 새 페이지·URL 변경 없음
- [x] 범용 긴 문장·문단 반복 0
- [x] 자동 QA 및 콘텐츠 QA PASS
- [x] 계산 검증 160개 PASS
- [x] 공개 HTML 62개 × 1440 / 1280 / 1024 / 768 / 390 브라우저 QA PASS
- [x] Calculate / Reset / 오류 처리 32개 PASS
- [x] 기존 디자인·공식·입출력 ID·SEO·GA4 보존
- [x] HIGH 위험 0
- [x] commit, push, 실배포 확인

---

## 14. 작업 기록

### 최근 완료 내역

- 날짜: 2026-07-26
- 작업 환경: Windows / PowerShell / Codex Desktop
- 사용 모델: Sol
- 추론 강도: 중간
- 작업 범위: 기존 62개 공개 HTML의 콘텐츠 전수 감사와 계산기·Guide·Reference 심화. 새 페이지 및 기능 추가 없음
- 수정 전 감사: 충분 8개 — Homepage, Tools, Guides, Reference, About, Contact, Privacy, 404; 보강 필요 0개; 얇음 54개 — 계산기 32개, Guides 12개, Reference 10개
- 수정 후 감사: 충분 62개; 보강 필요 0개; 얇음 0개
- 보강한 계산기: 32개
- 보강한 Guides: 12개
- 보강한 Reference: 10개
- 계산기 콘텐츠: 계산 목적, 입력 선택법, 단계별 계산 흐름, 현실적인 worked example, 결과 해석, 고유한 common mistakes, 가정과 한계, 전후 workflow 링크를 각 도구별로 작성
- Guide 콘텐츠: 작업 준비, 순서, 판단표, 현실적인 scenario, 흔한 실수, close-out, 증거·소유권·재검토 조건, 체크리스트를 각 문서별로 작성
- Reference 콘텐츠: 운영상 의미, 정의, 적용 예제, 유사 용어 구분표, 사용 절차, 기록 유지, 검증 주의를 각 주제별로 작성
- 본문 분량: 계산기 471–707단어, 평균 573.2; Guides 712–858단어, 평균 775.0; Reference 532–602단어, 평균 571.3
- 반복 문구 제거: 기존 범용 템플릿 3종이 쓰인 43개 문단 인스턴스에서 원본 외 중복 40건을 제거. 최종 긴 본문 문단 반복 0, 긴 본문 문장 반복 0
- 콘텐츠 UI: 입력 선택표, 단계 목록, 예제 블록, 체크리스트, 공식 블록을 기존 shipping operations console 디자인 안에 추가. 680px 이하에서 표를 행 단위 레이아웃으로 전환
- 콘텐츠 QA: PASS — 빈 H2/무의미 섹션, placeholder/TODO/lorem ipsum, 짧은 본문 경고, worked example·assumptions·common mistakes·input guidance·related workflow·Last reviewed 누락 모두 0
- 자동 QA: PASS — 62 HTML, 61 sitemap URL, JavaScript 5개, 고유 title/description/canonical/H1, GA4 `G-XR7JWJ36CD`, JSON-LD, 중복 ID, 내부 링크, orphan page, 허브 도달성, robots/sitemap/llms, 404 noindex 검증
- 계산 검증: PASS — 계산기 32개, 독립 검사 160개
- 브라우저 QA: PASS — 공개 HTML 62개 × 1440/1280/1024/768/390 = 310 렌더 검사. 본문·표·공식·예제·체크리스트·관련 링크, Header/Footer, H1, 가로 넘침, 잘림, NaN/Infinity 실패 0
- 계산기 UI QA: PASS — Calculate 32개, Reset 32개, 오류 처리 32개, 모바일 suffix 32개, 모바일 메뉴, 콘솔 오류 0
- 기존 기능 회귀: PASS — `assets/calculators.js`와 `assets/site.js` 변경 없음. 공개 URL, 계산 공식, 단위 변환, 입력/결과 ID, manifest 입력, 전폭 결과, 네이비·블루 디자인, GA4, canonical, title/description 검색 의도, JSON-LD, 내부 링크 보존
- 최종 공개 HTML: 62
- 최종 계산기: 32
- 최종 Guides: 12
- 최종 Reference: 10
- 검색 파일: sitemap 61개 색인 URL과 404 제외 유지; robots와 llms를 동일 32/12/10 구조로 재생성
- 캐시 대응: favicon/CSS/site.js/calculators.js 자산 버전을 `20260726-content`로 갱신
- 변경 파일: 구현·생성 결과 65개와 handover 1개
- 구현 커밋: `acce90bf913e4d2c3759556156fb4ad63b5e218b` — Deepen calculator and document content
- push: `origin/main` push 완료
- 실배포 확인: GitHub Pages run `30198789151` build/deploy 성공. `https://packpreptools.com/`과 대표 계산기·Guide·Reference가 `20260726-content` 자산을 반환함. Dimensional Weight Calculator는 심화 섹션 8개와 576단어 본문, 기본 입력 계산 결과 `6.91 lb`, 콘솔 오류 0, 가로 넘침 0 확인. Master Carton Planning Guide는 748단어와 evidence 섹션, Pallet and Unit Load Terms는 578단어와 maintenance 섹션 확인
- 남은 문제: HIGH 없음, MEDIUM 없음. LOW — 운송사 divisor, 포장재 yield, 공급 리드타임, 작업 속도와 단가는 운영 데이터 및 최신 공식 조건에 맞춰 주기 보정 필요. Cloudflare HTML 캐시는 배포 직후 TTL 전파 차이가 날 수 있음
- 콘텐츠 포함 1차 완성 판정: 가능 — 수량, 고유성, 실무 깊이, 기능 회귀, SEO, 반응형 QA, 배포 기준 충족

### 다음 작업

- 작업: 콘텐츠 포함 1차 완성 운영 관찰과 실제 입력 가정 보정
- 권장 모델: Sol
- 추론 강도: 중간
- 일정: 배포 후 7일에 기본 URL 캐시·404·콘솔·모바일 확인, 30일에 GA4·검색 색인·도구 사용 분포 확인, 이후 분기마다 divisor·yield·lead time·labor pace·단가 검토
- 완료 조건: 운영 데이터와 최신 공식 조건으로 가정값 및 문서 검토일을 갱신하고, 기능 확장은 별도 승인된 범위에서만 시작

### 최근 검증 명령

```bash
node scripts/generate-site.js
node scripts/qa.js
node scripts/verify-calculators.js
git diff --check
git status
```

## 2026-07-29

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://kittylaunch.com, https://sellwithboost.com/에 등록 (내가 직접함)


## 2026-07-30

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://twelve.tools, https://findly.tools/에 등록 (내가 직접함)

## 2026-08-02 — Packaging Quality & Damage Control 클러스터 검토 및 구현

### 결론

- 구현 결정: 채택. 기존 32개 계산기와 핵심 계산 목적이 다른 반복 업무 도구 4개가 확인되었고, 무료·무계정·사용자 입력 기반으로 동일한 기록 경계를 유지하는 비교 도구라는 차별점이 있다.
- 구현 범위: 클러스터 허브 1개, 계산기 4개, Guide 1개, Reference 1개로 총 7페이지.
- 최종 수량: 공개 HTML 69개, 계산기 36개, Guides 13개, Reference 11개, sitemap 색인 URL 68개(404 제외).
- 안전 경계: 모든 결과는 관찰·기록·비교용 계획 자료다. AQL 합격/불합격, ISTA 인증·통과, 손상 방지 보증, 운송사 책임, 계약상 판정을 제공하지 않는다.

### 수요 및 검색 결과 검토

정확한 검색량 도구에는 접근하지 못했으므로 검색량 수치를 만들지 않았다. 다음 대표 검색어의 검색 결과 구성, 도구형 결과, 공식 절차, 현업 질문을 확인했다.

- `shipping damage rate calculator ecommerce packaging`
- `shipping damage rate formula calculator`
- `packaging failure cost calculator damaged shipments cost`
- `packaging trial comparison tool packaging test comparison cost damage rate`
- `pack out inspection checklist generator packaging quality`
- `package weight variance calculator shipping dimensions variance`
- `parcel weight dimension discrepancy checker shipping audit tool`
- `package testing software trial data packaging comparison SaaS`

확인된 반복 의도는 손상 건수의 기간별 비율화, 손상 1건의 직접 비용 범위 기록, 두 포장 시험안의 공통 기준 비교, 저장된 manifest와 재측정값의 차이 확인이었다. 검색 결과에는 계산기·템플릿·전문 시험 절차·기업용 감사 SaaS가 모두 존재해 실제 문제 상황은 확인되었지만, 네 가지 기록을 한 사이트에서 무료·무계정으로 연결하는 중립적 소형 도구 묶음은 드물었다.

### 확인한 주요 경쟁 도구·SaaS·전문 문서

- Smithers Package Testing Calculator — 포장비와 손상률로 시험 투자 효과를 설명하는 시험기관 계산기. https://www.smithers.com/en-gb/industries/packaging/manufacturers-and-users/distribution-testing/package-testing-calculator
- Boxes Etc Bottle Damage Calculator — 특정 포장 제품 제안과 결합된 손상 비용 계산기이며 자체 목표값을 사용한다. https://boxes-etc.co.uk/damage-calculator
- ISTA Test Procedures / PackSight — 공식 시험 절차와 시험 계획·보고 SaaS 범위. 7-Series는 둘 이상의 설계 상대 성능 비교를 다루지만 보호 적합성 판정 자체를 목적으로 하지 않는다는 경계가 있다. https://ista.org/test_procedures.php
- ISTA Getting Started with Design — 대표 미사용 시료, 손상 허용 정의, 복수 시험 비교, 일탈 기록, 현장 모니터링과 변경 시 재시험 절차를 확인했다. https://ista.org/getting_started_with_design.php#row-2
- FedEx Packaging Lab — 공식 시험 신청·절차를 제공하며 PASS도 손상·손실 방지 보증이 아니라는 경계를 확인했다. https://www.fedex.com/en-us/shipping/packaging/testing/application-instructions.html
- SafetyCulture Packaging Quality Control Checklist — 편집 가능한 검사 템플릿과 결함 분류 중심. https://safetyculture.com/library/transport-and-logistics/packaging-quality-control-checklist
- Jotform Packaging Line Quality Inspection Checklist — 폼 템플릿 중심. https://www.jotform.com/form-templates/packaging-line-quality-inspection-checklist-form
- GoAudits AI Checklist Generator — 범용 체크리스트 생성·감사 앱 범위. https://goaudits.com/ai-checklist-generator/
- DIMS-it — 중량·치수·바코드 캡처와 감사 추적을 제공하는 하드웨어·클라우드 제품. https://www.dims-it.com/
- LateShipment OneAudit — 운송사 청구 불일치, 감사와 환급을 다루는 기업용 SaaS. https://www.lateshipment.com/platform/oneaudit/

### 기존 페이지 중복 검토와 후보별 결정

- Shipping Damage Rate Calculator — 채택. 기존 계산기에는 정의된 배송 모집단의 손상 건수·비율·빈도를 계산하는 도구가 없었다.
- Packaging Failure Cost Calculator — 채택. 기존 Packaging Cost per Order는 정상 계획 원가이며, 이 도구는 기록된 실패 건수의 교체·재배송·반송·처리·지원 직접 비용을 계산하므로 목적과 입력 경계가 다르다.
- Packaging Trial Comparison Tool — 수정 채택. 두 시험안을 손상 건수/검사 수량, 재료비, 작업 시간, 인건비, 완성 중량으로 비교한다. 임의 종합 점수·승자·통계적 유의성·인증 판정은 넣지 않았다.
- Package Weight & Dimension Variance Checker — 수정 채택. 기존 DIM Weight·Box Size와 달리 저장 기록과 동일 상태의 재측정값 차이를 축별로 보여준다. 운송사 기본 허용오차는 제공하지 않고 사용자가 통제 문서의 허용오차를 입력한다.
- Pack-Out Inspection Checklist Generator — 기각. SafetyCulture, Jotform, GoAudits 등 무료 템플릿·생성기 경쟁이 강하고, 현재 범위에서 차별화하려면 검사 정책·저장·승인 워크플로가 필요해 정적 무계정 도구의 안전한 범위를 넘어간다. 페이지 수를 맞추기 위해 추가하지 않았다.
- 클러스터 허브 — 채택. 측정 → 보호 → 봉합 → 비용 → 카톤·팔레트 이후의 관찰 → 비용화 → 시험 비교 → 현장 재측정 흐름으로 연결했다.
- Guide / Reference — 각 1개 채택. 시험 계획과 손상 검토 절차, 관찰률·직접 비용·percentage point·variance·tolerance의 정의와 증거 경계를 분리했다.

### 구현 및 연결 범위

- 신규 페이지: `/quality.html`, `/tools/shipping-damage-rate.html`, `/tools/packaging-failure-cost.html`, `/tools/packaging-trial-comparison.html`, `/tools/package-weight-dimension-variance.html`, `/guides/packaging-trial-and-damage-review.html`, `/reference/packaging-quality-metrics.html`.
- `scripts/generate-site.js`의 도구·문서 원장과 생성 결과, Tools·Guides·Reference 목록, breadcrumb, 관련 페이지, sitemap, llms를 함께 갱신했다.
- 신규 도구는 모든 값과 허용오차를 사용자가 직접 입력한다. 빈 값, 0/음수, 분모 0, 손상 건수 초과, 빈 비교안, 과도한 값과 잘못된 기준값을 거부한다.
- 홈페이지에는 추가 홍보 블록을 만들지 않고 실제 도구·문서 수만 갱신했다.
- KittyLaunch, sellwithboost, twelve.tools, findly.tools 배지 HTML·링크의 diff는 0이며 기존 footer 다음 위치를 데스크톱과 모바일에서 확인했다.
- 구현 파일 변경: 75개. 이 handover 갱신을 포함한 전체 변경 파일: 76개.

### QA 결과

- 생성 및 자동 QA: PASS — 공개 HTML 69개, sitemap URL 68개, JavaScript 5개, title/description/canonical/H1/GA4/JSON-LD, 중복 ID, 내부 링크, orphan page, robots/sitemap/llms, 404 noindex 일치.
- 콘텐츠 QA: PASS — 계산기 36개, Guides 13개, Reference 11개, 긴 문단·문장 중복 0.
- 계산 검증: PASS — 계산기 36개, 독립 검사 181개. 신규 정상·경계·오류·결정성 사례 21개 포함.
- 브라우저 렌더 QA: PASS — 공개 HTML 69개 × 1440/1280/1024/768/390 = 345회. 가로 넘침, 잘린 조작 요소, H1/Header/Footer 누락, NaN/Infinity, 과도한 빈 본문 실패 0. 최종 생성 후 신규 7페이지 × 5개 폭 35회 재확인.
- 계산기 UI QA: PASS — 기존 32개와 신규 4개 모두 Calculate·Reset·오류 표시 통과. 신규 기준 결과는 1.12% observed damage rate, $867.60, Trial B 1.67 pp lower, Within entered tolerances.
- 모바일 QA: PASS — 36개 계산기의 입력 suffix, 모바일 메뉴 열림, 표·폼 변환, 가로 넘침 0.
- 콘솔 오류: 0.
- `git diff --check`: PASS.

### Git 및 배포

- 구현 커밋: `822989015e6e600fed11ba2010997e75e5a98b68` — Add packaging quality and damage control tools
- 조사·QA 기록 커밋: `abc0672d1d4bd7b05f9aee8ec0b1c7c09dbdd559` — Document quality cluster research and QA
- push: 위 두 커밋을 `origin/main`에 push 완료.
- GitHub Pages: run `30730939325`가 `abc0672d1d4bd7b05f9aee8ec0b1c7c09dbdd559` 기준 build/deploy 성공.
- 실배포 확인: `/quality.html`에서 신규 도구 4개와 `20260802-quality` 자산 확인. 390px 실도메인 Shipping Damage Rate Calculator에 1,250/14 입력 시 `1.12% observed damage rate`, 오류 0, 가로 넘침 0. 신규 Guide·Reference의 고유 title/H1/검토일 확인.
- 사용자 관리 영역: 실도메인 홈페이지에서도 footer 다음 위치와 KittyLaunch·sellwithboost·twelve.tools·findly.tools 링크 4개를 확인. 콘솔 오류 0.

### 남은 위험과 운영 관찰

- HIGH: 없음.
- MEDIUM: 정확한 검색량 자료 없이 검색 결과 구성과 실무 의도로 수요를 판단했다. 배포 후 GA4의 도구 진입·계산 실행 분포와 Search Console 노출/검색어로 실제 수요를 재평가해야 한다.
- MEDIUM: 관찰률과 비교 결과는 사용자 데이터의 모집단 정의, 신고 지연, 표본 크기, 원인 분류, 측정 장비와 단위 일관성에 민감하다. 계산기는 통계적 유의성이나 원인을 판정하지 않는다.
- LOW: 조직별 비용 경계와 허용오차가 다르므로 운영 문서의 최신 값으로 입력해야 한다. 운송사·시험기관·계약 규칙은 해당 공식 출처에서 별도 확인한다.
- 추후 확인 데이터: 신규 4개 도구별 진입·계산 실행, 빈 입력·오류 패턴, trial sample size 분포, damage definition 일관성, 재측정 tolerance 사용 범위, 관련 Guide/Reference 이동률.
- 다음 권장 작업: 최소 30일 운영 데이터를 수집한 뒤 클러스터 유지·보강·축소를 판단한다. 체크리스트 생성기는 저장·승인 워크플로 없이 재검토하지 않는다.
- 다음 권장 모델: Sol / 추론 강도 중간.


## 2026-08-06

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://boostdomainrating.com/ 에 등록 (내가 직접함)

## 2026-08-08 — 신규 소규모 클러스터 확장성 재검토

### 시작 상태와 실제 범위

- 시작 커밋: `471beaab34d29a86a73f35cc8225d6cb8b4ab6cd` (`origin/main`과 일치), 브랜치 `main`, working tree clean.
- origin: `https://github.com/canghun13/packpreptools.git`.
- 실제 공개 HTML 69개, 계산기 36개, Guides 13개, Reference 11개, sitemap 등재 URL 68개(404 제외)를 저장소에서 다시 확인했다.
- 최신 추가 범위는 Packaging Quality & Damage Control 허브 1개, 계산기 4개, Guide 1개, Reference 1개다. 이미 완료된 이 범위는 반복 구현하지 않았다.
- 홈페이지 footer 다음의 KittyLaunch, sellwithboost, twelve.tools, findly.tools, BoostDomainRating 배지 5개는 사용자 관리 영역이다. 이번 작업에서 HTML, 링크, 위치, 구조, 스타일, 생성 로직을 수정하지 않았다.

### 조사 방법과 한계

- 정확한 유료 검색량 도구에는 접근하지 못했으므로 검색량 수치를 만들지 않았다. 실제 검색 결과의 도구형 페이지 비중, 반복되는 장기 검색어, 최근 실무 질문, 무료 도구·SaaS의 입력/결과 범위를 근거로 판단했다.
- 대표 검색어: `ecommerce return processing cost calculator`, `reverse logistics calculator free`, `packaging supplier quote comparison calculator MOQ`, `packaging quantity discount price break calculator`, `pick pack error rate calculator`, `order accuracy calculator fulfillment`, `split shipment vs consolidated shipping cost calculator`, `packaging sustainability empty space calculator`.
- 조사 축: Returns & Reverse Logistics, Packaging Purchasing & Quote Analysis, Fulfillment Accuracy & Rework, Shipment Consolidation, Packaging Sustainability.

### 확인한 검색 수요와 주요 경쟁 범위

- Returns & Reverse Logistics: 반품률, 반품 1건 비용, 재입고 노동, 회수 가능한 상품 가치, 반품률 개선 효과를 계산하려는 반복 의도가 검색 결과와 실무 질문에서 확인됐다. 그러나 Calcrux Return Rate Calculator, Eightx Real Cost of Returns, Ecombone Return Cost, theCalcs Returns Cost Impact, ShipWave Returns Cost Calculator가 이미 무료로 연간 비용·건당 비용·회수 가치·개선 시나리오를 제공한다.
  - https://calcrux.com/tools/ecommerce/return-rate-calculator
  - https://eightx.co/tools/real-cost-of-returns-calculator/
  - https://ecombone.com/tools/return-cost
  - https://www.thecalcs.com/calculators/business-marketing/returns-cost-impact-calculator
  - https://shipwave.app/tools/returns-cost-calculator
- Packaging Purchasing & Quote Analysis: 실제 견적의 운임·수수료·MOQ·리드타임·셋업비와 수량 할인 때문에 표시 단가만 비교할 수 없다는 의도가 확인됐다. Packmatch와 HoleScale은 포장 공급업체 견적·MOQ·리드타임 비교를, ZentPak은 포장 가격 구간을, QuoteCostCalc·KeyBS·worowo는 복수 공급업체의 landed/true unit cost 비교를, MonsiTools는 MOQ·보관비·판매 속도 기반 손익 판단을 제공한다. Colorado Sun의 포장 계산기는 tooling amortization도 포함한다.
  - https://custompackagingcompare.com/
  - https://holescale.com/
  - https://zentpak.com/packaging-cost-calculator/
  - https://quotecostcalc.com/
  - https://keybs.io/calculator/supplier-quote-comparison
  - https://www.worowo.com/business-calculators/unit-price-comparison/
  - https://monsitools.com/tools/moq-break-even-finder/
  - https://resources.coloradosuninc.com/calculators/plastic-packaging/plastic-packaging-cost-calculator/
- Fulfillment Accuracy & Rework: 오류 없는 주문 비율, 오피킹 비용, 재작업 시간을 계산하려는 의도와 분모를 주문/품목/배송 중 무엇으로 정의할지에 대한 실무 질문이 확인됐다. Logiwa Picking Accuracy Calculator가 정확도 공식을 무료 제공하고, Luis Dev Studio Pick-and-Pack Cost Calculator는 오류율과 재작업 비용을 이미 총 pick-and-pack 비용에 포함한다. WMS·3PL SaaS가 실행 데이터와 연결하는 영역도 강하다.
  - https://www.logiwa.com/resources/free-calculators/picking-accuracy-calculator
  - https://luisdevstudio.com/tools/pick-and-pack-cost-calculator
  - https://www.abelwomack.com/wp-content/uploads/KR-CalculatingTrueCostofAccuracy-whitepaper.pdf
- Shipment Consolidation: 복수 주문을 따로 보내는 경우와 합배송하는 경우의 운송비·처리비·고객 부담·마진을 비교하려는 의도가 확인됐다. InstaSupport의 무료 도구가 해당 시나리오를 이미 직접 비교하며, Pack Prep Tools의 Bundle Packing Cost, Multi-Item Box Fit, Case Pack, Carton Count와도 입력·결과 경계가 겹친다.
  - https://instasupport.io/tools/bundling-consolidation-savings-calculator
- Packaging Sustainability: empty space, right-sizing, material use, CO2/환경 영향 의도는 확인됐다. Packsize는 박스 수·치수·빈 공간을 사용한 무료 sustainability calculator를 제공하고, Australian Recycling Label Marketplace도 소기업용 Packaging Impact Calculator를 제공한다. 환경 환산계수와 규정 판단을 독자 기본값으로 넣으면 검증·지역·시점 위험이 생긴다.
  - https://www.packsize.com/resources/sustainability-calculator
  - https://www.arlmarketplace.org.au/resources/The%20Packaging%20Impact%20Calculator

### 기존 페이지 중복 검토

- 반품 비용은 Shipping Damage Rate, Packaging Failure Cost, Order Packing Time, Packaging Cost와 비용·처리시간 입력이 겹치며, 반품 정책·매출·상품 회수까지 확장하면 Pack Prep Tools의 outbound packaging 범위를 벗어난다.
- 견적/MOQ 도구는 Monthly Packaging Spend, Packaging Material Budget, Packaging Supply Reorder Point, Packaging Waste Allowance와 구매량·사용량·현금·폐기 허용량이 겹친다. 복수 견적 정규화만 독립적이지만, 그 하나만으로 4개 이상의 강한 도구 클러스터가 되지 않는다.
- 정확도/재작업 도구는 Shipping Damage Rate, Packaging Failure Cost, Labor Capacity per Shift, Order Packing Time과 비율·비용·노동시간 계산이 겹치고, pick accuracy는 포장보다 WMS/warehouse execution 의도가 강하다.
- 합배송은 Bundle Packing Cost, Multi-Item Box Fit, Case Pack, Carton Count와 직접 연결되지만 별도 클러스터로 만들면 기존 계산을 다른 이름으로 재구성하게 된다.
- 지속가능성은 Box Utilization, Void Fill, Packaging Waste Allowance, Box Volume과 empty-space·재료량 핵심 계산이 겹친다. 검증된 지역별 환경계수 없이 탄소 결과를 추가하지 않는다.

### 후보별 판정

- Returns & Reverse Logistics — 기각. 실제 수요는 강하지만 무료 경쟁이 포화되어 있고, 최소 4개 도구를 만들면 기존 품질·비용·노동 계산과 중복되거나 반품 정책/매출 영역으로 벗어난다.
- Packaging Purchasing & Quote Analysis — 보류. 실제 견적 비교 의도는 명확하지만 전문 포장 견적 플랫폼과 무료 supplier comparison 도구가 강하다. Quote Comparison 한 개는 차별화 여지가 있으나 MOQ Coverage, Setup Amortization, Price Break, Purchase Schedule을 함께 만들면 기존 예산·reorder·waste 도구와 중복된다.
- Fulfillment Accuracy & Rework — 기각. 무료 정확도/비용 계산기와 WMS SaaS가 강하고 Pack Prep Tools의 포장 중심 범위보다 창고 피킹 운영에 가깝다.
- Shipment Consolidation — 기각. 강한 무료 직접 경쟁 도구가 있으며 기존 bundle/carton/fit 도구와 핵심 의도가 겹친다.
- Packaging Sustainability — 기각. 기존 right-sizing 도구와 중복되고, 환경 환산계수·규정 해석을 안전하게 유지할 근거와 운영 체계가 현재 없다.

### 최종 결정과 변경 범위

- 최종 결정: **NO-GO — 신규 클러스터와 공개 페이지를 구현하지 않음.**
- 구현 조건 중 `기존 계산과 실질적으로 다른 독립적 반복 사용 도구 4개 이상`과 `강한 무료 경쟁 대비 명확한 차별점`을 동시에 충족한 후보가 없다.
- 숫자를 맞추기 위한 약한 계산기, 이름만 바꾼 기존 계산, 설명용 허브·Guide·Reference를 추가하지 않았다.
- 프로덕션 HTML, CSS, JavaScript, 생성기, URL, sitemap, robots, llms, 페이지 원장, 사용자 관리 배지 영역은 모두 변경하지 않았다. 변경 파일은 이 `handover.md` 1개뿐이다.
- 최종 수량은 공개 HTML 69개, 계산기 36개, Guides 13개, Reference 11개, sitemap URL 68개로 유지한다.

### QA와 추후 재검토 조건

- 자동 QA: PASS — 공개 HTML 69개, sitemap URL 68개, JavaScript 5개, 계산기 36개, Guides 13개, Reference 11개, 긴 문단·문장 중복 0.
- 계산 검증: PASS — 계산기 36개, 독립 검사 181개.
- 변경 범위 확인: PASS — `git diff --check` 통과, 변경 파일은 `handover.md` 1개뿐이며 index/생성기/CSS/JavaScript/sitemap/robots/llms diff 0. 저장소의 사용자 관리 배지 링크 수 5개 유지.
- 브라우저 smoke QA: PASS — 실도메인 Homepage, Tools, Quality 허브, Shipping Damage Rate Calculator를 1440/1280/1024/768/390px에서 확인한 20개 조합 모두 가로 넘침 0, H1·Header·Footer 존재, NaN/Infinity 0.
- 계산기 UI: PASS — 390px 실도메인에서 1,250건 중 14건 입력 시 `1.12% observed damage rate`, Reset 후 기본 안내 복원, 10건 중 11건 입력 시 `Damaged shipments cannot exceed shipments reviewed.` 오류 표시, 콘솔 오류 0.
- 모바일/사용자 관리 영역: PASS — 390px 메뉴 열림과 `aria-expanded=true`, footer 뒤 KittyLaunch·sellwithboost·twelve.tools·findly.tools·BoostDomainRating 배지 5개 노출, 가로 넘침 0.
- 프로덕션 코드 변경이 없으므로 신규 계산 정상·경계·오류 테스트나 전체 69페이지 재렌더 대상은 없다. 위 회귀 검사와 대표 실도메인 5폭 smoke QA로 현 상태를 검증했다.
- HIGH 위험: 없음.
- MEDIUM 위험: 정확한 검색량·Search Console query·GA4 사용 데이터 없이 검색 결과 구성으로 판단했다. 이 기록은 수요 부재가 아니라 현재 차별화 근거 부족을 의미한다.
- MEDIUM 위험: `scripts/generate-site.js`에는 과거 사용자 관리 배지 4개가 포함되어 있고 현재 `index.html`에는 사용자가 추가한 배지 5개가 있다. 사용자 지시에 따라 이번 작업에서는 생성기와 배지 영역을 수정하지 않았다. 향후 사이트 생성 작업은 배지 영역을 먼저 별도 보존하고 생성 후 정확히 복원·비교해야 한다.
- 재검토 신호: Search Console에서 `packaging supplier quote comparison`, `packaging MOQ calculator`, `packaging price break calculator` 계열이 반복 노출되거나, 사용자 요청/GA4에서 복수 공급업체 견적 비교 요구가 확인될 때 Packaging Purchasing 단일 도구부터 다시 검증한다.
- 다음 권장 작업: 최소 30일의 기존 36개 계산기별 진입·계산 실행·검색어 데이터를 수집해 약한 기존 도구와 실제 수요 공백을 먼저 확인한다. 공개 페이지 수 확대보다 관찰 데이터에 근거한 보강을 우선한다.
- 다음 권장 모델: Sol / 추론 강도 중간.


## 2026-08-10 — 전체 사이트 재감사 및 사용자 관리 배지 재생성 보호

### 시작 상태와 실제 규모

- 시작 커밋: `38c89d498504f18aadd69a85c11ef75221b65dfe`, 브랜치 `main`, `origin/main`과 일치, working tree clean.
- 실제 공개 HTML 69개: 기본·허브 및 기타 9개, 계산기 36개, Guides 13개, Reference 11개.
- sitemap URL 68개(404 제외). `llms.txt`는 계산기 36개, Guides 13개, Reference 11개를 동일 URL로 열거한다.
- 계산기 분포: Package size and fit 7, Materials and usage 4, Cost and inventory 9, Labor and workflow 5, Master cartons 3, Pallet planning 4, Quality and damage control 4.
- 최신 추가 범위는 2026-08-02 Packaging Quality & Damage Control의 허브 1개, 계산기 4개, Guide 1개, Reference 1개이며 반복 구현하지 않았다.
- GSC/GA4 성과 데이터: 현재 작업 환경에 인증된 Search Console·GA4 데이터나 전용 연결이 없어 query, impression, CTR, landing, engagement, 계산 실행 수치를 확인하지 못했다. 숫자를 추정하지 않았다. 공개 페이지의 기존 GA4 ID `G-XR7JWJ36CD` 존재 여부만 저장소와 브라우저에서 검증했다.

### 감사 범위와 후보 비교

- 계산 정확성·기능: 전체 36개 계산기, 입력 검증, 단위, 반올림, Reset·오류 흐름과 독립 검사 181개를 확인했다. 대표 독립 교차계산은 DIM weight `960 ÷ 139 = 6.906... → 6.91 lb`, Box Size `10 + 2 × (0.5 + 0.25) = 11.5 in`, Shipping Damage Rate `14 ÷ 1,250 × 100 = 1.12%`, Packaging Failure Cost `(24 + 11 + 6 + (12 ÷ 60 × 21) + 3) × 18 = $867.60`과 일치했다. 즉시 수정할 계산 오류 근거는 없었다.
- 콘텐츠·결과 해석: 계산기 36개, Guides 13개, Reference 11개가 기존 깊이 기준을 통과했고 긴 문단·문장 중복 0, assumptions·limitations·worked example·관련 workflow 누락 0이었다. word count만 늘릴 근거가 없어 기각했다.
- UX·모바일: 라이브 홈페이지 1440/1280/1024/768/390px와 대표 계산기를 확인해 가로 넘침, Header/H1 충돌, NaN/Infinity, 콘솔 오류가 없었다. 390px 메뉴와 계산·Reset·오류 상태가 정상이라 공통 UI 변경을 기각했다.
- 내부 연결: 모든 계산기·Guide·Reference는 허브에서 도달 가능하고 고아 페이지가 없다. `tools/carton-cube.html`은 허브 외 직접 유입 링크가 없어 상대적으로 약한 후보지만 GSC/GA4 검색·사용 신호가 없고 기능 결함도 아니므로 이번에는 변경하지 않았다.
- 기존 검색 신호 페이지 보강: 실제 GSC/GA4 데이터 없이 특정 페이지의 CTR·순위·engagement 개선을 주장할 수 없어 기각했다.
- 신규 Tool·클러스터: 2026-08-08의 REJECT/HOLD 후보를 뒤집을 새 데이터가 없고 기존 페이지 개선보다 가치가 높다는 증거가 없어 재조사·구현하지 않았다.
- 사용자 관리 영역 보존: **채택.** 현재 `index.html`에는 KittyLaunch, sellwithboost, twelve.tools, findly.tools, BoostDomainRating 5개가 있으나 생성기 원본에는 4개만 있었다. 격리 복사본에서 기존 생성기를 실행하자 실제로 5개가 4개로 줄고 BoostDomainRating이 유실됐다. 추측이 아니라 재현 가능한 사용자 변경 손실 위험이며 다른 후보보다 우선순위가 높았다.

### 최종 결정과 구현

- 최종 결정: **GO — 사용자 관리 홈페이지 배지의 재생성 손실 방지.**
- `scripts/generate-site.js`가 생성 전 현재 `index.html`의 `</footer>`와 homepage `site.js` 사이 사용자 관리 영역을 읽어 그대로 재사용하도록 변경했다.
- 현재 파일이 없는 최초 생성용 fallback에도 기존 5개 배지를 현재 순서로 포함했다.
- 기존 홈페이지에서 사용자 관리 영역의 경계를 안전하게 찾지 못하면 생성 시작 전에 오류로 중단한다.
- 생성될 홈페이지의 사용자 관리 블록이 읽어 둔 원본과 정확히 일치하지 않으면 `index.html`을 쓰기 전에 오류로 중단한다. 향후 템플릿 변경도 조용히 배지를 삭제할 수 없다.
- 실제 `index.html`의 배지 HTML, href, 표시 텍스트, 이미지, 개수 5개, 순서, footer 다음 위치는 변경하지 않았다. 프로덕션 HTML·CSS·계산 JavaScript·URL·sitemap·robots·llms·registry 데이터도 변경하지 않았다.
- 변경 파일: `scripts/generate-site.js`, `handover.md` 2개.

### QA 결과

- 생성기 격리 회귀: PASS — 생성 전후 사용자 관리 블록 exact match, 배지 5개 모두 유지. 의도적으로 homepage 템플릿에서 사용자 관리 블록을 누락시킨 변형은 exit 1로 실패했고 `index.html` 해시는 쓰기 전후 동일했다.
- JavaScript syntax: PASS — `node --check scripts/generate-site.js`.
- 자동 QA: PASS — 공개 HTML 69개, sitemap URL 68개, JavaScript 5개, title/description/canonical/H1/GA4/JSON-LD, 중복 ID, 내부 링크, orphan, robots/sitemap/llms, 404 noindex 일치.
- 콘텐츠 QA: PASS — 계산기 36개, Guides 13개, Reference 11개, 긴 문단·문장 중복 0.
- 계산 검증: PASS — 계산기 36개, 독립 검사 181개.
- 로컬 브라우저: PASS — 홈페이지 1440/1280/1024/768/390px에서 배지 href·이미지 5개와 순서 유지, 가로 넘침 0, Header/Footer/H1/GA4 유지, NaN/Infinity·콘솔 오류 0. 390px 메뉴 `aria-expanded=true`와 navigation 노출 확인.
- 대표 계산기: PASS — 390px Shipping Damage Rate에서 1,250/14 입력 시 `1.12% observed damage rate`, Reset 후 기본 안내 복원, 10/11 입력 시 `Damaged shipments cannot exceed shipments reviewed.`, 가로 넘침·콘솔 오류·NaN/Infinity 0.
- 라이브 변경 전 기준: 홈페이지 5개 폭에서 배지 5개, 가로 넘침 0, Header/Footer/H1/GA4 유지. 대표 계산기 정상·Reset·오류와 콘솔 오류 0 확인.
- `git diff --check`: PASS. 사용자 관리 영역 및 `index.html` diff 0.
- 최종 규모: 공개 HTML 69개, 계산기 36개, Guides 13개, Reference 11개, sitemap URL 68개.

### 남은 위험과 재검토 조건

- HIGH: 없음. 재현된 5→4 배지 손실 경로는 보호했다.
- MEDIUM: GSC/GA4 성과 데이터가 없어 기존 페이지의 검색·사용 우선순위를 정하지 못했다. 최소 30일의 query·landing·계산 실행 데이터가 확보되면 기존 페이지 개선을 다시 비교한다.
- LOW: 사용자 관리 영역 경계가 `</footer>`와 homepage `site.js` 위치에 의존한다. 구조가 바뀌면 생성기가 실패하도록 설계되어 조용한 손실은 없지만, 의도적 공통 footer/script 구조 변경 시 보존 경계도 함께 갱신해야 한다.
- LOW: Carton Cube Calculator의 직접 내부 유입 링크는 허브 1개뿐이다. Search Console에서 carton cube·shipment cube query가 반복 노출되거나 GA4에서 관련 master-carton 흐름 이탈이 확인될 때 문맥 링크를 추가 검토한다.
- LOW: 운송사 divisor, 포장재 yield, 공급 리드타임, 작업 속도·단가는 최신 운영 자료로 주기 검토한다.
- 다음 시작 조건: GSC에서 기존 페이지가 5~30위 query 노출 또는 높은 impression·낮은 CTR을 보이거나, GA4에서 특정 계산기의 진입 대비 계산 실행·관련 이동이 약하거나, 사용자 관리 배지·footer·homepage script 구조를 의도적으로 변경할 때 재감사한다.


## 2026-08-10 — Packaging trial Decision guide mobile table repair

### Problem and cause

- Affected URL: `https://packpreptools.com/guides/packaging-trial-and-damage-review.html`.
- At a 390px mobile viewport, each `Observation` row header stayed at about 98.8px while its `Operational response` cell dropped to the next line at full width. This left roughly 256px of unused space to the right of the observation and visually separated the paired content, even though horizontal overflow was zero.
- The page is generated by `scripts/generate-site.js`; the generated guide HTML is not the authoritative source by itself.
- The shared mobile rule set `.content-table th, .content-table td { width: 100%; }`, but the more specific desktop rule `.content-table tbody th { width: 28%; }` continued to win in the cascade. Other Guide and Reference tables also depend on the shared `.content-table` behavior, so changing the global selector would have altered unrelated pages.

### Implementation scope

- `scripts/generate-site.js` adds `decision-guide-table` only to the Decision guide table for the `packaging-trial-and-damage-review` guide.
- `assets/styles.css` adds one rule inside the existing `max-width: 680px` breakpoint: `.content-table.decision-guide-table tbody th { width: 100%; }`.
- The target page receives a target-specific stylesheet cache version so the deployed page fetches the corrected CSS immediately without regenerating cache-query diffs across every page.
- `guides/packaging-trial-and-damage-review.html` was regenerated from the authoritative generator. No calculator, other Guide/Reference table, common table structure, footer, or user-managed badge markup was changed.

### Viewport QA

- 1440px: PASS — table width 880px; Observation about 246.1px and response about 632.9px; both remain `table-cell` in the same row; overflow, clipping, overlap, and console errors 0.
- 1280px: PASS — table width 880px; the same readable two-column layout is retained; overflow, clipping, overlap, and console errors 0.
- 1024px: PASS — table width 880px; the same readable two-column layout is retained; overflow, clipping, overlap, and console errors 0.
- 768px: PASS — table width 721px; Observation about 201.6px and response about 518.4px; both remain in the same row; overflow, clipping, overlap, and console errors 0.
- 390px: PASS — each data row is a 355px-wide card-like group; Observation and response are both about 353px wide and displayed as blocks with a 0px vertical gap. The prior empty area is reduced to the 1px table border, long response text wraps naturally, the shared mobile treatment visually hides the redundant `thead`, and horizontal overflow, clipping, overlap, and console errors are all 0.

### Regression and protection QA

- Homepage at 390px: PASS — horizontal overflow 0, console warning/error 0, and all 5 user-managed badges remain present: KittyLaunch, sellwithboost, twelve.tools, findly.tools, and BoostDomainRating.
- Tools listing at 390px: PASS — horizontal overflow and console warning/error 0.
- Shipping Damage Rate Calculator at 390px: PASS — 1,250/14 produces 1.12%, Reset clears both fields and restores the prompt, and 10/11 produces `Damaged shipments cannot exceed shipments reviewed.`; horizontal overflow and console errors 0.
- `guides/how-to-measure-a-box.html` and `reference/packaging-quality-metrics.html`: PASS at 390px and 1440px — both retain only the shared `content-table` class, have no horizontal overflow, and preserve their existing mobile and desktop behavior. The target-only class is absent.
- Generator badge preservation: PASS — the complete user-managed badge block is byte-for-byte identical before and after generation; badge count, href, images, order, and footer position remain 5 and unchanged. `index.html` diff is 0.
- Automated QA: PASS — JavaScript syntax; 69 HTML pages, 68 sitemap URLs, 5 JavaScript files; 36 calculators, 13 Guides, 11 References; duplicate long paragraphs/sentences 0.
- Calculation verification: PASS — 36 calculators and 181 independent checks.
- `git diff --check`: PASS.


## 2026-08-10 — Last reviewed 종료부와 Shipping Damage Rate 초기 입력 UX

### 조사 결과와 디자인 판단

- `meta-line`은 공개 HTML 63곳에서 63회 사용된다: Tools 36, Guides 13, Reference 11, About/Contact/Privacy 3. 모든 사용처의 내용은 `Last reviewed:`이며 다른 의미의 구분 요소에는 사용되지 않는다.
- 기존 `.meta-line`은 `margin-top: 2.5rem`, `padding-top: 0.8rem`, `border-top: 1px solid var(--slate-200)`였다. Related links가 이미 위쪽 2px 선과 각 항목의 아래쪽 1px 선으로 닫힌 뒤 40px 간격, 패딩, 별도 선이 다시 나와 모바일과 데스크톱 모두 중복 구분처럼 보였다.
- `Last reviewed`는 콘텐츠 구획이 아니라 보조 메타정보이므로 전용 공통 class에서 선과 패딩을 제거하고 24px 수직 간격만 유지하는 전역 수정이 가장 일관되고 안전하다고 판단했다. Related links와 다른 컴포넌트의 border는 변경하지 않았다.

### Calculator 기본값 감사와 구현

- 전체 Calculator 36개, 숫자 입력 182개를 감사했다. 32개 계산기는 현재 기본값만으로 정상 계산된다. `value="0"` 기본값과 placeholder만 있는 입력은 0개였다.
- 빈 값으로 시작하는 계산기는 최신 품질 도구 4개였다: Shipping Damage Rate, Packaging Failure Cost, Packaging Trial Comparison, Package Weight & Dimension Variance.
- 실제 수정은 Shipping Damage Rate 1개뿐이다. 두 입력은 의미가 단순하고 `100 reviewed / 1 damaged = 1%`가 즉시 이해 가능한 예시인 반면, 나머지 세 계산기는 실제 직접비·통제 시험·측정값과 조직별 tolerance가 필요해 임의값이 운영 기준으로 오해될 위험이 크므로 빈 상태를 유지했다.
- Shipping Damage Rate 기본값은 `Shipments reviewed = 100`, `Shipments with observed damage = 1`이다. 입력 패널에 `Example values are illustrative, not industry benchmarks.`를 표시해 업계 평균이나 권장 손상률이 아님을 명시했다.
- 첫 진입 결과 패널은 계산 완료로 표시하지 않고 기존 `idle` 안내를 유지한다. Calculate 후 정확히 `1% observed damage rate`, 99건 미기록 손상, 100건당 1건을 표시한다.
- Reset은 HTML form의 정의된 기본값 100/1로 복원하며 결과 패널과 오류는 기존 `site.js` 흐름으로 `idle` 상태와 `Enter your package details to begin.` 안내로 돌아간다.

### 변경 범위

- authoritative source: `scripts/generate-site.js`의 Shipping Damage Rate registry, 선택적 manifest note 생성, Last reviewed 사용 페이지용 stylesheet cache version.
- 공통 스타일: `assets/styles.css`의 `.meta-line`과 새 `.manifest-note`.
- 생성 HTML: Last reviewed를 사용하는 63개 페이지는 새 stylesheet version만 반영했고, Shipping Damage Rate에는 추가로 100/1과 예시 안내가 반영됐다. 홈페이지와 Last reviewed가 없는 허브·기타 페이지에는 의미 있는 diff가 없다.

### QA

- 로컬 브라우저 1440/1280/1024/768/390px: 홈페이지, Packaging Trial and Shipping Damage Review, Shipping Damage Rate, How to Measure a Box, Packaging Quality and Damage Metrics, Dimensional Weight, Packaging Failure Cost의 35개 조합을 확인했다. 모든 조합에서 horizontal overflow 0, 실제 clipping 0, overlap 0, input overflow 0, console error 0.
- Last reviewed: 5개 폭 모두 border-top 0px, padding-top 0px, Related links 다음 간격 24px. Guide/Reference/Tool에서 동일하게 자연스러운 종료 구조를 유지한다.
- Shipping Damage Rate: 첫 진입 100/1과 idle; Calculate 1%; 1,250/14 재계산 1.12%; 3/1 반올림 33.33%; Reset 100/1과 idle; blank·0 denominator·negative는 `Shipments reviewed must be greater than zero.`; 10/11은 `Damaged shipments cannot exceed shipments reviewed.`; NaN/Infinity는 finite-number 오류. 모든 상태에서 overflow와 console error 0.
- 390px 모바일 메뉴: `aria-expanded=true`, navigation 노출 정상.
- 대표 회귀 계산기: Dimensional Weight 기본값으로 6.91 lb, Reset 후 기존 기본값과 idle 복원. Packaging Failure Cost는 빈 초기 상태와 필수값 오류를 유지하고 예시 입력에서 $867.60. 콘솔 오류와 overflow 0.
- 자동 QA: PASS — 69 HTML, sitemap URL 68, JavaScript 5; Calculator 36, Guides 13, Reference 11; 긴 문단·문장 중복 0.
- 계산 검증: PASS — 36개 계산기, 독립 검사 181개. JavaScript syntax와 `git diff --check`도 PASS.
- 사용자 관리 영역: generator 실행 전후 홈페이지의 KittyLaunch, sellwithboost, twelve.tools, findly.tools, BoostDomainRating 5개 HTML/href/이미지/개수/순서/위치 보존. `index.html` diff 0.

### 남은 위험

- Shipping Damage Rate의 100/1은 입력 방법을 보여 주는 예시일 뿐 실제 운영 목표가 아니다. 안내 문구를 제거하거나 결과를 자동 계산 상태로 바꾸면 벤치마크로 오해될 위험이 다시 커진다.
- Last reviewed 전용 class라는 현재 계약이 바뀌어 다른 의미의 요소에 `meta-line`을 재사용할 경우 새 요소에는 별도 component class를 사용해야 한다.


## 2026-08-10 — Calculator 입력 설명 표 모바일 공통 수정

### 실제 문제와 전체 영향 범위

- 사용자가 확인한 URL은 `https://packpreptools.com/tools/shipping-damage-rate.html`과 `https://packpreptools.com/tools/dimensional-weight.html`이다.
- generator와 36개 Calculator HTML을 전수 조사한 결과, 모든 Calculator가 `How to choose the inputs` 아래에서 동일한 `<table class="content-table">`과 `tbody > tr > th + td` 구조를 사용했다. 전체 입력 설명 행은 182개다.
- 라이브 390px 기준 36개 모두 첫 `th`가 98.8px, 설명 `td`가 353px였다. 첫 셀은 행 폭의 27.8%만 차지한 채 block으로 남았고, 설명은 다음 줄 전체 폭으로 내려가 첫 셀 오른쪽에 255.2px가 비었다. horizontal overflow는 없지만 36개 모두 동일한 시각 결함이었다.
- 데스크톱 규칙 `.content-table tbody th { width: 28%; }`는 class + element 2개의 specificity를 가진다. 공통 680px 모바일 규칙 `.content-table th { width: 100%; }`보다 강해서 `display: block`은 적용되지만 첫 셀의 width만 28%로 남았다.
- 이전 Decision guide 수정은 `.content-table.decision-guide-table tbody th`만 대상으로 했으므로 `decision-guide-table` class가 없는 Calculator에는 적용되지 않았다. Guide와 Reference도 `.content-table`을 공유하므로 무제한 전역 override는 사용하지 않았다.

### 공통 구현과 문구 정리

- authoritative source인 `scripts/generate-site.js`가 모든 Calculator 입력 설명 표에 공통 `calculator-input-table` class를 생성한다.
- 기존 `max-width: 680px` 구간에 `.content-table.calculator-input-table tbody th { width: 100%; }`를 추가했다. `!important` 없이 데스크톱 규칙보다 높은 specificity로 Calculator component만 교정한다.
- 390px 수정 후 36개 Calculator, 182개 행 모두 `th`와 `td`가 353px로 행 폭 355px의 99.4%를 차지한다. 오른쪽 잔여는 1px 테두리뿐이고 두 셀의 vertical gap은 0px다. 실패 페이지, clipping, overflow, console error는 모두 0이다.
- `fieldAdvice()`가 모든 셀 앞에 Calculator 전체 제목을 반복하던 공통 접두사를 제거했다. 182개 행 모두 입력 이름 바로 아래에서 `Measure…`, `Count…`, `Enter…` 등 설명으로 시작하며 의미 정보는 유지된다. 공통 component 안내는 본문 고유성 검사에서 제외해 의도적 재사용과 실제 본문 중복을 구분했다.
- 새 CSS가 필요한 Calculator 36개만 `styles.css?v=20260810-calculator-inputs`로 cache version을 갱신했다. Guide, Reference, 홈페이지, 허브에는 의미 있는 diff가 없다.

### 자동 회귀 검사

- `scripts/qa.js`에 각 Calculator가 정확히 한 개의 `content-table calculator-input-table`을 가지는지 검사하는 규칙을 추가했다.
- 입력 안내에 `Calculator:` 제목 접두사가 다시 생성되면 실패한다.
- scoped CSS selector와 `width: 100%` override가 사라지면 실패한다.
- QA 출력은 `RESPONSIVE TABLE QA PASS — 36 calculator input-definition tables use the scoped mobile override`를 추가로 보고한다. 저장소에 브라우저 런타임 의존성을 추가하지 않고 기존 정적 QA 흐름에 자연스럽게 포함했다.

### 5 viewport와 회귀 QA

- 1440/1280/1024px: Calculator 표는 879px 행에서 `th` 246.1px, `td` 632.9px의 기존 2열 `table-cell` 구조를 유지했다.
- 768px: 720px 행에서 `th` 201.6px, `td` 518.4px의 2열 구조를 유지했다.
- 390px: 355px 행에서 `th`와 `td` 모두 353px block, vertical gap 0px, clipping/overlap/horizontal overflow 0.
- 필수 50개 조합: Shipping Damage Rate, Dimensional Weight, Packaging Cost, Pallet Utilization, Packaging Failure Cost, 대상 Decision guide, 다른 Guide, Reference, 홈페이지, Tools 허브를 5개 폭에서 확인했다. horizontal overflow, cell clipping, element overlap, input overflow, console error 모두 0. 모바일 메뉴도 정상이다.
- 390px 전체 Calculator 전수: 36/36 페이지, 182/182 행 정상. 동일 결함 잔존 페이지 0.
- Shipping Damage Rate는 100/1과 illustrative 안내, Calculate 1%, Reset 100/1 + idle을 유지했다. Dimensional Weight는 기존 기본값과 Calculate 6.91 lb, Reset idle을 유지했다.
- Decision guide는 390px에서 Observation/response 모두 353px로 유지됐다. `.meta-line`은 border-top 0px, margin-top 24px를 유지했다.
- 자동 QA PASS: 공개 HTML 69, sitemap URL 68, JavaScript 5, Calculator 36, Guide 13, Reference 11, 긴 본문 문단·문장 중복 0. 계산 검증 36개/181회와 `git diff --check` PASS.
- generator 실행 후 홈페이지 사용자 관리 배지 KittyLaunch, sellwithboost, twelve.tools, findly.tools, BoostDomainRating 5개의 HTML/href/이미지/개수/순서/위치가 보존됐고 `index.html`은 exact match, diff 0이다.

### 남은 위험

- `calculator-input-table`은 생성기 소유 Calculator 설명표 전용 계약이다. 향후 별도 Calculator template을 추가하면 새 표에도 이 class와 QA 규칙을 적용해야 한다.
- 정적 QA는 component class와 scoped CSS 계약을 보호하고, 이번 작업의 실제 computed width 전수 검증은 브라우저에서 수행했다. CSS cascade를 대규모로 재구성할 때는 390px computed width 전수 QA를 다시 실행한다.


## 2026-08-10 — 신규 검색 클러스터 재탐색 NO-GO

### 시작 상태와 실제 사이트 규모

- 시작 commit: `6c977689035b5078810ea741cc29f2949d4c4399`, branch `main`, `origin/main`과 일치, working tree clean.
- 실제 공개 HTML 69개: 기본·허브·기타 9, Calculator 36, Guide 13, Reference 11. sitemap URL은 68개다.
- Calculator 분포: Package size and fit 7, Materials and usage 4, Cost and inventory 9, Labor and workflow 5, Master cartons 3, Pallet planning 4, Quality and damage control 4.
- 이번 조사에서는 최근 검토된 Returns & Reverse Logistics, Packaging Purchasing & Quote Analysis, Fulfillment Accuracy & Rework, Shipment Consolidation, Packaging Sustainability와 이미 구현된 Packaging Quality & Damage Control을 제외했다. 이름이나 persona만 바꾼 변형도 신규 후보로 인정하지 않았다.
- GSC/GA4 query·impression·landing 데이터와 유료 keyword-volume 도구는 현재 환경에 연결되어 있지 않다. 따라서 정확한 월간 검색량 수치는 만들지 않았고, 실제 검색 결과의 존재·구성, exact-intent 제목, 무료 interactive tool의 입력·출력 깊이, 관련 질문과 커뮤니티 반복 문제만 사용했다.

### 새로 탐색한 후보와 검색어

1. **Packaging Automation & Equipment Economics**
   - 검색어: `packaging machine ROI calculator`, `packaging automation payback calculator`, `case sealer labor savings calculator`, `packaging line bottleneck calculator`, `manual vs automated packaging cost calculator`.
   - 가능한 Tool: automation payback, manual-vs-machine labor cost, case-sealer break-even, packaging-line bottleneck, equipment capacity comparison.
   - 가장 가까운 기존 Tool: Labor Capacity per Shift, Order Packing Time, Prep Batch Time, Packaging Cost per Order.
2. **Packaging Changeover & Downtime**
   - 검색어: `packaging changeover time calculator`, `changeover cost calculator packaging line`, `SMED calculator`, `packaging downtime cost calculator`.
   - 가능한 Tool: changeover cost, SMED time saving, downtime cost, batch-size/setup allocation, recovered capacity.
   - 가장 가까운 기존 Tool: Prep Batch Time, Labor Capacity per Shift, Order Packing Time, Packaging Failure Cost.
3. **Label Roll & Printer Runtime Planning**
   - 검색어: `label roll calculator`, `labels per roll calculator`, `label roll length calculator`, `label printer roll runtime calculator`.
   - 가능한 Tool: labels per roll, roll length from diameter, finished roll diameter, printer runtime, roll-change frequency.
   - 가장 가까운 기존 Tool: Label Cost, Insert Quantity, Packaging Supply Reorder Point.
4. **Stretch Film & Pallet Wrap Planning**
   - 검색어: `stretch wrap calculator`, `stretch film per pallet calculator`, `pallet wrap usage calculator`, `stretch wrap cost per pallet calculator`.
   - 가능한 Tool: film length per pallet, pallets per roll, cost per pallet, pre-stretch comparison, roll forecast.
   - 가장 가까운 기존 Tool: Tape Usage, Packaging Material Budget, Packaging Supply Reorder Point, Pallet Height/Utilization.
5. **Roll/Sheet Cut Yield & Layout Planning**
   - 검색어: `sheet yield calculator`, `packaging sheet cut layout calculator`, `roll material cut yield calculator`, `foam sheet cutting layout calculator`.
   - 가능한 Tool: rectangular parts per sheet, sheets required, waste/yield, roll pitch yield, cut-cost per part.
   - 가장 가까운 기존 Tool: Insert Quantity, Bubble Wrap, Packing Paper, Packaging Waste Allowance.
6. **Packaging Supply Storage & Space Planning**
   - 검색어: `packaging material storage space calculator`, `carton storage space calculator`, `packaging inventory storage capacity calculator`, `warehouse storage space calculator`.
   - 가능한 Tool: flat-carton storage cube, shelf/bin capacity, pallet-position requirement, days-of-supply footprint, storage cost.
   - 가장 가까운 기존 Tool: Box Volume, Carton Cube, Pallet planning tools, Packaging Supply Reorder Point, Packaging Inventory Basics.
7. **Corrugated Compression & Stack Planning**
   - 검색어: `box compression strength calculator`, `BCT calculator`, `ECT to BCT calculator`, `carton stacking strength calculator`.
   - 가능한 Tool: simplified McKee BCT, required ECT, stack load screen, stack-height screen, environmental derating comparison.
   - 가장 가까운 기존 Tool: Master Carton Weight, Pallet Height, Packaging Trial Comparison, Quality metrics.
8. **Gross/Tare/Pallet Weight Planning**
   - 검색어: `packaging tare weight calculator`, `gross net weight calculator`, `pallet gross weight calculator`, `shipment gross weight calculator`.
   - 가능한 Tool: net/gross/tare solver, packed-unit weight, pallet gross weight, shipment total weight.
   - 가장 가까운 기존 Tool: Master Carton Weight, Case Pack, Cases per Pallet, Dimensional Weight.
9. **Packing Station Layout & Capacity**
   - 검색어: `packing station layout calculator`, `packing station capacity calculator`, `pack stations needed calculator`, `packing bench space planner`.
   - 가능한 Tool: stations required, bench footprint, hourly queue capacity, peak staffing, material-position capacity.
   - 가장 가까운 기존 Tool: Labor Capacity per Shift, Order Packing Time, Prep Batch Time, Packing Station Workflow guide.

### 실제 SERP와 무료 경쟁

- **Automation / equipment:** `oeecalculator.app`의 무료 LineIQ는 machine별 rate·failure·repair 입력, line OEE, bottleneck, parallel equipment, accumulator placement ROI, equipment upgrade payback, scenario 저장과 PDF까지 제공한다. 3M-Matic calculator는 operator 수·burden labor·boxes/hour·machine cost로 cost/box, annual savings, payoff days를 계산한다. Viking Masek, PackVantage, PiP Automation, Link Pack 등도 무료 packaging-equipment ROI를 제공한다.
- **Changeover / downtime:** WorkCell의 무료 SMED calculator는 internal/external setup, target internal time, changes/week, machine rate로 time/cost/annual capacity를 계산한다. Symestic는 downtime 외에도 OEE, MTBF/MTTR, takt, SMED, first-pass yield, machine rate를 한 무료 suite로 제공하고 downtime tool은 duration, affected capacity, throughput, contribution margin, idle labor, overhead, one-off cost, annual events를 받는다. CalcBee도 packaging-line preset이 있는 setup-time calculator를 제공한다.
- **Label rolls:** Avery Dennison은 metric/imperial roll length, roll diameter, liner-caliper length comparison 세 계산기를 한 페이지에서 제공한다. HERMA, Flexcon, Mactac, Lauterbach, Label Plus도 core diameter·outer diameter·thickness·label repeat/gap 기반 도구를 무료 제공한다.
- **Stretch film:** LogisticsCalc의 무료 도구는 pallet footprint, load height, roll width/length/cost, pre-stretch, overlap을 받아 film/pallet, pallets/roll, cost/pallet을 한 번에 계산한다. Excelerate, WebTech360, Depako, Springpack 등도 같은 핵심 intent를 직접 해결한다.
- **Sheet/roll yield:** Interstate Plastics는 normal/rotated뿐 아니라 hybrid partition nesting까지 계산한다. Mantech는 spacing/kerf, job quantity, yield와 layout preview를 제공하고 CutWize는 mixed-part layout까지 제공한다. Innovapax는 packaging film의 roll length·pitch·lanes로 packs/roll과 cost/pack을 계산한다.
- **Storage:** Packlyt는 Warehouse Space, Storage Cost, Inventory Density, Rack Capacity의 4개 무료 cluster를 이미 제공한다. DimPack3D와 PalletShuttle도 pallet positions, floor area, levels, racking/aisle assumptions을 다루며, 검색 결과는 packaging-supply 전용보다 warehouse/self-storage intent가 우세했다.
- **Compression:** Westpak은 simplified McKee BCT calculator와 물리 시험 한계를 함께 제공한다. PackCalc는 BCT, required ECT, stack safety, humidity/time derating, report까지 제공한다. LogisticsCalc, Teal Packaging 등 exact-intent 무료 도구도 상위 결과에 다수다.
- **Weight:** SensorsOne과 Calculator Academy가 gross/net/tare를 직접 해결하고, Palletly·Warp·Freight Sidekick은 carton count, pallet tare, gross load, height/weight limit까지 계산한다.
- **Packing station:** exact calculator 결과보다 packing-bench buying guide, warehouse 2D/3D planner, broad warehouse-capacity 도구가 우세했다. calculator intent가 명확하지 않았고 기존 Pack Prep Tools 노동·workflow 도구와의 경계도 약했다.

### 후보별 판정

- **Packaging Automation & Equipment Economics — REJECT.** 실제 구매·payback 검색 의도와 5개 Tool 확장 가능성은 가장 강했다. 그러나 LineIQ가 packaging-line bottleneck·OEE·ROI·payback을 무료로 통합 제공하고, 장비사별 ROI 도구도 exact intent를 깊게 해결한다. 새 cluster는 기존 노동·시간·비용 Tool과도 상당 부분 중복된다.
- **Packaging Changeover & Downtime — REJECT.** 반복 측정 가치는 있으나 무료 SMED/downtime/OEE suite가 과포화되어 있고 packaging-specific long-tail도 WorkCell·CalcBee·Symestic가 직접 처리한다. 4개 Tool을 만들면 같은 `time × rate × frequency` 산술을 분할한 doorway 구조가 된다.
- **Label Roll & Printer Runtime — REJECT.** 실제 검색 의도는 명확하지만 강한 제조사 무료 도구가 length·diameter·comparison까지 한 페이지에서 해결한다. 후보 5개 중 3개가 동일한 roll geometry의 역산이고 Label Cost와도 겹친다.
- **Stretch Film & Pallet Wrap — REJECT.** 수요와 반복 사용성은 있으나 한 강한 무료 calculator가 usage, rolls, cost, pre-stretch를 이미 통합한다. 4개 페이지로 나누면 한 계산의 출력별 복제에 가깝고 containment 안전성을 계산 결과로 오해할 위험도 있다.
- **Roll/Sheet Cut Yield — REJECT.** 수요는 강하지만 무료 경쟁이 시각 layout, rotation, hybrid nesting, mixed parts, export까지 제공한다. Pack Prep Tools가 단순 grid 계산으로 진입하면 기능 열위이고, 고급 nesting을 구현하면 현재 사이트 범위를 크게 벗어난다.
- **Packaging Supply Storage & Space — REJECT.** warehouse-space 수요는 있으나 packaging-supply 전용 검색 의도는 약하다. 4개 Tool은 기존 cube, pallet, reorder 계산을 재조합하거나 rack/aisle 운영 SaaS 영역으로 넘어간다.
- **Corrugated Compression & Stack — REJECT.** 검색 의도와 formula는 강하지만 무료 전문 도구가 압도적으로 깊다. McKee estimate를 실제 stacking strength로 오해할 책임 위험이 높고 습도·creep·board variability·pallet support에는 검증 자료와 물리 시험이 필요하다.
- **Gross/Tare/Pallet Weight — REJECT.** 유용하지만 산술이 단순하고 무료 exact tools가 많다. 독립 Tool 4개를 만들면 기존 Master Carton/Pallet Tool의 입력·출력 변형이 된다.
- **Packing Station Layout & Capacity — REJECT.** exact calculator 검색 수요가 충분히 확인되지 않았고 layout은 2D/3D planner 또는 vendor bench guide intent가 우세하다. 수치 Tool은 기존 Labor Capacity, Order Packing Time, Prep Batch Time과 중복된다.

### 최종 결정

- **NO-GO — 신규 production HTML/CSS/JS, registry, sitemap, llms, hub를 변경하지 않는다.**
- 9개 신규 각도를 조사했지만 GO 조건 9개를 동시에 만족한 후보가 없다. 강한 수요가 있는 후보는 무료 직접 경쟁이 이미 전체 workflow를 해결하거나 engineering/안전 위험이 높았고, 경쟁이 약한 후보는 검색 의도와 4개 독립 Tool 확장성이 부족했다.
- 이번 조사에서 가장 가까웠던 후보는 Packaging Automation & Equipment Economics였지만, 2026년 현재 무료 LineIQ의 기능 깊이가 결정적인 기각 근거다. 이름이나 small-seller modifier만 바꿔 진입하지 않는다.
- production 파일은 변경하지 않고 이 handover 기록만 남긴다. 기존 36 Calculator, 13 Guide, 11 Reference와 최근 responsive table, Decision guide, Last reviewed, Shipping Damage Rate 기본값을 그대로 보존한다.

### 재검토 조건과 위험

- **HIGH:** 없음. 구현하지 않았으므로 신규 계산·규정·안전 노출이 없다.
- **MEDIUM:** 정확한 keyword volume과 GSC/GA4 first-party query 데이터가 없다. 이번 NO-GO는 실제 SERP 경쟁과 기능 깊이에 기반하지만 검색량 크기 자체를 수치로 검증한 것은 아니다.
- **LOW:** 검색 결과는 시간에 따라 바뀐다. 후보를 재검토할 때 동일 쿼리의 상위 10개 결과와 무료 도구 기능을 다시 확인한다.
- 재검토 신호: (1) GSC에서 위 exact long-tail이 여러 기존 페이지에 반복 노출, (2) GA4/사용자 요청에서 동일 workflow 요구 반복, (3) LineIQ·Avery·LogisticsCalc·PackCalc 같은 현재 강한 무료 도구가 폐쇄/유료화되거나 특정 기능을 제거, (4) 최소 4개 Tool에 서로 다른 input·logic·output·action을 정의할 수 있는 현장 데이터 확보.


## 2026-08-11 — 신규 클러스터 발굴 방법 심층 재검증 NO-GO

### 시작 상태, 원격 확인, 실제 사이트 범위

- 실제 checkout: 작업 공간 안의 `repo` 디렉터리. 바깥 디렉터리는 commit이 없는 래퍼 Git 저장소였으므로 작업 대상에서 제외했다.
- 시작 local HEAD: `7fc9728f3a598b7e3bed1d030066cfd5bb6ac1c5`; branch `main`; working tree clean.
- origin: `https://github.com/canghun13/packpreptools.git`.
- `git ls-remote origin refs/heads/main` 결과와 `git fetch origin main` 뒤 `origin/main`은 모두 `7fc9728f3a598b7e3bed1d030066cfd5bb6ac1c5`였다. ahead/behind `0/0`이므로 pull은 필요하지 않았다.
- 저장소에서 다시 센 실제 규모: 공개 HTML 69, Calculator 36, Guide 13, Reference 11, 기본·Hub·기타 9, sitemap URL 68(404 제외).
- 최신 추가 클러스터는 Packaging Quality & Damage Control(Hub 1, Calculator 4, Guide 1, Reference 1)이다.
- Calculator 36개와 핵심 목적: Package size and fit — Dimensional Weight(부피 기반 청구중량), Length + Girth(길이+둘레), Box Size(보호 여유를 포함한 최소 내부치수), Box Volume(직육면체 용적), Poly Mailer Size(두께·여유·플랩을 포함한 mailer 크기), Box Utilization(상품 부피 점유율), Multi-item Box Fit(동일 직육면체 상품의 6방향 grid fit); Materials and usage — Void Fill(빈 부피), Bubble Wrap(표면적·층·겹침), Packing Paper(사용자 yield 기반 sheet 수), Tape Usage(center/H-seal 길이); Cost and inventory — Packaging Cost per Order(재료+폐기+노동), Carton Count(필요 carton), Case Pack(총 사용 가능 unit), Packaging Material Budget(물량·재료비·폐기·예비비), Monthly Packaging Spend(월/기간 spend), Label Cost(수량·폐기·비용), Insert Quantity(인서트 수량), Packaging Waste Allowance(기초수량+폐기율), Packaging Supply Reorder Point(사용량·lead time·safety stock); Labor and workflow — Order Packing Time(batch 소요시간), Labor Capacity per Shift(인원·시간·utilization 기반 capacity), Prep Batch Time(setup+unit work+check), Kitting Cost(component·packaging·labor), Bundle Packing Cost(handling·material·labor); Master cartons — Master Carton Dimensions(layout 기반 내부치수), Master Carton Weight(단위중량+tare와 사용자 limit), Carton Cube(단일/총 cube); Pallet planning — Cases per Pallet(직선/회전 grid), Pallet Layer Count(필요 layer), Pallet Height(총 높이와 사용자 limit), Pallet Utilization(footprint utilization); Quality and damage — Shipping Damage Rate(관찰 손상률), Packaging Failure Cost(기록된 직접 실패비용), Packaging Trial Comparison(두 trial의 손상·원가·시간·중량 비교), Package Weight & Dimension Variance(기록/실측 편차와 사용자 tolerance).

### 이번 탐색에서 제외한 최근 후보

- 2026-08-08 이전 기록: Returns & Reverse Logistics, Packaging Purchasing & Quote Analysis, Fulfillment Accuracy & Rework, Shipment Consolidation, Packaging Sustainability 및 이름·persona만 바꾼 변형.
- 2026-08-10 기록: Packaging Automation & Equipment Economics, Packaging Changeover & Downtime, Label Roll & Printer Runtime Planning, Stretch Film & Pallet Wrap Planning, Roll/Sheet Cut Yield & Layout Planning, Packaging Supply Storage & Space Planning, Corrugated Compression & Stack Planning, Gross/Tare/Pallet Weight Planning, Packing Station Layout & Capacity.
- 이미 구현된 Packaging Quality & Damage Control도 신규 후보에서 제외했다. 이번 후보의 일부 workflow가 위 주제와 닿아도, 검색 의도·핵심 로직·결과 행동이 다른지 확인하기 전에는 자동 기각하지 않았다.

### 문제·의도 공간에서 만든 10개 신규 candidate family

| Family | 사용자 / 실제 문제 / 발생 시점 | 현재 workaround와 대표 검색 표현 | 가장 가까운 기존 Tool / 미해결 부분 | 예상 독립 Tool 수 |
|---|---|---|---|---:|
| Industrial Poly Bags, Liners & Covers | 소형 제조·wholesale shipper가 box, bin, drum, pallet에 맞는 liner/cover를 주문할 때 layflat·gusset·tie-off 치수를 혼동 | 공급사 표·샘플 주문·수식; `gusseted poly bag size calculator`, `box liner calculator`, `pallet cover bag size calculator`, `drum liner size` | Poly Mailer Size / 산업용 liner·cover의 gusset, overhang, tie-off, 원형 container가 없음 | 2–3 |
| Packaging Version Cutover & Obsolescence | 브랜드·co-packer가 새 label/carton artwork로 전환할 때 구재고 소진일, dual stock, scrap exposure를 관리 | Excel run-out 표·ERP·change-control 문서; `packaging inventory depletion`, `label changeover inventory`, `obsolete packaging calculator`, `artwork transition plan` | Reorder Point·Monthly Spend / old/new version effectivity·scrap·overlap 의사결정이 없음 | 3 |
| Point-of-use Consumable Replenishment | pack bench·small warehouse가 tape/labels/inserts를 line-side bin으로 보충할 때 stockout와 과다 WIP를 피함 | 2-bin card·Kanban spreadsheet·감; `kanban bin sizing calculator`, `line side inventory calculator`, `packaging consumables replenishment`, `container size sensitivity` | Reorder Point / warehouse purchase trigger가 아니라 station bin·card·route 주기 결정 | 2–3 |
| Order-mix & Dispatch Deadline Planning | peak-season seller·fulfillment operator가 single/multi-line/fragile 주문 mix와 carrier cutoff를 맞출 때 | 평균 minutes/order, 수작업 spreadsheet, WES; `order mix packing capacity`, `backlog clearance time`, `pack staffing for cutoff`, `batch release packing capacity` | Labor Capacity·Order Packing Time / mix 가중 workload, 기존 backlog와 deadline gap, release pacing이 없음 | 3 |
| Strapping & Edge-protection Consumption | wholesale shipper가 carton/pallet batch의 strap 길이·coil·corner board를 준비할 때 | pallet 둘레를 재고 수작업 곱셈·공급사 guide; `pallet strapping length calculator`, `boxes per strapping coil`, `strapping cost per pallet`, `edge protector quantity` | Tape Usage·Pallet tools / band path·grip/seal allowance·coil consumption·edge-board 수량이 없음 | 2–3 |
| Kit Component Availability & Shortage | subscription box·handmade seller가 component stock으로 완성 가능한 kit 수와 부족품을 판단할 때 | BOM spreadsheet, Shopify/ERP kit 기능; `kit availability calculator`, `maximum kits from inventory`, `BOM shortage calculator`, `components needed for batch` | Kitting Cost·Insert Quantity / 비용이 아니라 limiting component·available-to-build·shortage action | 2–3 |
| Corrugated Partitions & Divider Planning | fragile-item seller·small manufacturer가 box 내부 cell과 divider 수량을 주문할 때 | CAD, supplier quote form, mock-up; `box divider calculator`, `carton partition calculator`, `divider cells per box`, `partition strips required` | Multi-item Box Fit·Insert Quantity / protective cells, tolerance, blind cells, longitudinal/transverse strips가 없음 | 2 |
| Carton Assortment & Box Portfolio | multi-SKU seller가 재고 box 규격 수를 줄이면서 주문 coverage와 void를 유지할 때 | order export+Excel, WMS cartonization, consultant/SaaS; `carton assortment optimization`, `box size portfolio`, `packaging SKU rationalization`, `best stock box assortment` | Box Fit·Utilization·Box Size / 여러 SKU·주문과 여러 후보 box를 함께 최적화하지 않음 | 2–3 |
| Repack / Overpack Workload Planning | small manufacturer·warehouse가 label correction, damaged outer carton, overpack project의 노동·재료·완료일을 계획할 때 | rework order·Excel hours·별도 work center; `repack labor hours calculator`, `repacking workload planner`, `overpack project cost`, `rework queue clearance` | Prep Batch Time·Packaging Failure Cost / 원인별 disposition, 재사용/교체재료, 기존 queue와 completion date가 없음 | 2–3 |
| Mailing Tube & Cylindrical Pack Planning | poster·print·odd-size seller가 roll/tube의 diameter·usable length·end-cap allowance·shipping dimensions를 정할 때 | vendor chart, 샘플 roll, carrier guide; `mailing tube size calculator`, `poster tube diameter`, `tube capacity calculator`, `cylindrical package girth` | Length + Girth·DIM Weight·Box Size / roll diameter·cap seating·tube usable length·round product fit이 없음 | 2–3 |

### 후보별 롱테일 트리

1. **Industrial Poly Bags, Liners & Covers** → rectangular box liner with tie-off → gusseted pallet cover with overhang → round drum liner/cover → bag film weight by gauge and quantity.
2. **Packaging Version Cutover & Obsolescence** → old label stock depletion date → mandatory-date scrap exposure → dual-inventory overlap and storage → transition buy quantity before new version arrival.
3. **Point-of-use Consumable Replenishment** → two-bin packaging consumables → per-station container size → replenishment trip frequency/milk-run → peak-shift safety factor.
4. **Order-mix & Dispatch Deadline Planning** → weighted minutes for single/multi-line orders → existing backlog clearance → staffing to carrier cutoff → controlled release rate from pick to pack.
5. **Strapping & Edge Protection** → carton band length with allowance → pallet vertical/horizontal band path → coils for batch and remainder → edge/corner protector quantity and length.
6. **Kit Component Availability** → maximum complete kits from on-hand → target batch shortage by component → leftover components after build → shared-component allocation across two kits.
7. **Corrugated Partitions & Dividers** → cells per box with tolerance → blind-cell edge rows → dividers required for product quantity → longitudinal/transverse strip count and cut length.
8. **Carton Assortment & Box Portfolio** → demand-weighted box coverage → remove-one-size scenario → add-one-size void reduction → current-versus-proposed assortment cost/cube.
9. **Repack / Overpack Workload** → units by disposition path → labor/material hours and cost → queue completion date by workers/shift → old-versus-new method scenario.
10. **Mailing Tube & Cylindrical Pack** → rolled item diameter from thickness/layers → tube ID and cap clearance → items/circles per tube → outer shipping girth/DIM representation.

### 실제 검색과 SERP 수요 신호

- 정확한 keyword volume, GSC query, GA4 first-party 검색 데이터는 연결되지 않았다. 월간 수치를 추정하지 않았다.
- 실제 SERP에서 강한 exact tool intent가 확인된 것은 bag/liner sizing, Kanban sizing, carton/box optimization, divider configuration이었다. 이들은 여러 vendor calculator와 무료 독립 도구가 상위 결과에 반복됐다.
- packaging cutover는 run-out/depletion worksheet, ERP phase-out 문서, artwork management SaaS가 반복됐지만 calculator intent는 약했다. order-mix/backlog, repack, strapping, tube도 실무 문제·forum·manual formula 신호는 있었으나 4개 도구 묶음의 exact calculator SERP는 약했다.
- 반복 실무 신호 예: Reddit의 kit available-to-build/공유 component oversell 질문, Excel의 inventory run-out/BOM shortage 질문, manufacturing의 WIP buffer·two-bin 논의, SAP의 repack labor work-center 질문, 물류 forum의 tube 입력 방식과 pallet corner/strap 문제.
- 대표 query는 위 matrix와 롱테일 트리에 기록했으며, modifier `calculator`, `planner`, `tool`, `formula`, `worksheet`, `spreadsheet`, `how many`, `per shift`, `cost`, `capacity`, `quantity`, `waste`, `throughput`, `cutover`, `packing`, `warehouse`를 조합했다.

### 실제로 연 경쟁 Tool의 기능 범위

| Tool | 실제 입력 | 실제 출력·깊이 | 제약·workflow 판단 |
|---|---|---|---|
| Base Plastics Bag Size Calculator — https://www.baseplastics.com/about-base/bag-size-calculator/ | rectangular length/width/height; round diameter/height | box liner tie-off 6 in, 8 in overhang, pallet cover; drum liner/cover를 한 화면에서 계산 | 무료·로그인 없음·vendor quote 연결. 모바일 페이지에서 input/output 접근 가능. bag 변형을 별도 Tool로 나눌 여지가 작음 |
| Elements Supply / Poly Bags Online / Armor — https://elementssupply.com/pages/calculator-page , https://polybagsonline.co.uk/box-polybag-calculator.html , https://diginable.com/bag-calc/ | box/pallet L/W/H, layflat/gusset, closure | liner, pallet cover, layflat/gusset variants와 tie-off allowance | 여러 vendor가 같은 롱테일까지 무료로 커버. 일부는 quote 중심이지만 계산 자체는 공개 |
| CalcBee Kanban Sizing — https://www.calcbee.com/calculators/business/operations/kanban-sizing/ | daily demand, lead time, safety factor, container size, unit cost | cards, raw value, WIP, days supply, investment, minimum cards, buffer units; 6 safety-factor와 5 container-size scenario 표 | 무료·로그인 없음·자동 갱신·모바일 가능. supplier/withdrawal/line-side를 모두 설명하여 packaging modifier만으로 빈 공간이 생기지 않음 |
| Packwire Box Size Optimizer — https://packwire.com/box-size-optimizer | multi-product L/W/H/weight/qty, 추가 product, void-fill 종류 | 수백 arrangement·회전·layer heuristic, 최소 custom box, clearance/0.25 in rounding, DIM/billable weight 해석 | 무료·로그인 없이 계산 UI, vendor custom-box 연결. mixed SKU와 protection allowance 롱테일까지 깊음 |
| Gefache24 Divider Calculator — https://www.cardboard-dividers.com/ | box inner L/W/tolerance, product L/W/H/tolerance, material, blind cells, product qty/delivery mode | cells/divider, required dividers, longitudinal/transverse bars, cell sizes, material, assembled/flat delivery; quote·sample | 무료·로그인 없음·다재료·blind-cell까지 제공. 모바일은 길지만 usable. 독립 divider workflow 대부분을 한 도구가 해결 |
| BoxVolume / FractalPack / Boxtelligence — https://boxvolume.com/en , https://www.fractalpack.com/ , https://www.boxtelligence.com/ | mixed items·available boxes·order/carton dataset 또는 volume/cost sliders | 3D packing, best box, assortment suggestion, scenario/savings | BoxVolume은 무료 3D, 상용 서비스는 데이터 분석/API. 단순 calculator는 기능 열위, 진짜 portfolio 최적화는 현재 scope보다 큼 |
| ShipHero kit availability / Fabrikator planner — https://software-help.shiphero.com/hc/en-us/articles/4419344900749-Understanding-How-Kit-Availability-Is-Calculated , https://www.fabrikator.io/free-tool-raw-material-planner | component on-hand/BOM, recipes, production plan | limiting component 기반 kit availability; required/on-hand/need-to-order와 breakdown | kit intent는 존재하지만 packaging 전용이 아니고 ERP/production planner가 자연스러운 workflow. multi-kit allocation은 데이터·optimization 필요 |
| Fiddle/SAP/artwork SaaS — https://fiddle.io/help/inventory/depletion-plans , https://help.sap.com/saphelp_snc70/helpdata/en/be/ac6c42c6b29c60e10000000a1550b0/content.htm?no_cache=true , https://en.ennov.com/solutions/regulatory/artwork/ | stock, consumption, incoming supply, phase-out forecast, versions/approvals | run-out/reorder dates; surplus; controlled version, audit trail, approvals | cutover 문제는 실재하지만 단순 산술보다 lot/effectivity/approval/traceability가 핵심. 잘못 단순화하면 규제·label mix-up 위험 |
- 별도 상호작용 확인: Packwire는 product row 추가와 void-fill 선택을 노출하고 계산 원리를 상세 공개했다. CalcBee는 기본 입력으로 15 cards, 750 WIP, 3.8 days, $11,250 및 scenario 표를 즉시 표시했다. Gefache24는 기본 상태에서 6 compartments, 3 longitudinal/4 transverse bars, 88 mm cell 결과까지 표시했다. Base Plastics는 rectangular·round input과 6개 결과 필드를 실제 DOM에서 확인했다.

### 후보별 가능한 Tool 설계와 Input → Logic → Output → Action 비교

1. **Industrial Poly Bags, Liners & Covers**
   - Box Liner Size: box L/W/H + tie allowance → gusset/layflat geometry → bag W/G/L → stock size/quote 선택. Closest Poly Mailer; closure·container intent는 다르지만 독립.
   - Pallet Cover Size: pallet L/W/loaded H + overhang → cover geometry → W/G/L → cover 주문. Closest Pallet Height; logic/action 독립.
   - Drum Liner/Cover: diameter/H + tie/overhang → circumference-based layflat → bag W/L → drum liner 주문. Closest 없음; 독립.
   - Film Weight/Bag Quantity: bag W/G/L/gauge/density/qty → film area×thickness×density → weight/cost → freight/purchase 검토. Closest Packaging Material Budget; 산술·행동은 다름.
   - 그러나 앞의 3개는 같은 container-to-bag geometry의 형태별 출력이며 Base Plastics가 한 화면에서 이미 통합한다. Film Weight는 sizing보다 material purchasing cluster에 가까워 자연스러운 4번째가 아니다. 실질 독립 Tool은 3개 미만.
2. **Packaging Version Cutover & Obsolescence**
   - Depletion Date: old stock/daily use/date → stock÷use → run-out date → cutover schedule. Closest Reorder Point; output/action 독립.
   - Mandatory-date Exposure: old stock/forecast/mandatory date/unit cost → projected remainder → units/value at risk → consume/relabel/scrap 검토. Closest Monthly Spend; 독립.
   - Transition Buy: new material lead time/MOQ/usage/old stock → time-phased balance → first new buy/overlap → PO plan. Closest Reorder Point; 일부 logic 중복.
   - Dual-stock Space: old/new inventory/pack cube/overlap days → peak combined positions → storage flag → site readiness. Closest storage 후보·Carton Cube; 단순 cube 재조합.
   - 실제 핵심 action은 effectivity·lot·approval·line clearance이며 단순 계산이 이를 안전하게 대체하지 못한다. 자연스러운 반복 계산은 3개 이하이고 packaging-specific calculator SERP도 약함.
3. **Point-of-use Consumable Replenishment**
   - Kanban Cards: demand/lead/safety/container → ceil(demand×lead×factor/container) → cards/WIP → card 수 설정. Closest Reorder Point; station action 독립.
   - Two-bin Size: demand distribution/lead/service target → base stock/safety → bin qty/fill rate → bin 교체. Closest Reorder Point; data 요구와 action 일부 독립.
   - Replenishment Trips: stations×use/bin capacity/shift → refill events → trips/shift → milk-run 주기. Closest Labor Capacity; 독립.
   - Point-of-use Investment: bins×qty×unit cost → WIP value → cash/space → container scenario. Closest Material Budget; Kanban의 파생 출력.
   - CalcBee가 cards, WIP, days, investment, safety/container scenario를 이미 통합하며 trips만 남는다. 독립 Tool은 2개 정도.
4. **Order-mix & Dispatch Deadline Planning**
   - Weighted Pack Time: order classes/count/minutes → weighted workload → total hours/blended minutes → shift plan. Closest Order Packing Time; multi-class logic/action은 독립.
   - Backlog Clearance: backlog+arrival rate+net pack rate → queue balance → clearance time/never-clears flag → capacity 조정. Closest Labor Capacity; 독립.
   - Cutoff Staffing: class mix/deadline/current backlog/utilization → required labor minutes/available minutes → workers gap → staffing. Closest Labor Capacity; 여러 기존 output을 deadline 기준으로 역산.
   - Release Rate: pick rate/pack capacity/WIP cap → min downstream capacity, queue projection → safe batch release → wave size 조정. Closest Prep Batch Time; 독립.
   - 수학적으로 4개를 정의할 수 있으나 exact calculator SERP가 약하고 첫·셋째는 기존 두 노동 Tool의 multi-row/goal-seek 확장이다. release pacing은 live order priority와 cutoff를 가진 WES 영역이며 단순 static tool의 action 신뢰도가 낮다. 자연스러운 standalone은 3개 이하.
5. **Strapping & Edge Protection**
   - Strap Length: package dimensions/band paths/count/allowance → path perimeter sum → length/load → cut list. Closest Tape Usage; 독립.
   - Coils for Batch: length/load×loads+waste/coil length → ceil coils/remainder → coil issue/purchase. Closest Waste Allowance; 독립이지만 첫 Tool의 downstream.
   - Strap Cost: used length/coil cost or cost/foot → cost/load/batch → consumable budget. Closest Packaging Cost; 첫 Tool의 비용 출력.
   - Edge Boards: load H/corners/loads/stock length → pieces/linear length → bundles → stage material. Closest Insert Quantity; 독립.
   - 실질적으로 strap 계산 1개+edge board 1개이며 나머지는 output 분할이다. band 수·tension·containment을 추천하면 안전 검증 위험이 생기므로 사용자가 pattern을 입력하게 해야 하고, 그러면 4 Tool cluster가 성립하지 않는다.
6. **Kit Component Availability & Shortage**
   - Available-to-build: component on-hand/per-kit → min floor(on-hand/need) → max kits/limiter → 판매가능 수량 조정. Closest Kitting Cost; 독립.
   - Target Batch Shortage: target kits/BOM/on-hand/incoming → required-minus-available → shortage list → purchase/pick. Closest Insert Quantity; 독립.
   - Leftover After Build: build qty/BOM/on-hand → residual by component → leftovers → reuse/reorder. Closest Case Pack; 첫 두 Tool의 complementary output.
   - Shared Allocation: two kit demands/shared inventory/priority → constrained allocation → feasible kit mix → channel allocation. Closest 없음; 독립이나 optimization/rules 필요.
   - 반복 문제는 강하지만 packaging보다 generic BOM/ERP intent가 우세하다. 3번째는 같은 BOM balance의 출력이고 4번째는 단순 무료 static calculator 범위를 넘어선다. 자연스러운 Tool 2–3개.
7. **Corrugated Partitions & Dividers**
   - Cells per Box: box ID/product/tolerance/material caliper → floor grid → cells/cell size → divider layout. Closest Multi-item Box Fit; protective cell logic 독립.
   - Divider Quantity: items/cells per divider → ceil → divider qty/top-layer remainder → quote. Closest Insert Quantity; 독립.
   - Strip Cut List: rows/columns/box cell dimensions/notch → strip count/length → sheet/cut plan → fabricate. Closest Sheet Yield excluded 후보; manufacturing CAD 쪽.
   - Blind-cell Scenario: edge rows/material → usable cells/layout difference → compare protection/capacity → prototype. Closest Trial Comparison; 첫 Tool 옵션에 가까움.
   - Gefache24가 tolerance, material, blind cells, cell/strip counts, total dividers, delivery까지 한 도구에서 해결한다. 독립 Tool은 2개이고 구조 성능은 물리 검증 필요.
8. **Carton Assortment & Box Portfolio**
   - Coverage Matrix: SKU/order dimensions×box list → fit tests → coverage/exception → box mapping. Closest Multi-item Box Fit; dataset-level로 독립.
   - Remove-one-size: historical assignments/candidate boxes → reassign → void/DIM/cost delta → SKU rationalization. Closest Box Utilization; 독립.
   - Add-one-size: unserved order clusters/candidate dimension → objective improvement → best candidate → sourcing trial. Closest Box Size; optimization으로 독립.
   - Portfolio Compare: current/proposed box sets+frequency+cost → weighted cube/material/storage → delta → portfolio 결정. Closest Packaging Trial Comparison; 독립.
   - 겉보기에는 4개지만 모두 동일 historical order dataset과 3D/cartonization engine의 modes다. 정확한 결과에는 mixed-item packing, orientation, rules, protection, carrier rounding이 필요하다. Packwire/BoxVolume/FractalPack 수준보다 단순하면 기능 열위이고 고급 구현은 유지관리 범위를 초과한다.
9. **Repack / Overpack Workload**
   - Disposition Workload: units by action×standard minutes → labor hours → work-center load → assign labor. Closest Prep Batch Time; multi-path logic 독립.
   - Repack Material Need: units by path×materials+waste → materials → staging/PO. Closest Insert Quantity/Waste Allowance; 재조합.
   - Queue Completion: backlog/arrival/workers/rate/shift → projected balance → completion date → schedule. Closest backlog 후보/Labor Capacity; 독립.
   - Repack Cost Compare: path materials+labor+overhead → unit/total and method delta → approve method. Closest Packaging Failure Cost/Kitting Cost; 중복.
   - 최근 제외한 Fulfillment Accuracy & Rework와 본질적으로 맞닿고, calculator 검색 의도는 약하다. 독립 Tool은 workload와 queue 2개 정도이며 나머지는 기존 수량·비용 Tool의 재조합.
10. **Mailing Tube & Cylindrical Pack**
   - Rolled-item Diameter: sheet length/thickness/core → spiral area approximation → finished OD → tube 후보. Closest 없음; 독립이나 material compression/roll tightness 검증 필요.
   - Tube Size: roll OD/length/cap clearance → required ID/usable length → tube size → 샘플 주문. Closest Box Size; 형상·action 독립.
   - Circular Items per Tube: tube ID/item OD/length → circle packing/grid → count → pack quantity. Closest Multi-item Fit; 독립.
   - Shipping Girth/DIM: tube outer L/D/carrier-entered convention → circumference or bounding box → girth/DIM → label 입력 검토. Closest Length+Girth·DIM Weight; 기존 Tool과 같은 action.
   - 첫 Tool은 실제 material behavior 가정이 크고 네 번째는 기존 Tool 중복이다. usable tube sizing과 circular capacity 2개만 확실하며 exact 검색 결과도 vendor chart/guide 중심이다.

### 후보 비교와 판정

| Family | 수요/tool intent | 무료 coverage | 기존 Tool 독립성 | 자연스러운 반복 Tool | 복잡도·위험 | 판정 |
|---|---|---|---|---:|---|---|
| Industrial Bags/Liners | 강함 | 매우 높음, 형태 롱테일까지 통합 | 2–3개는 다름 | 2–3 | 낮음 | REJECT |
| Version Cutover | 문제 수요 중간, calculator 약함 | ERP/artwork workflow 높음 | 3개 정도 다름 | 3 | traceability·규제 위험 | REJECT |
| Point-of-use Replenishment | 강함 | CalcBee가 scenario까지 통합 | trip만 뚜렷 | 2 | 중간 | REJECT |
| Order-mix/Deadline | 문제 수요 중간, exact tool 약함 | WES/SaaS 중심 | 3개 정도 다름 | 3 | live data·우선순위 | HOLD |
| Strapping/Edge | manual formula 신호 | exact calculator 낮음 | 2개 다름 | 2 | containment 오해 위험 | REJECT |
| Kit Availability | 반복 문제 강함 | ERP/BOM planner 높음 | 2–3개 다름 | 2–3 | generic scope/공유 allocation | HOLD |
| Partitions/Dividers | exact intent 강함 | 한 무료 tool이 거의 전체 workflow | 2개 다름 | 2 | prototype 필요 | REJECT |
| Carton Portfolio | 상업 수요 강함 | 3D/optimization 경쟁 강함 | modes는 다름 | 2–3 engine modes | 구현·유지관리 매우 큼 | REJECT |
| Repack Workload | 문제 신호는 있음, calculator 약함 | ERP/work order 중심 | 2개 다름 | 2 | 최근 제외 후보 인접 | REJECT |
| Tube/Cylindrical | guide·forum 수요 중간 | charts/girth tools | 2개 다름 | 2 | roll behavior·carrier rules | REJECT |

### 최종 결정과 GO 조건 대조

- **NO-GO. production HTML/CSS/JS, generator, registry, sitemap, llms, Hub를 변경하지 않는다. 이번 commit은 `handover.md`만 변경한다.**
- 이번 조사는 이전처럼 메인 keyword와 경쟁 존재만 본 것이 아니다. 10개 문제 family를 사용자·재료·장비·상황·workflow에서 만들고, 각 family를 4개 롱테일 방향으로 분해했으며, 실제 SERP/커뮤니티/worksheet 신호와 대표 interactive tool의 DOM 입력·출력·scenario 깊이를 확인했다. 또한 family마다 4개 후보 Tool을 먼저 설계한 뒤 기존 36개 Tool과 Input → Logic → Output → User action을 대조했다.
- GO 조건 가운데 `실제 문제 수요`, `Pack Prep Tools 적합성`, `일부 공식 확보 가능성`은 여러 후보가 만족했다. 그러나 어느 후보도 `진입 가능한 미충족 롱테일`, `경쟁이 전체 workflow를 완전히 해결하지 않음`, `최소 4개의 자연스러운 독립 반복 Tool`, `과도하지 않은 유지관리`, `안전·인증 위험 없음`을 동시에 만족하지 못했다.
- 가장 가까운 후보는 **Order-mix & Dispatch Deadline Planning**과 **Kit Component Availability**다. 전자는 weighted workload/backlog/cutoff/release의 4개 모양을 만들 수 있으나 2개는 기존 노동 Tool의 multi-row/goal-seek 확장이고 release pacing은 live WES 데이터가 필요하다. 후자는 사용자 반복 문제와 available-to-build intent가 강하지만 자연스러운 계산은 availability/shortage 2–3개이고 shared allocation부터는 generic BOM/ERP optimizer가 된다.
- Industrial Bags/Liners와 Partitions/Dividers는 search intent가 가장 명확했지만, 실제 무료 vendor 도구가 형태별 롱테일과 downstream quote workflow까지 한 화면에서 커버했다. Carton Portfolio는 독립 decision modes가 많아 보였지만 모두 동일 3D/cartonization engine의 모드이고, 현재 범위에서 만들 수 있는 단순 버전은 무료 경쟁보다 현저히 얕다.
- 정확한 검색량 데이터는 확보하지 못했다. 이 NO-GO는 검색량 부재 자체가 아니라 실제 SERP 구성, 반복 문제 흔적, 경쟁 기능, 기존 Tool 대비 I→L→O→A, 4개 독립 Tool 성립 여부에 근거한다.

### 재검토 조건과 남은 위험

- Order-mix/Deadline: 실제 소형 seller의 order-class별 표준시간과 cutoff/backlog worksheet 사용 사례가 확보되고, 최소 4개 결과가 기존 노동 Tool의 단순 goal-seek가 아니라 서로 다른 현장 행동을 만들 때 재검토한다.
- Kit Availability: packaging/subscription-box query에서 반복 노출·요청이 확인되고, availability/shortage 외에 공유 component allocation과 channel reservation을 단순하고 검증 가능하게 정의할 수 있을 때 재검토한다.
- Bags/Dividers: 현재 무료 통합 도구가 폐쇄·유료화되거나 small-seller workflow에서 명확한 미지원 영역(예: stock-size comparison, multi-size batch export)이 반복 확인될 때 재검토한다.
- Carton Portfolio: 검증 가능한 order dataset, 공개 packing heuristic, scenario 기준, 충분한 유지관리 여력이 확보될 때만 재검토한다.
- HIGH 위험: 없음. production 변경과 신규 계산이 없다.
- MEDIUM: 정확한 keyword volume/GSC/GA4 데이터가 없어서 수요의 크기는 정량화하지 못했다.
- LOW: SERP와 무료 도구 기능은 바뀔 수 있다. 재검토 시 동일 long-tail query와 현재 대표 도구의 무료 범위·로그인·모바일·scenario 기능을 다시 연다.

### 기본 QA와 보호 영역 확인

- `node scripts/qa.js`: PASS — 69 HTML, sitemap 68, JavaScript 5; content QA 36 Calculator, 13 Guide, 11 Reference; duplicate long paragraph/sentence 0; responsive table QA 36/36.
- `node scripts/verify-calculators.js`: PASS — 36 Calculator, 181 independent checks.
- `git diff --check`: PASS. 변경 파일은 `handover.md` 하나뿐이며 production diff 0.
- 실도메인 390px: Decision guide 4행의 두 cell이 각각 353px block, clipping 0, horizontal overflow 0, console error 0. Last reviewed `.meta-line` border-top 0px.
- 실도메인 1440px: Decision guide는 246.1px + 632.9px의 기존 2열 table-cell, clipping/overflow/console error 0.
- Shipping Damage Rate 390px: 기본 100/1, illustrative 안내 유지; Calculate 결과 `1% observed damage rate`; Reset 뒤 100/1 + `Enter your package details to begin.` idle; overflow/console error 0.
- 홈페이지 사용자 관리 배지: repository anchor 5개, 실도메인 5개. 순서와 href/image는 KittyLaunch → sellwithboost → twelve.tools → findly.tools → BoostDomainRating으로 정확히 유지. generator·index HTML은 수정하지 않았다.

## 2026-08-13 — Master Carton / Carton Count 검색 신호 기반 기존 페이지 최적화

### 요청과 결정

- 주간 GSC 신호를 근거로 신규 cluster나 신규 URL을 만들지 않고 기존 Master Carton / Carton Count 경로만 재검토했다.
- 대상 URL: `/tools/master-carton-dimensions.html`, `/tools/master-carton-weight.html`, `/tools/carton-count.html`, `/tools/case-pack.html`, `/guides/master-carton-planning.html`, `/reference/master-carton-terms.html`, `/tools/carton-cube.html`.
- **GO**로 판정했다. 이유는 URL·canonical·indexability나 검색 의도 분리가 잘못된 것이 아니라, 검색 유입 흐름 안에서 확인 가능한 세 가지 품질 결함이 있었기 때문이다: Carton Count의 실제 결과와 worked example 불일치, guide/reference의 기계적인 generator 문장, 그리고 계산기 사이의 직접 workflow 링크 누락.
- title/H1, URL, canonical, robots, sitemap 구조는 유지했다. 새 페이지, redirect, noindex, 전역 CSS, 계산 공식은 추가하거나 변경하지 않았다.

### GSC 신호와 SERP 해석

- 페이지 신호: Master Carton Dimensions 4 clicks / 102 impressions / position 15.00, Master Carton Weight 1 / 52 / 12.33, Carton Count 0 / 49 / 7.78, Master Carton Terms 0 / 30 / 24.23, Case Pack 0 / 14 / 12.71.
- query 신호: `master carton size calculator` 1 / 11 / 6.91, `master carton calculator` 1 / 9 / 28.56, `master carton dimensions` 0 / 6 / 7.17, `carton quantity` 0 / 4 / 7.75, `master carton size` 0 / 1 / 10, `one carton is how many` 0 / 1 / 4, `how many are in a carton` 0 / 1 / 10.
- 정확한 검색량은 확보하지 않았으며 위 노출·클릭을 volume 추정값으로 과장하지 않았다.
- 10개 query의 실제 SERP를 확인했다. `master carton size calculator`와 `master carton calculator`는 product/layout 입력형 계산기 intent가 강했고, `master carton dimensions`와 `master carton size`는 규격·설명 문서도 함께 나타났다. `carton quantity`와 `carton count calculator`는 units-per-carton을 사용한 올림 계산, pallet carton capacity, MOQ/order rounding intent가 섞였다. `case pack calculator`는 보유 unit 환산, 주문 case 수, 제품 치수 기반 units-per-case가 혼재했고, `case pack quantity`는 용어 설명 intent가 강했다. `master carton weight calculator`는 Pack Prep Tools의 Tools index가 검색 노출됐지만 전용 무료 도구 경쟁은 상대적으로 얕았다.
- cannibalization 경계는 유지 가능하다고 판단했다: Master Carton Dimensions는 선택한 columns×rows×layers에서 최소 내부 치수를 설계하고, Multi-item Box Fit은 이미 정해진 box의 수용량을 검사한다. Carton Count는 unit demand→필요 carton 수이고 Case Pack은 sealed cases+loose reserve→보유 unit 수다. Guide는 절차, Terms는 정의, Weight는 gross packed weight, Cube는 finished external space를 담당한다.

### indexability / coverage 확인

- 운영 대상 7개 URL은 모두 HTTP 200, 정확한 self-canonical, meta noindex 없음, `sitemap.xml` 포함으로 확인했다.
- `robots.txt`는 `User-agent: *`, `Allow: /`, 운영 sitemap 선언을 반환했다.
- Search Console의 일부 `Crawled - currently not indexed` 기록과 실제 click/impression이 공존하므로 coverage 문구만 근거로 URL, canonical, robots, sitemap을 변경하지 않았다. 실제 검색 노출과 운영 응답을 우선했다.

### 확인한 문제와 원인

- `scripts/generate-site.js`가 authoritative source다. Calculator, Guide, Reference HTML과 indexes, sitemap, llms는 생성 결과다.
- Carton Count의 계산 로직은 기본값 125 units / 24 units per carton에서 6 cartons, 5 units in final carton을 정확히 반환했다. 그러나 generator의 worked example만 `19 units in the final carton`으로 적혀 있어 결과와 설명이 충돌했다.
- Master Carton Planning Guide는 모든 section 뒤에 `In Master Carton Planning Guide, document the define...` 같은 동일 template 문장을 붙였고 evidence/closeout/caution에서도 title을 반복했다. Master Carton Terms의 maintenance도 `Start by measure...`, title 반복, 첫 glossary term을 self-approving data로 취급하지 말라는 기계적 조합이었다.
- Master Carton Dimensions의 다음 단계는 weight와 cube 확인이라고 설명하지만 Carton Cube 직접 링크가 없었다. Carton Count는 다음 단계에 Master Carton Weight를 말하지만 직접 링크가 없었다. Case Pack의 두 번째 관련 Tool은 실제 흐름과 약한 Insert Quantity였다. Master Carton Terms의 Related calculator는 구체 Tool이 아니라 `/tools.html`로 향했다.

### 실제 수정

- Carton Count meta description/lede/schema/llms 설명을 `required units`와 `units per carton`으로 필요한 carton 수와 partial final carton quantity를 계산한다는 자연어로 명확히 했다. title과 H1은 유지했다.
- Carton Count worked example을 실제 계산과 맞는 `6 cartons with 5 units in the final carton`으로 수정했다. 계산 JavaScript는 변경하지 않았다.
- 이번 대상 5개 Calculator의 worked example에서 generator가 만들던 `Next action: After:` 중복 접두사를 `Next action:`으로 정리했다. 같은 formatter를 비대상 Calculator에는 적용하지 않았다.
- 관련 링크를 제한적으로 보강했다: Master Carton Dimensions→Weight/Cube/Carton Count, Carton Count→Case Pack/Dimensions/Weight, Case Pack→Carton Count/Dimensions, Master Carton Terms→Master Carton Dimensions.
- Guide/Reference generator에 optional per-page override를 추가했다. 해당 데이터가 있는 두 페이지만 section note, closeout/evidence, maintenance/caution 문장을 현장 record·prototype·revision 기준의 직접적인 문장으로 교체한다. 다른 12 Guides와 10 References는 기존 generic output을 유지한다.
- Master Carton Planning Guide와 Master Carton Terms의 reviewed/dateModified를 2026-08-13으로 갱신했다.

### 변경 범위

- authoritative source: `scripts/generate-site.js`.
- 생성 결과: `tools/carton-count.html`, `tools/case-pack.html`, `tools/master-carton-dimensions.html`, `guides/master-carton-planning.html`, `reference/master-carton-terms.html`, `llms.txt`.
- 기록: `handover.md`.
- 수정하지 않음: `assets/calculators.js`, `assets/styles.css`, URL/redirect/canonical/robots/sitemap 구성, Master Carton Weight/Carton Cube 계산식과 HTML, 다른 cluster의 문서 내용.

### QA

- `node --check scripts/generate-site.js`: PASS.
- `node scripts/qa.js`: PASS — 69 HTML, sitemap 68, JavaScript 5; content QA 36 Calculator, 13 Guide, 11 Reference; duplicate long paragraph 0, duplicate long sentence 0; responsive table 36/36.
- `node scripts/verify-calculators.js`: PASS — 36 Calculator, 181 independent checks.
- Master Carton Dimensions 1440 / 1280 / 1024 / 768 / 390px: 모두 horizontal overflow 0, viewport 밖 요소 0, 의도적으로 숨긴 mobile thead를 제외한 clipping 0, console error 0. 관련 링크는 Weight, Cube, Carton Count, Guide 순서로 노출됐다.
- 대상 7개 URL 전체를 1440px와 390px에서 확인했다. 각 14개 조합 모두 horizontal overflow 0, viewport 밖 요소 0, clipping 0, console error 0.
- Calculator 기본값 실제 결과: Dimensions `25.5 × 11.25 × 7.25 in` / 12 units; Weight `24 lb` / 6 lb remaining; Carton Count `6 cartons` / final 5; Case Pack `294 units`; Carton Cube `1.51 m³`, 모두 console error 0.
- 회귀 QA: homepage, Tools index, Dimensional Weight Calculator, Packaging Trial and Shipping Damage Review, Packaging Quality and Damage Metrics를 각각 1440px와 390px에서 확인했다. 10개 조합 모두 overflow/out-of-viewport/clipping/console error 0. Decision guide의 scoped mobile card layout과 calculator input table의 scoped full-width rule이 유지됐다.
- Shipping Damage Rate의 source/logic/default는 변경되지 않았고 기존 100/1, illustrative note, Calculate 1%, Reset initial+idle 동작을 자동 QA와 비대상 diff 0으로 보존했다.
- homepage 사용자 관리 영역은 generator 보호 assertion을 통과했고 repository의 footer 뒤/site.js 앞 anchor와 image가 정확히 5개다. 순서·href·image·위치는 KittyLaunch → Sell With Boost → Twelve Tools → Findly.tools → BoostDomainRating 그대로이며 `index.html` content diff는 0이다.

### 위험과 후속 관찰

- HIGH 위험: 없음. 공식·carrier limit을 새로 제시하지 않았고 계산식, canonical, indexability를 변경하지 않았다.
- MEDIUM: 7–28위 사이의 적은 impression 표본이므로 단기 rank/CTR 변화는 변동성이 크다. 최소 다음 주간 export에서 page/query 단위 clicks, impressions, position을 같은 기준으로 비교한다.
- LOW: SERP 구성은 바뀔 수 있다. `carton quantity`와 `case pack calculator`는 혼합 intent이므로 추가 title 변형이나 page consolidation은 후속 실제 query/page data가 쌓이기 전에는 하지 않는다.

## 2026-08-13 — 신규 workflow cluster 발굴 및 Pack Instruction & Job Release 구현

### 시작 상태와 실제 규모 복원

- 작업 폴더: `C:\Users\cangh\OneDrive\문서\packpreptools`.
- 시작 시 branch `main`, origin `https://github.com/canghun13/packpreptools.git`, working tree clean을 확인했다.
- 시작 local HEAD는 `38c89d498504f18aadd69a85c11ef75221b65dfe`, 시작 remote `origin/main`은 `84d25a5057506812787db350edbb63e67c444477`이었다. 미커밋 변경이 없어서 `git fetch origin`과 `git pull --ff-only origin main`으로 `84d25a5`까지 동기화한 뒤 작업했다.
- 최신 실제 상태는 69 public HTML, 36 Calculator, 13 Guide, 11 Reference, 기본·허브·기타 9, sitemap 68 URL이었다. authoritative source는 `scripts/generate-site.js`, 계산 로직은 `assets/calculators.js`, 검증은 `scripts/qa.js`와 `scripts/verify-calculators.js`다.
- 기존 36 Calculator의 title, description, input ID/type, Logic, Output, User action을 generator와 생성 HTML/JavaScript에서 다시 대조했다. 신규 후보가 단순 multi-row, goal-seek, 이름 변경, 문서 복제로 끝나는 경우를 제외했다.
- 직전 조사에서 이미 제외한 Returns & Reverse Logistics, Packaging Purchasing & Quote Analysis, Fulfillment Accuracy & Rework, Shipment Consolidation, Packaging Sustainability, Automation/Equipment Economics, Changeover/Downtime, Label Roll/Runtime, Stretch Film, Roll/Sheet Yield, Storage/Space, Compression/Stack, Gross/Tare/Pallet Weight, Packing Station Layout, Industrial Bags/Liners, Packaging Version Cutover, Point-of-use Replenishment, Order-mix/Deadline, Strapping/Edge Protection, Kit Component Availability, Partitions/Dividers, Carton Portfolio, Repack/Overpack, Mailing Tube family는 이번 candidate pool에 다시 넣지 않았다.

### 새로운 workflow family 12개와 Tool 가설

표의 `가장 가까운 기존`은 기존 36 Calculator 또는 직전 제외 범위다. 각 줄은 User/problem → Inputs → Logic → Output/action → 반복 사용 → 차이를 한 번에 기록한다.

#### F1. Shipping Label Print Setup & Calibration — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| 4×6 Label Settings Checker | thermal printer를 처음 연결한 seller; 잘림·축소 방지 | PDF page size, stock, scaling, orientation → 조합 rule check → mismatch list; driver를 수정하고 test print | printer/driver/marketplace 변경 때 | 기존 없음 / 인쇄 설정 checker |
| Print Scale Correction Planner | 출력 치수가 목표와 다름 | target line, measured line → target÷measured×100 → scale%; print setting 조정 | printer·PDF source별 | Package Variance / 종이 출력 배율이지 package 측정 아님 |
| DPI & Label Pixel Planner | raster label 제작자; 해상도 부족 | physical size, DPI → pixel dimensions → canvas requirement; artwork 재출력 | label size·printer별 | Label Cost / 비용이 아니라 raster resolution |
| Thermal Label Symptom Troubleshooter | blank, faint, clipped, mirrored label | symptom, printer type, media, connection → decision tree → ordered checks; calibration/test 실시 | 장애마다 | Fulfillment Accuracy 제외 family와 다르나 hardware troubleshooting |

#### F2. Pack Instruction & Job Release — GO

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| Pack Instruction Readiness Checker | small brand operations owner; 신규 instruction의 누락 발견 | SKU/ID/revision/material/step count/closure/label/verification/exception/owner → required-field 및 최소 step validation → gap list; trial 전에 보완 | 신규·개정 instruction마다 | Packaging Trial Comparison / trial 결과 비교가 아니라 trial 전 record completeness |
| Pack Instruction Builder | operator-facing method가 필요한 seller/3PL handoff owner | reusable identity, materials, ordered steps, close/label/verify/exception → validation·escaping·ordered render → printable draft; physical trial·owner review | SKU/variant revision마다 | Packing Station Workflow Guide / 설명 문서가 아니라 입력 기반 SKU record 생성 |
| Pack Variant Routing Planner | gift/promo/channel/item-count variant가 있는 operation | default instruction, observable conditions, route IDs, actions, priority → sort + exact duplicate-condition conflict check → routing matrix; 조건별 test 후 release | campaign·variant 변경마다 | Packaging Version Cutover 제외 family / 날짜·재고 전환이 아니라 주문 속성별 method 선택 |
| Pack Job Traveler Generator | defined batch를 instruction revision에 연결할 supervisor | job, SKU, revision, quantity, interval, station/operator, material lots → positive integer validation + checkpoints + final row → printable traveler; issue/check/close exceptions | batch/job마다 | Prep Batch Time / 시간을 계산하지 않고 execution record와 checkpoint를 생성 |

#### F3. Packaging Spec & Supplier Handoff — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| Packaging Spec Completeness Checker | packaging buyer; supplier RFQ 누락 방지 | dimensions, tolerances, material, print, quantity, delivery → required/cross-field rules → gap report; brief 보완 | RFQ마다 | Purchasing/Quote Analysis 제외 family와 강하게 인접 |
| Supplier RFQ Brief Generator | custom package buyer; 비교 가능한 quote 요청 | product, format, size, substrate, print, finish, MOQ, ship-to → structured render → RFQ draft; suppliers에 별도 전달 | sourcing event마다 | 기존 없음 / 구매 문서 생성이나 supplier별 요구가 큼 |
| Artwork Handoff Packet Builder | designer/brand; 파일·승인정보 누락 | dieline version, file names, colors, fonts, barcode owner, proof contact → checklist assembly → handoff manifest; preflight 전달 | artwork revision마다 | Artwork Preflight family와 결합될 가능성 |
| Supplier Clarification Log Generator | packaging project owner; question/answer 추적 | question, owner, due date, decision, affected revision → status grouping → clarification log; unresolved hold | project마다 | Version Cutover / generic project log로 범위 확장 |

#### F4. Packaging Sample & Proof Approval — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| Sample Request Builder | brand/buyer; 정확한 prototype 요청 | SKU, purpose, sample qty, material/print/finish, delivery → structured request → request form; supplier에 전달 | sample round마다 | Trial Comparison / sample 요청 단계 |
| Proof Review Completeness Checker | reviewer; dieline/copy/barcode/finish 누락 | proof revision, review areas, comment status → completeness rules → open review list; proof hold | proof revision마다 | Quality cluster / artwork 승인으로 scope 이동 |
| Sample Comparison Record | buyer; physical samples 비교 | candidate, dimensions, appearance, fit notes, observed defects, decision owner → same-field comparison → review table; next sample 선택 | sample round마다 | Packaging Trial Comparison / packaging performance 대신 commercial proof review |
| Approval Change Record Generator | owner; 승인 뒤 변경 추적 | approved revision, requested change, reason, affected files, reviewer → change manifest → supersession record; reopen approval | change마다 | Version Cutover 제외 family와 중복 |

#### F5. Shipping Label Placement & Surface Fit — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| Label Face Fit Checker | packer; 4×6 label이 carton face에 맞는지 확인 | face L×W, label L×W, edge clearance → two-orientation fit → fit/orientation; 다른 face 선택 | box size별 | Box Size / product fit이 아니라 label rectangle fit |
| Barcode Obstruction Checklist | operator; seam/tape/edge 위 barcode 방지 | chosen face, seams, tape zones, curvature, old labels → rule list → obstruction warnings; 위치 이동 | pack method별 | 기존 없음 / 공식 carrier·GS1 rule 변동 의존 |
| Small Parcel Label Orientation Planner | poly mailer/tube/small box user | usable surfaces, label size, wrap allowance → orientation rules → placement sketch text; fold/overlap 방지 | format별 | Tube family와 일부 인접 |
| Multiple Label Zone Planner | hazmat/marketplace/internal labels가 공존하는 operation | surface, each label size/type, exclusion gaps → 2D strip allocation → overlap list; priority 조정 | label set마다 | 단순 rectangle packing engine으로 확장될 위험 |

#### F6. Carton Closure Troubleshooting — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| Tape Seal Symptom Troubleshooter | flaps lift/tape peels; packer | symptom, board surface, dust/moisture/temp, application method → decision tree → inspection order; sample seal 재실시 | 문제 lot마다 | Tape Usage / 길이 계산이 아니라 adhesion 진단 |
| Seal Pattern Selector | pack designer; center/H seal 선택 | carton weight, flap gap, handling, user policy → user-rule mapping → pattern candidate; physical test | carton method마다 | Tape Usage가 pattern을 입력받음 / selector는 performance 오해 위험 |
| Closure Condition Checker | supervisor; application 조건 점검 | temperature, clean/dry, tape/board ID, pressure method → checklist → condition gaps; work hold/recondition | shift/setup마다 | Changeover 제외 family에 인접 |
| Tape Setup Record Generator | case sealer/hand tape owner | tape SKU/lot, head/dispenser setting, operator, sample observations → structured record → setup sheet; verify sample | roll/setup마다 | equipment-specific maintenance 영역 |

#### F7. Pack Sequence & Layered Presentation — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
|---|---|---|---|---|
| Pack Step Dependency Planner | multi-step gift pack owner | actions, prerequisites → topological validation → ordered/blocked steps; reorder method | method revision마다 | Pack Instruction Builder의 ordered steps보다 복잡한 동일 engine |
| Layer Build Sheet Generator | presentation pack operator | layer names, materials, orientation, insert points → ordered layers → printable layer sheet; prototype 비교 | variant마다 | Builder의 step/material output과 중복 |
| Unpack-order Checker | kitting/consumer experience owner | desired reveal order, entered pack order → reverse-sequence comparison → mismatch list; layers 재배치 | design마다 | Kit excluded family와 인접 |
| Sequence Time Comparator | operations owner; two sequences 비교 | per-step time/handling, repeats → sum and deltas → time comparison; trial 선택 | improvement trial마다 | Prep Batch Time/Trial Comparison의 단순 multi-row 확장 |

#### F8. Shipping Scale Verification & Weighment Record — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
| Repeated Reading Consistency Checker | packer; scale readings 흔들림 | repeated readings, user tolerance → range/mean/difference → stability flag; surface/power 재확인 | shift·scale issue마다 | Package Variance / recorded-vs-observed가 아니라 instrument repeat readings |
| Test-load Sequence Planner | scale owner; 확인 순서 기록 | capacity, user-owned test loads, points → ascending/descending sequence → worksheet; responsible check | periodic check마다 | calibration 절차·법적 계량 risk |
| Scale Resolution Selector | buyer; 표시 분해능 검토 | package min/max weight, desired increment → ratios → candidate display increment; spec 확인 | scale 구매마다 | 구매 recommendation 및 정확도 오해 가능 |
| Weighment Record Generator | dispatch team; final weight evidence | package ID, scale ID, readings, date/operator → structured render → weighment sheet; manifest update | shipment/batch마다 | Weight calculators와 달리 record generator지만 사용성 1–2개에 집중 |

#### F9. Dispatch Exception Triage & Escalation — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
| Exception Route Selector | packer; damaged/label/material/fit 예외 대응 | exception type, severity, user routes → decision map → hold/rework/escalate route; owner 호출 | 예외마다 | Fulfillment Accuracy & Rework 제외 family와 중복 |
| Hold Tag Generator | supervisor; held package 식별 | package/job, reason, time, owner, prohibited action → structured tag → print/attach | hold마다 | generic warehouse form |
| Escalation Completeness Checker | team lead; 정보 부족 escalation 방지 | problem, evidence, lot/order, action taken, requested decision → gap check → completeness list; 보완 후 전송 | escalation마다 | quality record와 중복 |
| Exception Closeout Record | owner; disposition 추적 | exception, disposition, rework/scrap qty, approver, recurrence action → summary → closeout record; batch traveler 연결 | 예외 close마다 | Packaging Failure Cost·Rework 제외 범위 인접 |

#### F10. Shipment Photo Evidence & Pack Record — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
| Photo Shot-list Generator | seller; 일관된 pack evidence 촬영 | product/package type, closure, label, serial/lot needs → selected shot templates → list; 촬영 | shipment class마다 | 정적 checklist 복제 위험 |
| Photo File-name Planner | operation; image 연결 실패 | job/order-safe ID, sequence, view, date → sanitized naming → filename list; local 저장 | shipment마다 | utility지만 포장 핵심과 약함 |
| Evidence Completeness Checker | reviewer; 필수 view 누락 | expected shots, captured names/notes → set difference → missing list; 재촬영 | exception/shipment마다 | quality cluster 및 privacy 문제 |
| Pack Record Cover Sheet | claim/QA owner; 사진·측정·material record 연결 | package ID, instruction, photo refs, measures, exception → manifest → cover sheet; 내부 보관 | issue마다 | carrier liability처럼 오해될 위험 |

#### F11. Packing Slip & Shipment Document Prep — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
| Packing Slip Generator | small seller; order document 필요 | seller/order/customer/items → totals/render → slip PDF/print; shipment 동봉 | order마다 | existing calculator 없음 / 개인정보·강한 무료 경쟁 |
| Carton Contents List Builder | multi-carton shipper | carton IDs, item rows/qty → grouping/totals → carton list; label carton | shipment마다 | Carton Count가 quantity만 계산 / document generator |
| Delivery Note Generator | B2B seller | sender/recipient/items/reference → structured render → delivery note; consignee 전달 | shipment마다 | generic document generator |
| Shipment Document Reconciliation | dispatch owner | order lines, slip lines, carton lines → keyed comparison → missing/mismatch list; hold shipment | shipment마다 | Fulfillment Accuracy excluded family와 직접 중복 |

#### F12. Packaging Artwork Preflight & File Handoff — REJECT

| Tool 가설 | User/problem | Inputs → Logic → Output/action | 반복 사용 | 가장 가까운 기존 / 실질 차이 |
| Print DPI Checker | packaging designer | placed image pixels, print size → px÷inch → effective DPI; asset 교체 | artwork asset마다 | label DPI candidate와 중복, specialist tool 강함 |
| Bleed/Safe-area Checker | designer; trim 위험 | artwork/dieline/bleed/safe dimensions → boundary comparison → deficit; layout 수정 | dieline마다 | file parsing 없이는 얕음 |
| Dieline File Handoff Builder | brand-to-printer | dieline version, layers, spots, fonts, linked assets → manifest → handoff checklist; package files | revision마다 | Supplier Handoff candidate와 중복 |
| Proof Revision Comparator | reviewer | two extracted checklists/metadata → field difference → change list; proof 검토 | proof마다 | real PDF visual diff 없이는 메모 표 수준 |

### 실제 검색 수요·SERP·경쟁 확인

- 정확한 keyword volume 도구 접근 권한은 없었다. 검색량 숫자를 만들지 않고, exact/long-tail SERP의 결과 구성, 무료 interactive tool 존재, vendor/SaaS 기능 범위, 공식·실무 문서, seller forum 문제 반복을 근거로 판단했다.
- Label setup query: `4x6 shipping label settings checker`, `thermal printer calibration shipping label`, `shipping label printing too small clipped`를 확인했다. LabelChop은 PDF size, driver stock, scaling, orientation, symptom을 한 checker에서 다루고 A4 converter, print scale, blurry barcode, blank label, test label까지 무료 suite로 제공한다. LabelHelper도 calibration/test pattern을 제공하며 seller forum에는 clipped/tiny/blank 문제가 반복됐다. 수요는 있으나 F1의 4개 가설이 이미 한 competitor suite에 수렴하므로 REJECT했다.
  - https://labelchop.com/tools/4x6-shipping-label-settings-checker
  - https://labelhelper.com/thermal-printer-calibration-shipping-label
- Pack instruction query: `packing work instruction template`, `pack out instruction template`, `pick pack ship SOP template`, `pack out guidelines SKU variant`, `manufacturing traveler template`를 확인했다. Portless는 SKU, materials, photo/video, ordered steps, insert, seal/label, return label을 포함한 SOP를 요구하고 MasonHub는 variant별 materials/quantity/placement/order-size/VAS rules를 요구한다. Docsie·Trupeer·WritingTools·Taskade는 generic template 또는 AI/video-to-SOP를 제공하고, PackAssistant·Metis는 instruction/traveler 문서 출력을 제공한다. 그러나 가입 없이 packaging-specific readiness → structured instruction → variant route conflict → batch traveler를 한 흐름으로 연결하는 무료 정적 도구는 대표 결과에서 확인하지 못했다.
  - https://support.portless.com/en/articles/13611841-creating-packing-sops-for-fulfillment
  - https://support.masonhub.co/hc/en-us/articles/360055543632-Pack-Out-Guidelines
  - https://www.docsie.io/solutions/templates/logistics-supply-chain/pick-pack-and-ship-sop/
  - https://www.trupeer.ai/tools/manufacturing-sop-software
  - https://writingtools.ai/tools/work-instructions-generator
  - https://www.metisautomation.co.uk/manufacturing-traveller-excel-template/
- Supplier/spec query: `packaging specification template`, `packaging RFQ template`, `packaging brief builder`, `packaging artwork handoff checklist`를 확인했다. Sparal이 pack spec, RFQ, artwork handoff, approval, reorder, launch template와 AI Packaging Brief Builder를 제공하며 dieline specialist도 강했다. F3는 Purchasing/Quote 및 Version 영역과 겹쳐 REJECT했다.
  - https://www.sparalpackaging.com/templates
  - https://www.sparalpackaging.com/tools/packaging-brief-builder
- Sample/proof query: `packaging sample request form`, `packaging proof approval checklist`, `packaging prototype approval`를 확인했다. Jotform의 conditional form/approval/storage와 packaging vendor proof process가 sample request와 approval workflow를 이미 제공한다. F4는 quality/version 관리 범위로 넓어져 REJECT했다.
  - https://www.jotform.com/form-templates/packaging-prototype-sample-request-form
- Label placement query: `shipping label placement checker box`, `shipping label on seam edge barcode`, `barcode placement packaging guide`를 확인했다. FedEx는 largest surface, seam/edge 회피, barcode 위 tape 금지를 안내하고 GS1 placement guide와 seller Q&A가 노출됐다. face-fit은 만들 수 있지만 나머지는 carrier/GS1-specific guide를 재진술하는 1–2개 기능이므로 F5를 REJECT했다.
  - https://www.fedex.com/en-us/shipping/create-shipping-label.html
- Closure query: `carton tape not sticking troubleshooting`, `case sealer tape troubleshooting`, `box flaps tape lifting`을 확인했다. 3M application monitoring과 equipment manual/vendor guides가 missing tape, cut, roll, adhesion symptom을 다룬다. material/board/application condition을 모르는 정적 selector는 성능 보증처럼 보일 수 있어 F6를 REJECT했다.
- Pack sequence query: `packing sequence planner`, `multi stage packing software`, `pack out sequence work instruction`을 확인했다. Paccurate multi-stage packing과 commercial packing/container planning products는 rules, sequence, layout, API/print를 제공한다. 정적 버전의 4개 후보는 동일 ordered-step engine의 mode이거나 기존 time/trial의 확장이므로 F7을 REJECT했다.
  - https://docs.paccurate.io/multi-stage-packing
- Scale query: `shipping scale verification worksheet`, `scale repeatability checker`, `weighment record template`를 확인했다. 검색 결과가 calibration worksheets, regulated calibration guidance, scale vendors에 집중됐다. repeat-reading checker와 record는 가능하지만 4개 독립 Tool이 되기 전에 calibration/compliance 판단으로 넘어가므로 F8을 REJECT했다.
- Exception/photo query: `packing exception escalation template`, `shipment photo evidence checklist`, `packaging photo record`를 확인했다. 결과는 WMS/QA/claims SaaS와 설명형 checklist가 중심이었다. static implementation은 generic forms, quality/rework 중복, privacy/claim 오해 위험이 커 F9/F10을 REJECT했다.
- Packing document query: `free packing slip generator`, `carton packing list generator`, `delivery note generator`를 확인했다. PackingSlip, PackingSlipGenerator, OneCart, Toolmatrix, Genvalo가 무료/no-login, CSV/bulk, PDF/print 범위를 이미 제공했다. F11은 강한 무료 경쟁과 개인정보 처리 때문에 REJECT했다.
- Artwork preflight query: `free packaging artwork preflight checker`, `dieline preflight online`, `packaging artwork bleed checker`를 확인했다. Preflight.art는 no-account 무료 preflight에서 dieline, spot, bleed, fonts, resolution, ink, barcode를 검사하고 Artwork Flow/Helqora 등도 file-based 검사를 제공한다. file parsing 없는 static checker는 현저히 얕으므로 F12를 REJECT했다.
  - https://preflight.art/

### GO 기준 판정과 최종 선택

| 기준 | Pack Instruction & Job Release 판정 |
|---|---|
| 최소 4개의 강한 독립 Tool | PASS — readiness, instruction generation, variant routing, batch traveler는 입력·logic·output·다음 행동이 각각 다름 |
| 기존 Tool/최근 제외와 비중복 | PASS — calculation, trial metric, timing, version cutover, fulfillment accuracy가 아니라 controlled operating record의 서로 다른 단계 |
| 실제 문제/검색 의도 | PASS — SKU pack-out instruction, variant guidelines, SOP, traveler query와 fulfillment documentation에서 반복 요구 확인 |
| competitor gap | PASS — generic AI/template/video SOP와 enterprise fulfillment system 사이에 no-account packaging-specific 연결 workflow가 비어 있음 |
| 정적 웹 구현 가능 | PASS — user-entered fields, deterministic validation/sort/checkpoint generation, HTML print; account/API/database 불필요 |
| 안전 경계 | PASS — readiness와 record organization만 제공; certification, approval, AQL, ISTA, damage prevention, legal disposition을 제공하지 않음 |

- **최종 결정: GO. Pack Instruction & Job Release cluster를 7페이지로 구현했다.**
- 4개 Tool은 하나의 giant form이나 동일 engine의 mode가 아니다. Readiness는 누락을 찾고, Builder는 reusable method draft를 만들며, Routing은 observable condition의 priority와 exact duplicate conflict를 검토하고, Traveler는 한 batch의 revision/material/checkpoint/closeout record를 만든다.
- 기본값은 instructional sample identity/steps 또는 기존 operation이 정해야 할 neutral blank다. checkpoint interval, materials, tolerance, approval threshold를 업계 평균으로 invent하지 않았다.
- 모든 output에 physical trial/current requirement/responsible owner 경계를 두었고, output을 인증·승인·성능 진단으로 표현하지 않았다.

### 구현 범위와 최종 원장

- 신규 hub: `/pack-instructions.html`.
- 신규 Tools: `/tools/pack-instruction-readiness.html`, `/tools/pack-instruction-builder.html`, `/tools/pack-variant-routing.html`, `/tools/pack-job-traveler.html`.
- 신규 Guide: `/guides/writing-pack-instructions.html`.
- 신규 Reference: `/reference/pack-instruction-record-fields.html`.
- authoritative data/templates/generation: `scripts/generate-site.js`.
- 신규 browser/pure logic: `assets/workflow-tools.js`; UMD API로 browser와 Node test가 동일 순수 함수를 사용한다.
- 신규 검증: `scripts/verify-workflow-tools.js`, `package.json`의 `test:workflows`; 정상·경계·오류·HTML escaping·determinism 46 checks.
- index/home 연결은 최소화했다. Homepage의 기존 operations button row에 cluster link 1개만 추가하고, Tools register에는 calculator table과 분리된 4-row workflow table을 추가했다. Guides/Reference index, breadcrumb, related links, sitemap, llms를 모두 갱신했다.
- 최종 공개 HTML **76개** = 기본·허브·기타 10 + Tool page 40(기존 Calculator 36 + workflow Tool 4) + Guide 14 + Reference 12. sitemap은 404를 제외한 **75 URL**.
- 기존 URL, canonical, GA4 `G-XR7JWJ36CD`, JSON-LD, robots, CNAME, Contact email, calculator logic/ID/result/error handling은 유지했다.
- 사용자 관리 homepage badge block은 생성 전·후 SHA-256가 모두 `1205454B420A7A14B16F66A984BF5217AF327B33F68FB9E30EBD48824198ED68`로 동일했다. anchor 5개와 순서·href·image·위치는 KittyLaunch → Sell With Boost → Twelve Tools → Findly.tools → BoostDomainRating 그대로다.

### 자동·계산·브라우저 QA

- `node --check scripts/generate-site.js`, `scripts/qa.js`, `scripts/verify-workflow-tools.js`, `assets/workflow-tools.js`: PASS.
- `node scripts/qa.js`: PASS — 76 HTML, sitemap 75 URL, JavaScript 7; 36 Calculator, 4 workflow Tool, 14 Guide, 12 Reference; broken internal link 0, duplicate ID 0, metadata/canonical/GA4/JSON-LD issue 0, duplicate long paragraph/sentence 0, responsive calculator input table 36/36.
- `node scripts/verify-calculators.js`: PASS — 기존 36 Calculator, 181 independent checks. 계산 로직 회귀 0.
- `node scripts/verify-workflow-tools.js`: PASS — 46 normal/boundary/error/safety/deterministic checks.
- in-app browser local QA, 1440/1280/1024/768/390px: Homepage, Tools, 신규 hub, 신규 Tools 4, 신규 Guide, 신규 Reference 총 9페이지×5폭 = 45 조합. horizontal overflow 0, visible out-of-viewport element 0, console error 0. Homepage badge는 모든 5폭에서 5개.
- 기존 회귀 browser QA: Quality hub, Shipping Damage Rate, Master Carton Dimensions, Packaging Trial Guide, Quality Metrics Reference 5페이지×5폭 = 25 조합. overflow/out-of-viewport/console error 모두 0.
- 실제 동작: blank Readiness는 12 gaps, negative step은 오류; Builder 기본은 `PK-014 / Rev B built for CND-01`, generated sheet visible, Reset idle, whitespace required error, injected `<script>`는 active script 0; Routing 기본 2 rules/0 conflict, duplicate condition은 1 conflict; Traveler 180/45는 4 checkpoints, 181 interval은 오류. 모바일 menu expanded/open/display grid.
- 보호 회귀: Shipping Damage Rate 390px에서 기본 100/1, Calculate `1% observed damage rate`, Reset 100/1 + idle. 최근 calculator input table, decision-guide card, `.meta-line`, master-carton content/link 변경은 generator source와 browser regression에서 유지됐다.

### 위험과 추후 관찰

- HIGH: 없음. certification/approval/performance 판정, 저장, 개인정보 전송, third-party API가 없다.
- MEDIUM: 정확한 keyword volume과 GSC/GA4 landing data가 아직 없다. release 후 `/pack-instructions.html`과 4 Tool의 impressions, query wording, engagement, generated-record/print intent를 최소 4–8주 관찰하고 cluster 확장은 실제 신호가 있을 때만 한다.
- MEDIUM: Routing conflict check는 case-insensitive exact condition duplicate만 찾는다. 서로 다른 문구의 논리적 overlap은 owner가 scenario test로 확인해야 한다. Boolean parser나 order-system integration은 현재 범위 밖이다.
- LOW: browser print pagination은 OS/browser와 record 길이에 따라 달라질 수 있다. 기능은 browser print를 호출하며 별도 PDF engine이나 saved audit trail을 약속하지 않는다.
- LOW: SOP/template/SaaS competitor의 무료 범위는 바뀔 수 있다. 다음 content review 때 no-account/free status와 packaging-specific workflow depth를 다시 확인한다.
- 배포 후 확인할 data: page/query별 clicks/impressions/position, Tools→cluster click, hub→각 Tool 이동, mobile engagement, print-button usage(현재 별도 event tracking 없음), 사용자가 요청하는 추가 field와 routing conflict 사례. 이 data 없이 5번째 Tool이나 static checklist 페이지를 만들지 않는다.

### Git / 배포 마감

- 구현 commit: `2ba624854da3b59c6230b94823451e41bd0dabe9` (`Add pack instruction workflow tools`).
- push: `origin/main`에 성공. 시작 remote `84d25a5`에서 구현 commit `2ba6248`로 진행했다.
- GitHub Pages Actions run `31708795032`: build job success, deploy job success. workflow의 별도 `report-build-status` job이 queued 상태여도 실제 deploy job은 2026-08-13T14:11:33Z에 success로 완료됐다.
- 실배포 hub `https://packpreptools.com/pack-instructions.html`: 정확한 title/H1, Tool link 4개, 1440px overflow 0, console error 0.
- 실배포 Builder `https://packpreptools.com/tools/pack-instruction-builder.html`: 390px에서 기본 Generate가 `PK-014 / Rev B built for CND-01`, generated sheet visible, overflow 0, console error 0.
- 실배포 Homepage: 신규 `4 workflow tools` 상태 표시, 사용자 관리 badge 5개와 기존 순서/href 유지, 390px overflow 0.
- 이 기록을 추가하는 closing commit을 push한 뒤 최종 local HEAD / origin/main 일치와 clean working tree를 다시 확인한다. closing commit은 public HTML 기능을 변경하지 않는다.

## 2026-08-13 — Pack Instruction cluster responsive UI correction

### 확인 URL과 정확한 원인

- Hub: `/pack-instructions.html`.
- Guide: `/guides/writing-pack-instructions.html`.
- Reference: `/reference/pack-instruction-record-fields.html`.
- Hub 원인: `process-track`과 `document-index`를 같은 muted section에 연속 배치했지만 두 컴포넌트 사이 margin이나 section boundary가 없었다. 실제 수정 전 rect 측정에서 process 하단과 document index 상단 간격은 1440px와 390px 모두 `0px`였다. 기존 Quality hub는 document index를 별도 section에 두므로 정상 section padding이 적용됐지만, Pack Instruction hub의 합쳐진 구조에는 그 리듬이 없었다.
- Guide/Reference 원인: 공통 desktop 규칙 `.content-table tbody th { width: 28%; }`가 mobile의 `.content-table th { width: 100%; }`보다 specificity가 높았다. 두 신규 문서의 표가 plain `.content-table`만 사용해 desktop 28%가 390px에도 남았다. 수정 전 390px의 row는 355px, `td`는 353px였지만 첫 `th`는 99px뿐이었다.
- 이전 수정이 덮지 못한 이유: 기존 Packaging Trial Decision guide는 `.decision-guide-table`, calculator input definition은 `.calculator-input-table`이라는 별도 class와 specificity가 같은 mobile override를 사용한다. 새 workflow Guide/Reference에는 어느 class도 적용되지 않아 그 두 보정의 적용 대상이 아니었다.

### 공통 수정과 영향 범위

- 생성 원본에서 Guide의 Decision guide와 Reference의 Key distinctions에 workflow 문서 전용 공통 class `.workflow-record-table`을 부여했다.
- 680px 이하에서 `.content-table.workflow-record-table tbody th { width: 100%; }`를 사용해 desktop selector를 정확히 덮었다. 전역 `.content-table` 규칙을 바꾸지 않아 다른 문서 표의 desktop/tablet 구조는 유지했다.
- Hub의 해당 document index에만 `.workflow-document-index`를 붙이고 `margin-top: clamp(2.5rem, 5vw, 4rem)`을 적용했다. 수정 후 실제 간격은 1440/1280px 64px, 1024px 51px, 768/390px 40px다.
- CSS cache key는 위 3개 URL에만 `20260813-workflow-layout`을 적용했다.
- 정적 회귀 검사에 hub spacing hook, workflow document table class 2개, mobile specificity override를 추가했다.
- 공개 HTML 변경은 위 3페이지다. 4개 workflow Tool page는 routing editor/generated sheet 전용 컴포넌트와 기존 mobile 규칙을 사용하며 `.content-table` 문제에 노출되지 않아 생성 결과를 변경하지 않았다.
- 390px before → after: Guide와 Reference 모두 `th` 99px / `td` 353px의 불균형에서 `th` 353px / `td` 353px의 한 grouped card row로 바뀌었다. horizontal overflow, 잘림, 겹침, 오른쪽 빈 영역은 0이다. 768px과 1440px에서는 `th` 약 28%, `td` 약 72%의 정상 2-column table-cell 구조를 유지했다.

### Cluster audit와 회귀 보존

- 7개 cluster page(hub, Tool 4, Guide, Reference)를 모두 검사했다. 표 specificity 결함은 Guide 1개 표와 Reference 1개 표에만 있었고, Hub의 리듬 결함은 process/document transition 1곳에만 있었다.
- 4개 Tool의 logic, field ID, Generate/Reset/Print, error state를 변경하지 않았다. 실제 browser interaction에서 Builder 기본 생성·whitespace required error·Reset, Routing 2 rules·duplicate-condition conflict 1개·Reset, Traveler 180/45의 4 checkpoints·Reset, Readiness blank 12 gaps·negative error·Reset을 확인했다. 각 Print 버튼은 visible 상태다.
- Shipping Damage Rate는 기본 100/1, illustrative note, Calculate `1% observed damage rate`, Reset 100/1 + idle을 유지했다.
- Dimensional Weight는 기본 Calculate `6.91 lb`, Reset idle을 유지했다.
- 기존 Packaging Trial Decision guide는 390px에서 `th`/`td` 각각 353px, `.meta-line` border-top `0px`를 유지했다. calculator input definition도 390px에서 양 셀 353px를 유지했다.
- Master Carton Dimensions는 1440/390px에서 overflow 0, Master Carton guide와 Weight tool link를 유지했다.
- Homepage 사용자 관리 badge block은 생성 전·후 SHA-256 `1205454B420A7A14B16F66A984BF5217AF327B33F68FB9E30EBD48824198ED68`, anchor 5개로 동일하다. HTML, href, image, 수, 순서, 위치를 변경하지 않았다.

### QA 결과

- syntax/generation: `node --check scripts/generate-site.js`, `node --check scripts/qa.js`, full generation PASS; generated diff는 의도한 공개 HTML 3개뿐이다.
- `node scripts/qa.js`: PASS — 76 HTML, sitemap 75 URL, JavaScript 7; 36 Calculator, 4 workflow Tool, 14 Guide, 12 Reference; internal link/metadata/canonical/GA4/JSON-LD/duplicate ID 회귀 0.
- `node scripts/verify-calculators.js`: PASS — 36 calculators, 181 independent checks.
- `node scripts/verify-workflow-tools.js`: PASS — 46 normal, boundary, error, safety, deterministic checks.
- `git diff --check`: PASS.
- Browser QA 1440/1280/1024/768/390px: 필수 11페이지(hub, Guide, Reference, workflow Tool 4, Homepage, Shipping Damage Rate, Dimensional Weight, Packaging Trial Guide) × 5폭 = 55 조합. horizontal overflow 0, visible out-of-viewport element 0, console error 0. Hub 간격과 table computed width는 위 수치로 확인했다.
- 모바일 menu: 390px에서 `aria-expanded=false` → click → `true`, navigation link visible.

### 남은 위험과 운영 확인

- HIGH: 없음.
- MEDIUM: 별도 device/browser font metric이나 OS별 browser print pagination은 local in-app browser와 다를 수 있다. 이번 CSS 변경은 print output 구조를 건드리지 않았지만 운영 시 실제 print sample을 계속 관찰한다.
- LOW: `.workflow-record-table`은 현재 두 controlled document에 의도적으로 제한돼 있다. 생성기에 유사한 workflow 문서 표를 추가할 때 이 class 또는 그 문서에 맞는 scoped component를 명시해야 한다.
- LOW: global stylesheet를 사용하므로 새 CSS를 도입할 때 plain `.content-table`보다 desktop selector의 specificity가 높은지 정적 QA와 390px computed width를 함께 확인한다.

## 2026-08-20 — New workflow cluster discovery (NO-GO)

### 시작 상태와 복구한 원장

- 실제 작업 checkout: 현재 작업 가능한 범위에서 발견한 `packpreptools/repo`; 새 clone이나 개발도구 설치는 하지 않았다. 바깥 디렉터리는 별도 빈 wrapper Git 저장소였으므로 실제 Pack Prep Tools checkout이 아니었다.
- 시작 local HEAD는 `84d25a5057506812787db350edbb63e67c444477`, 시작 remote main은 `3e85a6df50a8a534db4813c6eadd4d09ecd89197`였다. 작업 트리가 clean이고 3 commits behind인 것을 확인한 뒤 `git fetch origin main`과 `git pull --ff-only origin main`만 사용했다. 동기화 후 조사 시작점 local/origin/remote main은 모두 `3e85a6df50a8a534db4813c6eadd4d09ecd89197`였다.
- remote는 `https://github.com/canghun13/packpreptools.git`, branch는 `main`. 동기화 직후 최근 commit은 `3e85a6d Fix pack instruction responsive layout`이고 working tree는 clean이었다.
- 시작 사이트 규모를 generator registry, 생성 HTML, sitemap, QA로 다시 확인했다. 공개 HTML **76개** = 기본·hub·기타 10 + Tool 40(36 Calculator + 4 workflow Tool) + Guide 14 + Reference 12. sitemap은 404를 제외한 **75 URL**이다.
- Calculator 36개: Box Size, Box Utilization, Box Volume, Bubble Wrap, Bundle Packing Cost, Carton Count, Carton Cube, Case Pack, Cases per Pallet, Dimensional Weight, Insert Quantity, Kitting Cost, Label Cost, Labor Capacity per Shift, Length + Girth, Master Carton Dimensions, Master Carton Weight, Monthly Packaging Spend, Multi-item Box Fit, Order Packing Time, Package Weight & Dimension Variance, Packaging Cost per Order, Packaging Failure Cost, Packaging Material Budget, Packaging Supply Reorder Point, Packaging Trial Comparison, Packaging Waste Allowance, Packing Paper, Pallet Height, Pallet Layer Count, Pallet Utilization, Poly Mailer Size, Prep Batch Time, Shipping Damage Rate, Tape Usage, Void Fill.
- workflow Tool 4개: Pack Instruction Readiness Checker, Pack Instruction Builder, Pack Variant Routing Planner, Pack Job Traveler Generator.
- 현재 cluster: Package size and fit, Materials and usage, Cost and inventory, Labor and workflow, Master cartons, Pallet planning, Packaging Quality & Damage Control, Pack Instruction & Job Release. 최근 구현 cluster는 Pack Instruction & Job Release다.
- authoritative source는 `scripts/generate-site.js`의 registry/template/generation, calculator logic은 `assets/calculators.js`, workflow logic은 `assets/workflow-tools.js`다. 기존 QA는 `scripts/qa.js`, `scripts/verify-calculators.js`, `scripts/verify-workflow-tools.js`다.
- 사용자 관리 영역은 homepage footer 뒤 badge block이다. KittyLaunch → Sell With Boost → Twelve Tools → Findly.tools → BoostDomainRating의 5 anchors, href/image/order/position을 확인했다. 조사 시작 SHA-256은 `1205454B420A7A14B16F66A984BF5217AF327B33F68FB9E30EBD48824198ED68`이다.

### 제외 원장

- 2026-08-08 계열: Returns & Reverse Logistics, Packaging Purchasing & Quote Analysis, Fulfillment Accuracy & Rework, Shipment Consolidation, Packaging Sustainability.
- 2026-08-10 계열: Packaging Automation & Equipment Economics, Packaging Changeover & Downtime, Label Roll & Printer Runtime Planning, Stretch Film & Pallet Wrap Planning, Roll/Sheet Cut Yield & Layout, Packaging Supply Storage & Space Planning, Corrugated Compression & Stack Planning, Gross/Tare/Pallet Weight Planning, Packing Station Layout & Capacity.
- 2026-08-11 계열: Industrial Bags/Liners/Covers, Packaging Version Cutover & Obsolescence, Point-of-use Consumable Replenishment, Order-mix & Dispatch Deadline, Strapping & Edge Protection, Kit Component Availability, Corrugated Partitions & Dividers, Carton Assortment & Box Portfolio, Repack/Overpack Workload, Mailing Tube/Cylindrical Pack.
- 2026-08-13 discovery 계열: Shipping Label Print Setup & Calibration, Pack Instruction & Job Release, Packaging Spec & Supplier Handoff, Packaging Sample & Proof Approval, Shipping Label Placement & Surface Fit, Carton Closure Troubleshooting, Pack Sequence & Layered Presentation, Shipping Scale Verification & Weighment Record, Dispatch Exception Triage & Escalation, Shipment Photo Evidence & Pack Record, Packing Slip & Shipment Document Prep, Packaging Artwork Preflight & File Handoff.
- 이미 구현한 Packaging Quality & Damage Control 및 Pack Instruction & Job Release도 제외했다. 아래 후보는 위 family의 이름 변경이나 현재 calculator의 단위·사용자 변형으로 세지 않았다.

### 이번 신규 family와 52개 Tool 가설

각 행은 `Search intent → Inputs → Logic → Outputs → User action` 순서로 비교했다. “가장 가까운 기존”은 중복 여부를 보수적으로 확인하기 위한 것이며, 일부 입력 공유만으로 독립성을 인정하지 않았다.

#### N1. GS1 Logistic Unit Identification & Packaging Hierarchy — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| SSCC Structure & Check Digit Checker / Checker | wholesale shipper; 입력한 logistics ID 오류 / `SSCC validator check digit` | prefix·extension·serial 또는 18자리 → 길이·numeric·GS1 mod-10 → valid structure와 수정 위치 → ERP/label 원본 수정 | 새 serial block·오류마다 | 기존 없음; 식별자 검증이라 계산기와 독립 |
| SSCC Logistics Label Draft / Generator | pallet/carton shipper; 물류 단위 label draft / `SSCC pallet label generator` | SSCC·from/to·reference·label size → AI(00)와 barcode payload 구성 → printable label draft → test-scan·partner 확인 | logistics unit마다 | Label Cost와 달리 identifier artifact 생성 |
| Packaging Hierarchy Multiplier Checker / Checker | multi-level SKU owner; each-inner-case-pallet 수량 불일치 / `packaging hierarchy checker` | levels·parent qty·base qty → multiplier chain 재계산 → mismatch level → master data 수정 | SKU/pack change마다 | Case Pack은 한 단계 계산; multi-level consistency는 독립 |
| Hierarchy Identifier Handoff Sheet / Builder | data owner; level별 GTIN/SSCC 역할 혼동 / `GS1 packaging hierarchy worksheet` | level·trade/logistics role·identifier·qty → role/level rule mapping → hierarchy sheet와 gaps → GS1/trading partner 검토 | SKU onboarding마다 | Pack Instruction record와 목적·사용자가 다름; 단 official/account data 의존 |

- 실제 수요는 있으나 독립적으로 강한 Tool은 약 **3개**다. check digit/SSCC label/validator는 공식·무료 도구가 이미 해결하고, 4번째부터 GS1 계정·GDSN·trading-partner master data로 넘어간다.

#### N2. Export Carton Shipping Marks — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Carton Shipping Mark Batch Generator / Generator | exporter; carton별 mark 반복 작성 / `shipping mark generator carton` | main mark·destination·PO·carton range·weights·dims → carton 번호별 render → one-mark-per-carton print set → PDF/print | export shipment마다 | 기존 label calculator 없음; artifact는 독립 |
| Carton Range Gap Checker / Checker | export clerk; C/NO 중복·누락 / `carton number sequence checker` | carton IDs/ranges·expected total → set/interval 비교 → gap/duplicate list → packing list와 수정 | multi-carton shipment마다 | Carton Count는 수량 추정; 식별 sequence 검증은 독립 |
| Shipping Mark Layout Preview / Planner | operator; 긴 mark가 label face에 안 맞음 / `shipping mark layout preview` | paper/mark size·line text·font scale → line wrap/bounds 측정 → fit preview·overflow warning → 내용 축약·크기 조정 | mark revision마다 | Label placement 제외 후보와 인접하지만 surface placement가 아닌 print layout |
| Handling Mark Composer / Selector | shipper; handling symbols/words 선택 / `carton handling mark generator` | user-selected handling needs·language → icon/text set 조합 → side-mark block → consignee/carrier 확인 | shipment profile마다 | static decision tree에 가까워 독립 Tool 강도 낮음 |

- 강한 독립 Tool은 약 **2개**다. batch generation·range checking·layout·handling mark가 결국 하나의 mark editor mode로 수렴한다. Worowo와 GainingDocx가 no-login 입력, carton range, weights/dimensions, handling marks, per-carton preview, print/PDF/HTML까지 이미 제공한다.

#### N3. Parcel Billing Evidence & Adjustment Review — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Manifest vs Billed DIM Adjustment Checker / Comparator | ecommerce ops; billed dimensions가 manifest와 다름 / `dim weight adjustment audit` | manifested/billed dims·weights·divisor·charge delta → 두 billable weight 재계산 → adjustment delta/evidence gaps → 측정 record 확보 | invoice마다 | Dimensional Weight+Variance 입력을 쓰지만 청구 비교/action은 다름 |
| Parcel Surcharge Evidence Builder / Builder | billing owner; surcharge dispute 자료 누락 / `shipping surcharge dispute checklist` | surcharge type·invoice line·address/service facts·evidence refs → user rules와 completeness check → evidence map → carrier portal 검토 | disputed line마다 | generic document 성격; live carrier rule 없이는 판정 불가 |
| Duplicate Parcel Charge Detector / Checker | small shipper; tracking/charge 중복 / `duplicate shipping charge checker` | pasted invoice rows·tracking·date·amount → keyed duplicate grouping → candidate duplicates → 원 invoice 확인 | weekly invoice마다 | 기존 비용 계산기와 달리 row matching; bulk parser 필요 |
| Parcel Dispute Packet Generator / Generator | owner; 이메일/claim packet 정리 / `carrier dispute letter generator` | confirmed discrepancy·contract reference·photos/measures → structured summary → draft packet → 사용자가 계약·deadline 확인 후 제출 | confirmed case마다 | Packing document/exception 후보와 겹치며 legal/contract disposition 위험 |

- 강한 독립 Tool은 약 **3개**지만 정확한 audit는 invoice schema, contract rate, service event, current surcharge rule과 claims deadline이 필요하다. static estimate는 기존 DIM/Variance의 확장에 그치고, 실제 recovery는 계정 연결형 SaaS가 강하다.

#### N4. Irregular-item Measurement & Orientation Capture — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Irregular Bounding-box Measurement Sheet / Builder | irregular-item seller; 어디를 재야 할지 불명확 / `measure irregular package worksheet` | shape notes·max extents·measurement points·photos refs → axis/maximum capture order → measurement sheet → physical remeasure | item model마다 | Box Size는 rectangular result; evidence procedure는 독립이나 guide 성격 강함 |
| Orientation Capture Planner / Planner | packer; 회전 가능 방향 누락 / `irregular item orientation planner` | allowed orientations·upright/fragile/protrusion flags → candidate orientation set → capture/test order → physical fit trials | new item/pack마다 | Multi-item Box Fit과 달리 orientation constraints 기록; solver 없으면 얕음 |
| Protrusion & Non-machinable Review / Checker | seller; finished shape의 돌출·rolling 특성 누락 / `irregular parcel checker` | finished shape observations·user carrier thresholds → condition match → research flags → current carrier rule 확인 | service/pack change마다 | Length+Girth와 인접; proprietary live rules 없이 결론 불가 |
| Irregular Pack Trial Comparator / Comparator | fragile/odd item seller; 두 orientation trial 비교 / `irregular packaging test comparison` | trial orientations·finished dims·movement/damage observations → comparable-field delta → review table → pack trial 선택 | prototype마다 | Packaging Trial Comparison과 상당 부분 중복 |

- 강한 독립 Tool은 약 **2개**다. 정확한 shape capture와 placement는 AR/3D/hardware 영역이고, static web에서는 measurement worksheet와 기존 fit/trial 변형으로 축소된다.

#### N5. Package Dimension Drift & Measurement Process Control — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Spec-to-Sample Dimension Comparator / Comparator | packaging receiver; 여러 축의 spec 대비 편차 / `carton dimension tolerance checker` | nominal L/W/H·user tolerances·observations → per-axis delta/range → out-of-user-band observations → hold for owner review | lot/sample마다 | Package Variance는 planned/observed 1세트; multi-axis tolerance table은 확장 |
| Multi-sample Drift Summary / Checker | line owner; lot 내 trend 파악 / `packaging dimension drift spreadsheet` | timestamp/sample measurements → mean/range/trend → drift visualization → measurement process 조사 | run/lot마다 | Variance calculator의 bulk/statistics 확장; quality pass/fail 위험 |
| Repeated Measurement Consistency / Checker | operator; 측정자/도구 반복성 불명 / `package measurement repeatability checker` | repeated readings·operator/gauge IDs·user limit → within/between range → consistency note → method/gauge 재확인 | gauge/operator check마다 | Shipping scale verification 제외 후보와 같은 instrument-check pattern |
| Critical Dimension Inspection Record / Generator | small manufacturer; 측정 evidence 분산 / `carton inspection record template` | lot/spec/sample IDs·critical dims·observations → structured rows → inspection record → responsible quality owner disposition | receipt/production lot마다 | Quality cluster와 generic inspection form에 인접 |

- 강한 독립 Tool은 약 **2개**다. 통계 기능은 기존 Variance의 multi-row 확장이고, disposition을 제공하면 AQL/quality acceptance 영역으로 넘어간다. 업계 tolerance도 supplier/process별로 달라 user-provided 값만으로는 cluster depth가 부족하다.

#### N6. Corrugated Structural Style & Dieline Planning — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| FEFCO Style Needs Selector / Selector | seller/designer; 구조 code 선택 어려움 / `FEFCO box style selector` | access/closure/loading/flatness/user constraints → feature-to-style mapping → candidate styles·questions → converter 확인 | new pack마다 | Box Style glossary를 interactive tree로 감싼 수준이 될 위험 |
| Internal-to-Blank Dimension Planner / Calculator | converter-facing owner; panel/blank 초안 / `RSC blank size calculator` | internal dims·style·board caliper·user allowances → style geometry → panel/blank dimensions → converter review | size/style마다 | Box Size와 logic/output이 다르지만 manufacturing allowance 책임 큼 |
| Parametric Dieline Draft / Generator | designer; flat pattern 생성 / `free box dieline generator` | style·L/W/H·caliper·glue/bleed → cut/fold geometry → SVG/PDF/DXF draft → printer/die-maker verification | design마다 | 기존 없음; CAD-like engine이 필요 |
| Fold/Glue Handoff Checker / Checker | artwork owner; cut/crease/glue layer 누락 / `dieline handoff checker` | layer names·bleed/safe/glue values·file metadata → required-set comparison → missing/ambiguous list → converter preflight | revision마다 | Artwork Preflight 제외 후보와 직접 인접 |

- 강한 독립 Tool은 약 **2개**다. style selection은 glossary, blank/dieline은 한 geometry engine, handoff는 최근 제외한 artwork preflight다. 여러 무료 경쟁자가 live 2D/3D, board compensation, manufacturing score, sheet layout, SVG/PDF/DXF/PNG까지 제공한다.

#### N7. Packaging Material Receiving Inspection — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Receipt Inspection Readiness Builder / Builder | warehouse receiver; PO/spec/equipment 준비 누락 / `packaging receiving inspection checklist` | material type·PO/spec refs·available gauges·required evidence → selected preparation fields → dock worksheet → inspection 준비 | delivery마다 | Pack Instruction readiness와 다른 stage/user지만 같은 completeness engine |
| Sample Spread Planner / Planner | receiver; top layer만 검사 / `incoming inspection sampling worksheet` | lot/pallet count·user-selected sample count·risk locations → distribution algorithm → pull map → physical sampling | lot마다 | AQL 수를 invent하지 않으면 logistics helper로 독립 가능하나 scope 좁음 |
| Packaging Observation Recorder / Generator | inspector; dimensions/joint/print observations 분산 / `corrugated receiving inspection form` | lot IDs·spec refs·measurements·photo refs → structured record → observation report → quality owner review | receipt마다 | Quality/Damage record와 generic mobile form 경쟁 |
| Supplier Nonconformance Handoff / Generator | buyer; evidence handoff 불완전 / `packaging nonconformance report template` | confirmed issue·affected qty·evidence·requested response → completeness/render → NCR draft → supplier/owner disposition | issue마다 | Supplier handoff·exception 후보와 중복; contractual disposition 위험 |

- 강한 독립 Tool은 약 **3개**지만 4번째부터 supplier quality/NCR가 된다. 무료 forms/checklist builders와 mobile inspection SaaS가 barcode/PO scan, photos, conditional failure fields, sync/WMS integration까지 해결한다. static version은 기존 quality record와 generic form 사이에서 얕다.

#### N8. Cold-chain Pack-out Preparation — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Thermal Lane Intake Builder / Builder | food/pharma shipper; lane assumptions 누락 / `cold chain packaging planner` | product temperature band·transit·ambient assumptions·shipment format·validation refs → completeness only → lane brief → qualified packaging review | lane/season마다 | 기존 없음; 안전상 recommendation은 제공 불가 |
| Coolant Conditioning Schedule / Planner | operator; pre-conditioning timing 기록 / `ice pack conditioning schedule` | user-approved SOP times·freezer capacity·ship cutoff·pack counts → backward schedule → conditioning batches → 실행/record | dispatch batch마다 | Prep Batch Time과 scheduling logic이 겹치며 thermal 성능 근거는 외부 |
| Cold-chain Pack-out Checklist / Generator | packer; validated configuration 순서 누락 / `cold chain packout checklist` | user-owned validated configuration·components·sequence·logger → job checklist → printable record → pack execution | shipment/batch마다 | Pack Instruction Builder의 product-specific template variation |
| Logger Placement & Handoff Record / Generator | quality owner; logger ID/위치/수령 정보 누락 / `temperature logger placement record` | logger IDs·positions·start/stop·recipient instructions → structured manifest → handoff sheet → monitor/retrieve data | controlled shipment마다 | record는 독립이나 compliance/data logger workflow 의존 |

- 겉보기에는 4개지만 strong independent count는 약 **2개**다. packout/checklist는 Pack Instruction 변형이고 schedule은 Prep Batch Time 변형이다. recommendation·performance claim은 validated thermal data 없이는 안전하지 않다. WHO, vendor suites, route-risk services와 logger ecosystems가 더 깊다.

#### N9. Non-hazardous Liquid Containment Preparation — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Containment Layer Readiness Checker / Checker | liquid seller; primary/secondary/outer layer 누락 / `leak proof liquid packaging checklist` | user product classification·approved closure/barrier/outer pack·evidence → completeness → missing layer list → approved method 확인 | SKU/method마다 | quality readiness pattern; safety/legal classification 불가 |
| Absorbent Capacity Worksheet / Calculator | non-hazardous liquid seller; worst-case absorbent 기록 / `absorbent material calculator liquid shipping` | liquid volume·units·user-measured absorbency factor·allowance → capacity arithmetic → required user-calibrated amount → physical spill test | pack size마다 | Void Fill/Bubble Wrap과 다른 logic이나 performance guarantee 위험 |
| Closure Test Log Builder / Generator | brand; lot별 invert/squeeze test 기록 / `bottle leak test log` | closure lot·torque/user method·observations·time → structured log → exceptions → responsible owner review | closure lot마다 | Packaging Trial/Quality cluster와 겹침 |
| Liquid Pack Configuration Record / Builder | packer; bottle orientation·barrier·upright method 전달 / `liquid packout worksheet` | approved component IDs·orientation·secondary barrier·cushioning → ordered record → pack sheet → job release | SKU/variant마다 | Pack Instruction Builder의 material/step template variation |

- 강한 독립 Tool은 약 **2개**다. 다른 두 개는 Quality Trial과 Pack Instruction 변형이다. hazardous/non-hazardous 분류, carrier rules, closure/material compatibility와 performance 책임 때문에 static selector는 부적합하다.

#### N10. ESD Electronics Pack-out Control — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| ESD Packaging Requirement Intake / Builder | electronics seller; device sensitivity/handling facts 누락 / `ESD packaging worksheet` | device/approved control plan·contact/shield needs·handling stages → completeness → requirement brief → ESD owner/supplier 확인 | part/revision마다 | 기존 없음; device classification은 사용자 입력이어야 함 |
| Protective Packaging Configuration Checker / Checker | packer; bag/foam/tape/label 조합 mismatch / `ESD packaging checker` | approved material properties/IDs·contact sequence → user rule comparison → mismatch list → approved BOM 수정 | pack method마다 | Material selector처럼 보이나 verified electrical properties 없으면 판정 불가 |
| ESD Pack-out Record / Generator | operator; seal/symbol/lot/operator record 누락 / `ESD packaging record template` | part/lot·bag/foam/tape IDs·seal/symbol checks·operator → structured record → job sheet → shipment handoff | batch마다 | Pack Job Traveler의 specialized template |
| Shielding Bag Condition Log / Checker | warehouse; 재사용 bag condition 추적 / `ESD bag inspection checklist` | bag ID/use count·visual/seal observations·user rejection rules → condition record → quarantine/retest → owner disposition | reuse cycle마다 | Returns/Sustainability 및 quality inspection에 인접; test equipment 필요 |

- 강한 독립 Tool은 약 **2개**다. 표준은 ESD Association/IEC material tests와 control plan을 요구하고, 색상만으로 성능을 판단할 수 없다. static record/checker는 certification·safety 오해 위험이 크다.

#### N11. Accessible Package Opening Evaluation — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Opening Action Task Analyzer / Builder | package designer; pinch/twist/tool/multi-action barrier 기록 / `accessible packaging checklist` | opening steps·required actions·one-hand/tool flags → action taxonomy → barrier map → prototype redesign | prototype마다 | 기존 없음; usability workflow로 독립 |
| Opening Force Measurement Log / Generator | tester; 힘 측정과 조건 분산 / `package opening force test sheet` | instrument/readings·grip/opening point·conditions → summary only → measurement log → trained test review | test round마다 | Package Variance와 달리 usability measure지만 test method 필요 |
| Inclusive Feature Review / Checker | designer; contrast/tactile/instruction/entry-point 누락 / `inclusive packaging evaluation tool` | observed features·user-owned criteria → completeness/traceability → review matrix → user testing 계획 | design revision마다 | official Microsoft checklist를 UI로 감싼 수준 위험 |
| Prototype Accessibility Comparator / Comparator | brand; prototype A/B opening experience 비교 / `easy open packaging comparison` | user-panel observations·force readings·task success notes → side-by-side deltas → unresolved barriers → further user testing | prototype round마다 | Trial Comparison의 usability specialization |

- 강한 독립 Tool은 약 **3개**지만 official Microsoft free checklist가 이미 구체적이고, ISO 17480 및 Arthritis Australia certification은 instrument/user-panel testing을 요구한다. Pack Prep Tools가 정적 점수나 pass/fail을 제공하면 접근성을 잘못 보증할 위험이 있다.

#### N12. Wooden Crate & Export Pack Preparation — REJECT

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Cargo-to-Crate Clearance Estimator / Calculator | custom shipper; cargo+padding 외형 초안 / `shipping crate size calculator` | cargo dims·user-approved clearance/padding·panel thickness → nested dimension arithmetic → internal/external crate draft → crating engineer 확인 | job마다 | Box Size와 유사하나 crate panel/access output; 구조강도 없음 |
| Crate Material Takeoff Estimator / Calculator | crate shop; panel/slat 초도 물량 / `wooden crate material calculator` | crate dims·panel/slat coverage·thickness·user waste → surface/board-foot arithmetic → material estimate/empty weight → quote/stock check | crate마다 | Packaging material budget과 다른 fabrication logic |
| Crate Access & Opening Selector / Selector | equipment shipper; top/side/removable panel 선택 / `shipping crate selector` | cargo handling·lift points·unloading/access constraints → feature mapping → candidate opening scheme·questions → crating provider review | cargo type마다 | static vendor selector; engineering depth 낮음 |
| Export Wood Marking Readiness Record / Checker | exporter; ISPM 15 evidence/mark location 누락 / `ISPM 15 crate checklist` | destination/user requirements·material certification refs·mark observations → completeness only → missing evidence list → certified provider/broker 확인 | export job마다 | certification 판정을 피하면 단순 record; 법적/plant-health 유지관리 큼 |

- 강한 독립 Tool은 약 **3개**다. sizing/material takeoff/access/export check는 실제로 다르지만 crate strength, blocking/bracing, lifting, dangerous cargo와 ISPM 15 compliance 책임을 회피하면 cluster 핵심이 빠진다. free calculators와 professional CAD/quoting products가 이미 존재한다.

#### N13. Packaging Master Data Quality & Channel Mapping — REJECT (경계 후보)

| Tool / type | 사용자·문제 / 검색 의도 | I→L→O→A | 반복 이유 | 가장 가까운 기존 / 독립성 |
|---|---|---|---|---|
| Packaging Data Completeness Checker / Checker | SKU data owner; level별 필수 field 누락 / `packaging master data checklist` | user-defined channel schema·SKU/level fields → required-set comparison → gap matrix → PIM/ERP 보완 | SKU onboarding마다 | Pack Instruction Readiness와 engine 유사, 대상 data/action은 다름 |
| Unit-of-measure Chain Validator / Checker | data owner; each/case/pallet conversion 충돌 / `packaging UOM hierarchy validator` | level multipliers/base qty → chain products/cross-check → inconsistency list → master data 수정 | hierarchy change마다 | N1 hierarchy checker와 같은 logic이므로 별도 strong Tool 아님 |
| Channel Packaging Mapping Matrix / Generator | marketplace/wholesale brand; channel별 field 이름 연결 / `packaging data mapping template` | channel/user field names·source fields·transform notes → mapping table → unresolved fields → integration handoff | channel launch마다 | Supplier/spec handoff 제외 후보 및 generic PIM 영역에 인접 |
| Duplicate Configuration Finder / Checker | multi-SKU operator; 같은 identifier에 다른 qty/dims / `packaging master data duplicate checker` | pasted records·keys·dims/qty → group/conflict detection → duplicates/conflicts → source owner 확인 | bulk data refresh마다 | 기존 계산기와 독립이나 CSV schema/enterprise data 의존 |

- 강한 독립 Tool은 약 **2개**다. GS1 hierarchy와 supplier/spec handoff를 다시 묶은 경계 후보이며, 실제 가치가 있으려면 PIM/ERP/GDSN schema, versioning, user accounts와 data persistence가 필요하다. 따라서 12개 core family 숫자에는 의존하지 않고 추가로만 기록한다.

### 외부 검색·long-tail·경쟁 기능 확인

- keyword volume/GSC 신규 landing data에는 접근하지 못했다. 수치를 만들지 않았고 exact/long-tail SERP 반복, official/vendor documentation, 무료 interactive tool의 실제 field/output, SaaS scope, community 질문을 사용했다.
- 대표 query/long-tail: `SSCC label generator`, `GS1 packaging hierarchy checker`, `shipping mark generator carton range`, `dim weight adjustment audit small business`, `measure irregular item for shipping worksheet`, `carton dimension tolerance checker`, `free FEFCO dieline generator`, `packaging material receiving inspection form`, `cold chain packout checklist`, `liquid leak test log shipping`, `ESD packaging checklist`, `accessible packaging opening force test`, `wooden export crate calculator`, `packaging master data hierarchy validator`를 조사했다. small warehouse, manual, batch, multi-SKU, no-login, worksheet, spreadsheet, generator 변형도 함께 확인했다.
- N1: GS1 Logistic Label Guideline은 SSCC를 logistics unit의 mandatory identifier로 정의하고 구조·검증을 규정한다. GS1 Ireland check digit calculator, BoxTools, ShipmentSentry, JA Technology가 check digit, validator, GS1-128, batch pallet label까지 무료로 제공한다. hierarchy는 GS1 account/GDSN/Synkka/PIM 영역이다.
  - https://www.gs1.org/standards/gs1-logistic-label-guideline/1-3
  - https://www.gs1ie.org/tools-services/tools/check-digit-calculator/
  - https://boxtools.app/en/sscc-label-generator
- N2: Worowo는 Main Mark, destination, consignee, PO, SKU, origin, carton from/to, net/gross weight, measurement, notes, four handling marks를 받아 carton별 preview 20개와 Letter/A4 print/PDF를 no-login으로 제공한다. 실제 UI를 직접 열어 해당 inputs와 outputs를 확인했다. GainingDocx도 print/PDF/editable HTML 범위를 제공한다.
  - https://www.worowo.com/packing-shipping/shipping-mark-generator/
  - https://gainingdocx.com/tools/shipping-mark-generator
- N3: ShipWave 실제 UI는 monthly spend, parcel volume, carrier를 받아 late-delivery/address correction/DIM reclass/surcharge의 directional estimate를 내며, line-by-line audit는 실제 invoice와 shipment data가 필요하다고 명시한다. Last Mile Solutions는 PDF/JPEG/PNG upload 또는 line paste 후 surcharge category를 찾고 full dollar breakdown은 email gate다. LateShipment, ConData, ParcelClaims 등은 carrier account/invoice/contract/SLA 기반 자동 claim SaaS다.
  - https://shipwave.app/tools/carrier-invoice-audit
  - https://www.lastmile.us/audit
  - https://www.lateshipment.com/get-a-free-refunds-eligibility-audit/
- N4: Canada Post는 irregular item도 가장 큰 세 축, 즉 들어갈 수 있는 최소 직육면체 기준으로 재도록 안내한다. PackPilot는 AR capture, cylinders/soft bags/irregular gear, orientation/access constraints, 3D plan과 PDF를 제공하고 MobileDemand/xDIM 계열은 camera/hardware dimensioning을 제공한다. static worksheet만으로는 경쟁 깊이를 따라갈 수 없다.
  - https://origin-www.canadapost.ca/cpc/en/support/articles/abcs-of-mailing/how-to-cube-an-item-and-calculate-the-ve-of-its-actual-weight.page
  - https://packpilot.io/
- N5/N7: 실제 receiving guidance는 dimensions, squareness, joints, print, quantity, pallets/layers sampling과 photo evidence를 요구한다. Cargosnap 같은 mobile inspection SaaS는 PO/barcode scan, shipment-linked photo/video, structured checklist, real-time sync, WMS/ERP integration을 제공한다. Makeform과 Miratag는 no-code/free checklist, conditional failure evidence, Accept/Hold/Reject fields를 제공한다.
  - https://www.boxwaale.in/blogs/corrugated-packaging-quality-checklist
  - https://www.cargosnap.com/resources/blog/mobile-apps-for-incoming-goods-inspection-what-to-look-for
  - https://www.makeform.ai/tools/ai-material-inspection-checklist-generator
- N6: FEFCO official code는 국제 구조 분류다. PackagingTools.io 실제 UI는 seven structures, internal dimensions, material/flute/caliper, grain, bleed/safe/glue, order qty를 받아 2D/3D, engineering score, inside/outside/blank size, sheet optimization, cost estimate, SVG/PDF/DXF/PNG를 no-login으로 제공했다. PackMyMan, FreeBoxTemplate, Gráfico Impresores, vendor quote calculators도 free dieline/FEFCO options를 제공한다.
  - https://www.fefco.org/sites/default/files/files/FEFCO%20Code_WEB%287%29.pdf
  - https://packagingtools.io/design/dieline-generator/
  - https://www.packmyman.com/
- N8: WHO는 cold-room/equipment temperature mapping tool과 supported logger workflow를 배포한다. Tempk는 selector, ice/dry-ice calculators, coolant/insulation reference, checklist 등 cluster 전체를 제공하고 TempClarity는 hub/corridor weather 기반 route risk와 next safe ship date를 제공한다. 정적 추천은 validation을 대체할 수 없다.
  - https://www.who.int/publications/m/item/cold-chain-equipment-and-dry-store-temperature-mapping-tool
  - https://www.tempcontrolpack.com/cold-chain-tools/
  - https://www.tempclarity.com/
- N9: liquid SERP는 primary seal, absorbent secondary barrier, rigid outer pack, closure test를 반복하지만 product/carrier classification이 중요하다. 사용자 측 absorbency 값으로 산술 worksheet는 가능해도 safety/compliance cluster는 만들 수 없다.
  - https://www.packagetheworld.com/blog/how-to-ship-liquids-ecommerce-leak-proof-packaging-guide
- N10: DataScope의 ESD checklist는 shielding package, dissipative holder, markings, bag condition, ESD-compatible tape를 다룬다. ESD Association은 packaging material evaluation test methods를 standards bundle로 제공한다. verified material properties/control plan 없이 selector 결과를 내면 위험하다.
  - https://datascope.io/library/en/template/esd-controls-checklist
  - https://www.esda.org/store/standards/product/262/esd-manufacturing-essential-standards-bundle/
- N11: Microsoft의 free accessible packaging checklist 실제 페이지는 contrast, tactile wayfinding, plain language, opening force, one-hand/pinch/twist/grasp/tool, entry point, action sequence, tabs까지 이미 구체적으로 제공한다. ISO 17480은 instrument/user-based evaluation과 conformance를 다루고, Arthritis Australia는 testing/certification을 운영한다.
  - https://inclusive.microsoft.design/articles/creating-accessible-packaging
  - https://standards.iteh.ai/catalog/standards/iso/1ab55687-6974-43d9-8721-2ca0a4a9deaf/iso-17480-2015
- N12: CrateCalculator와 WoodworkingAdvisor는 size/clearance/panel/board feet/weight/cost를 무료 계산한다. BoxCalc는 item constraints, padding, weight, rotation, fragility, layer visualization, CSV/Excel, PDF/HTML/Excel export를 제공하고 Crate Pro는 design/cost/ISPM 15 tracking을 제공한다. 구조 안전을 제외한 작은 static subset만으로 4-tool cluster를 정당화하지 못했다.
  - https://cratecalculator.com/
  - https://box-calc.com/index_en.html
  - https://www.cratepro.com/
- N13: Phantm, AcuSpecs, PackR8, SAP/GS1 systems가 structured component/level records, completeness, validation, approval/versioning, supplier capture, compliance evidence, hierarchy rule checks를 제공한다. no-account static paste tool은 일부 duplicate/gap만 찾을 수 있어 generic data utility에 가깝다.
  - https://www.phantm.com/services/software
  - https://acuspecs.com/
  - https://help.sap.com/docs/SAP_S4HANA_MANUFACTURING_LOGISTICS/25996e2761154fefa67bfbefa4457bb7/9699a56b1f76402ebfce2c634891fa87.html

### 대표 competitor 실제 UI와 mobile 확인

- Worowo Shipping Mark Generator: login 없음, 위 12개 text/range fields와 handling marks, carton 1–20 자동 preview, Letter/A4, Print/Save PDF를 확인했다. generation·range·layout·handling 가설이 한 editor에 이미 결합돼 있었다.
- BoxTools SSCC Label Generator: Free/no-login, extension/prefix/serial/from/to/reference/existing SSCC/batch/label size inputs, mod-10 validation, AI(00), GS1-128, A6/4×6/100×150, Copy/SVG/PDF/batch HTML를 확인했다. `GS1 prefix는 할당하지 않는다`, production test-scan 필요 경계도 명시한다.
- PackagingTools.io Dieline Studio: free/no-sign-up, style/dimensions/flute/caliper/grain/manufacturing inputs, 2D/3D/engineering score/blank size/sheet utilization/cost와 four export formats를 확인했다. Pack Prep Tools가 만들 수 있는 static subset보다 현저히 깊다.
- 동일한 390px override 탭에서 대표 4개를 순차 재확인했다. browser content viewport는 375px였고 SSCC와 ShipWave overflow는 0, main inputs는 각각 301px와 277px의 한 열이었다. Worowo는 inputs 315px 한 열이지만 document overflow 8px, PackagingTools.io는 main selects 313px이나 document overflow 40px가 측정됐다. 경쟁 기능 깊이 판단과 별개로 두 competitor도 mobile polish가 완전하지는 않았다. ShipWave audit FAQ는 manifested dimensions, invoice, carrier commitments, published rules, account 연결을 요구한다.

### 후보별 gate 요약과 최종 판단

| Family | 확인된 intent/반복성 | 무료·전문 경쟁 | 기존 중복/안전·유지관리 | 강한 독립 Tool | 판정 / 실패 Gate |
|---|---|---|---|---:|---|
| N1 GS1 ID & hierarchy | shipment/SKU마다 높음 | official + multiple free labels/validators + PIM | standards/account/trading partner data | 3 | REJECT — competition, data dependency, 4-tool gate |
| N2 Shipping marks | export shipment마다 높음 | free batch mark/PDF/HTML | one editor modes, handling tree 약함 | 2 | REJECT — independence, competition |
| N3 Parcel billing evidence | weekly invoice마다 높음 | estimate tools + mature recovery SaaS | contract/live invoice/SLA dependency | 3 | REJECT — static fit, maintenance, safety |
| N4 Irregular measurement | new odd SKU마다 중간 | AR/3D/hardware tools | existing fit/trial overlap | 2 | REJECT — depth, independence |
| N5 Dimension drift | lot/run마다 중간 | spreadsheets/QMS/checklists | Variance expansion, AQL/pass risk | 2 | REJECT — overlap, safety |
| N6 FEFCO/dieline | design마다 높음 | strong free CAD-like tools | geometry modes + preflight excluded | 2 | REJECT — competition, independence |
| N7 Receiving inspection | receipt마다 높음 | free forms + mobile inspection SaaS | quality/NCR scope, generic forms | 3 | REJECT — independence, fit/safety |
| N8 Cold chain | lane/season/batch마다 높음 | WHO/vendor/logger/route suites | validated thermal performance required | 2 | REJECT — safety, static fit |
| N9 Liquids | SKU/closure lot마다 중간 | guides/vendor/carrier docs | Trial/Instruction overlap, classification risk | 2 | REJECT — overlap, safety |
| N10 ESD | part/batch마다 중간 | standards/checklist/specialist supply | electrical test/control plan required | 2 | REJECT — safety, evidence |
| N11 Accessible opening | prototype마다 중간 | Microsoft free criteria + formal testing | human-panel/certification boundary | 3 | REJECT — safety, 4-tool gate |
| N12 Wooden crate/export | job마다 높음 | free calculators + CAD/quote suites | structural/export responsibility | 3 | REJECT — safety, competition |
| N13 Packaging master data | onboarding/change마다 높음 | PIM/GS1/SAP platforms | recent spec-handoff adjacency, account/data | 2 | REJECT — non-new boundary, site fit |

- **최종 결정: NO-GO.** 12개 core family와 1개 boundary family, 총 52개 Tool 가설을 검토했지만 13개 GO 조건을 모두 통과하는 family가 없다. 가장 가까웠던 후보는 N3 Parcel Billing Evidence, N7 Packaging Material Receiving Inspection, N11 Accessible Package Opening, N12 Wooden Crate & Export Pack Preparation이었으나 각각 strong independent Tool이 최대 3개였고 live data/contract, quality disposition, human testing/certification, structural/export safety라는 결정적 gate를 실패했다.
- 따라서 production HTML/CSS/JS, generator/registry/manifest, sitemap/llms, navigation, calculator/workflow logic은 변경하지 않았다. 신규 page·cluster·artifact도 만들지 않았고 unrelated cleanup도 하지 않았다. 이번 commit 대상은 이 `handover.md` 기록뿐이다.
- 재검토 조건: (1) GSC/외부 문의에서 특정 long-tail의 반복 landing intent가 실제로 쌓이고, (2) 같은 family 안에서 account/API 없이 서로 다른 I→L→O→A를 가진 4개 Tool이 증명되며, (3) strong free suite가 해결하지 않는 small-operator gap이 실제 사용자 workflow로 확인되고, (4) pass/fail·certification·safety/contract 결론 없이도 각 output이 직접 다음 행동을 만들 때만 다시 GO 검토한다. 특히 parcel audit는 stable invoice CSV schema와 user-supplied contract rules, receiving은 disposition 없는 evidence workflow 4개, accessibility는 recognized open test method와 user-panel boundary, crate는 authoritative non-structural planning scope가 확보돼야 한다.

### 기본 QA와 보존 확인

- 현재 셸 PATH에 `npm`이 없어 `npm test` 첫 시도는 명령을 시작하지 못했다. 새 설치는 하지 않고, 현재 Codex 환경에서 이미 제공된 bundled Node executable을 확인한 뒤 동일 Node scripts를 직접 실행했다.
- JS syntax: `scripts/generate-site.js`, `scripts/qa.js`, `scripts/verify-calculators.js`, `scripts/verify-workflow-tools.js` 모두 `node --check` PASS.
- `node scripts/qa.js`: PASS — 76 HTML, sitemap 75 URL, JavaScript 7; 36 calculators, 4 workflow tools, 14 guides, 12 references; duplicate long paragraph/sentence 0; calculator input-definition responsive override 36/36.
- `node scripts/verify-calculators.js`: PASS — 36 calculators, 181 independent checks.
- `node scripts/verify-workflow-tools.js`: PASS — 46 normal/boundary/error/safety/deterministic checks.
- production generation은 NO-GO 규칙에 따라 실행하지 않았다. `index.html`을 수정하지 않았고 badge block SHA-256는 `1205454B420A7A14B16F66A984BF5217AF327B33F68FB9E30EBD48824198ED68`, anchors 5개, href/order가 그대로다.
- commit 전 `git diff --check`, staged diff, 변경 파일이 `handover.md` 하나뿐인지 다시 확인한다. commit/push 후 local HEAD, origin/main, `git ls-remote` main, branch, clean working tree를 이 section의 Git 마감에 추가한다.

### Git 마감

- 조사 시작 기준: `3e85a6df50a8a534db4813c6eadd4d09ecd89197` (local = origin/main = remote main after safe fast-forward).
- 조사 기록 commit: `7ae0237122d416d796d1001ee35cd6498893fa89` (`Research new workflow clusters and record no-go`). 변경은 `handover.md` 1개, 260 lines 추가뿐이다.
- `git push origin main` 성공 후 `git fetch origin main`과 `git ls-remote origin refs/heads/main`으로 확인했다. 이 조사 commit 시점 local HEAD = origin/main = remote main = `7ae0237122d416d796d1001ee35cd6498893fa89`, branch `main`, working tree clean이었다.
- 위 hash 검증 결과를 남기는 이 closing note도 `handover.md`만 변경한다. closing note commit/push 뒤의 최종 hash와 clean 상태는 작업 최종 보고에서 확정한다.
