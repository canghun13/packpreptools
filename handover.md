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

2026-08-02 품질·손상 관리 클러스터 확장 기준:

- 실제 공개 HTML 69개
- 기본·허브 페이지 9개
- 계산기 36개
- Guides 13개
- Reference 11개
- 공통 스타일: `assets/styles.css`
- 공통 UI 동작: `assets/site.js`
- 계산 로직: `assets/calculators.js`
- 정적 페이지 생성기: `scripts/generate-site.js`
- 자동 QA: `scripts/qa.js`
- 계산 검증: `scripts/verify-calculators.js`
- 검색·크롤링 파일: `robots.txt`, `sitemap.xml`, `llms.txt`
- 유지 파일: `CNAME`, `README.md`, `handover.md`

### 현재 상태 판정

- Phase 1 Foundation·디자인 차별화와 Phase 2·3 기능/콘텐츠 확장 완료 후 Packaging Quality & Damage Control 소규모 클러스터 추가
- GitHub `main` 배포 상태는 아래 최신 작업 기록을 우선 확인
- GitHub Pages / Cloudflare 실도메인 상태는 아래 최신 작업 기록을 우선 확인
- 모든 공개 HTML에 고유 SEO 메타데이터, Open Graph, favicon, GA4, 정적 JSON-LD 적용
- 자동 QA, 계산기 36개·독립 검사 181개, 69페이지 × 5개 반응형 폭 브라우저 QA 통과
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
