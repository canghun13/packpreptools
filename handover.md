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
