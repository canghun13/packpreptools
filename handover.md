# Pack Prep Tools — handover.md

> **프로젝트 기준 문서 / Source of Truth**
>
> 이 파일은 `packpreptools.com`의 기획, 개발 규칙, 현재 상태, 검증 결과, 다음 작업을 한곳에서 관리하는 기준 문서다.
> 회사와 집 어느 PC에서 작업하더라도 **GitHub 원격 저장소의 `main` 브랜치와 이 파일**을 기준으로 이어서 진행한다.
>
> Codex 또는 다른 작업 에이전트는 작업 시작 전에 이 문서를 처음부터 끝까지 읽고, 작업 완료 전에 반드시 최신 상태로 갱신해야 한다.

---


# 0. 확정 프로젝트 정보

| 항목 | 확정값 |
|---|---|
| 도메인 | `https://packpreptools.com/` |
| GitHub 저장소 | `https://github.com/canghun13/packpreptools` |
| Git remote | `https://github.com/canghun13/packpreptools.git` |
| 브랜드 | **Pack Prep Tools** |
| 공개 언어 | 영어 |
| 개발·인수인계 문서 | 한국어 |
| 주요 사용자 | 온라인 판매자, 소형 브랜드, Etsy/Shopify/eBay/Amazon 판매자, 소규모 창고·포장 작업자 |
| 핵심 용도 | 상품 포장 준비, 상자 치수, DIM weight, 포장재 수량, 포장 원가와 작업량 계산 |
| 수익화 | Google AdSense 우선, 추후 포장재·장비 제휴 링크 검토 |
| 호스팅 | GitHub Pages |
| DNS/CDN/SSL | Cloudflare |
| 기술 스택 | 정적 HTML + CSS + Vanilla JavaScript |
| 데이터베이스 | 사용하지 않음 |
| 프레임워크 | 사용하지 않음 |
| 이미지 정책 | 원칙적으로 이미지 없이 구성 |
| 연락 이메일 | `canghun13@naver.com` |
| GA4 측정 ID | `G-XR7JWJ36CD` |
| 최초 기준일 | 2026-07-26 |

## 절대 변경 금지

- 도메인과 브랜드명을 임의로 바꾸지 않는다.
- 다른 프로젝트의 GA4 측정 ID를 섞지 않는다.
- 기존 `CNAME`, GitHub Pages, Cloudflare 관련 파일을 임의 삭제하지 않는다.
- React, Vue, Next.js, Astro, PHP, CMS, 데이터베이스를 도입하지 않는다.
- 유료 API나 월 고정비 서비스를 추가하지 않는다.
- 다른 프로젝트의 로고, 색상, 헤더, 카드, 계산기 UI를 그대로 복사하지 않는다.
- 사용자 이메일을 다른 값으로 되돌리지 않는다.

---

# 0. GA4 고정 코드

모든 색인 가능한 공개 HTML의 `<head>` 안에 아래 코드를 동일하게 넣는다.

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

## 검증 규칙

- 공개 HTML 전체에서 `G-XR7JWJ36CD` 존재 여부를 자동 검사한다.
- 다른 GA4 ID가 한 건이라도 발견되면 QA 실패다.
- 계산 이벤트를 추가해도 사용자가 입력한 실제 값은 Analytics로 전송하지 않는다.
- 불완전한 자체 쿠키 배너를 임의로 만들지 않는다.
- AdSense 운영 단계에서 필요 국가와 요구사항을 확인한 후 CMP를 별도 적용한다.

---

# 0. 사이트 정의와 범위

## 한 문장 정의

**Pack Prep Tools is a practical calculator and reference site for small online sellers who need to size packages, estimate packing materials, and understand per-order packing cost before shipping.**

## 주요 사용 상황

- 상품에 맞는 상자 내부 크기와 완충 여유 계산
- dimensional weight 계산
- length + girth 계산
- 상자 안 남는 공간과 void fill 추정
- 버블랩, 포장지, 테이프 사용량 추정
- 폴리메일러 권장 평면 크기 추정
- 주문 1건당 포장재 원가와 인건비 계산
- 대량 주문에 필요한 박스와 포장재 수량 계획
- case pack과 carton count 계산

## 초기 범위 제외

- 실시간 택배 요금 조회
- 우편번호·지역별 배송비 견적
- 운송장 구매나 배송 예약
- 특정 운송사 계정 계약 요금
- 통관·관세·세금 자동 계산
- 위험물, 의약품, 식품, 냉장·냉동, 생물학적 물질 규제 포장
- 법적·규제 적합성 보증
- Amazon FBA 또는 운송사 규칙을 항상 최신이라고 단정하는 기능
- 창고관리시스템, 주문관리시스템, 로그인, 사용자 데이터 저장
- AI 챗봇

## 변경 가능한 정책값 처리

- DIM divisor는 사용자가 직접 변경할 수 있어야 한다.
- preset을 제공할 경우 일반적인 예시임을 명시한다.
- 특정 운송사 규칙을 언급하면 공식 출처와 `Last reviewed` 날짜를 표시한다.
- 계산 결과에는 실제 운송사와 계약 조건을 다시 확인하라는 문구를 넣는다.
- 오래된 개인 블로그를 정책값의 단독 근거로 사용하지 않는다.

---

# 0. 회사·집 멀티 PC 운영 규칙

## 기준 순서

1. GitHub 원격 저장소의 `main`
2. 저장소 루트의 `handover.md`
3. 실제 배포된 `https://packpreptools.com/`

채팅 기억이나 로컬 메모는 기준이 아니다.

## 새 PC에서 최초 시작

작업 폴더가 아직 없다면:

```bash
git clone https://github.com/canghun13/packpreptools.git
cd packpreptools
git branch --show-current
git remote -v
git pull --ff-only origin main
```

`origin`은 반드시 아래 주소를 가리켜야 한다.

```text
https://github.com/canghun13/packpreptools.git
```

다른 저장소를 열었거나 `origin`이 다르면 작업하지 말고 먼저 저장소를 바로잡는다.

## 작업 시작 전

저장소 루트에서 아래를 실행한다.

```bash
git status
git branch --show-current
git remote -v
git log -5 --oneline
```

로컬에 미커밋 변경이 없고 원격이 정상이라면:

```bash
git pull --ff-only origin main
```

## 로컬 변경이 있을 때

- `git reset --hard` 금지
- `git checkout .` 금지
- 의미를 확인하지 않은 stash 금지
- 먼저 아래를 확인한다.

```bash
git status
git diff
git diff --staged
```

- 이전 PC에서 남은 정상 작업이면 검토 후 커밋한다.
- 원격과 충돌 가능성이 있으면 파일별로 병합한다.
- 의미를 모르는 변경은 삭제하지 말고 이 문서에 기록한다.

## 작업 완료 전

```bash
git status
git diff --check
```

자동 QA와 대표 페이지 브라우저 QA를 통과한 뒤:

```bash
git add .
git commit -m "Describe the completed Pack Prep Tools work"
git push origin main
```

## 다른 PC에서 이어서 작업할 때

```bash
git pull --ff-only origin main
```

그리고 이 문서의 아래 항목부터 읽는다.

- 현재 상태
- 최근 완료 내역
- 남은 문제
- 다음 작업
- 최근 검증 결과

## 커밋 규칙

- 한 커밋에 관련 없는 작업을 섞지 않는다.
- 임시 파일, 스크린샷, 브라우저 캐시 파일, OS 파일을 커밋하지 않는다.
- 대규모 자동 생성 전 먼저 템플릿 1개를 완성하고 검증한다.
- 작업 종료 시 미커밋 변경을 남기지 않는 것을 원칙으로 한다.
- push가 안 되면 실패 원인을 숨기지 말고 정확한 명령을 남긴다.

---

# 0. 목표 파일 구조

기존 구조가 정상이라면 유지하고, 없을 경우 아래를 기준으로 만든다.

```text
/
├─ index.html
├─ tools/
│  ├─ index.html
│  ├─ dimensional-weight-calculator.html
│  ├─ length-girth-calculator.html
│  ├─ box-size-calculator.html
│  ├─ box-volume-calculator.html
│  ├─ void-fill-calculator.html
│  ├─ bubble-wrap-calculator.html
│  ├─ packing-paper-calculator.html
│  ├─ tape-usage-calculator.html
│  ├─ poly-mailer-size-calculator.html
│  └─ packaging-cost-per-order.html
├─ guides/
│  ├─ index.html
│  ├─ how-to-measure-a-box.html
│  ├─ dimensional-weight-explained.html
│  ├─ choosing-box-clearance.html
│  └─ reducing-packaging-cost.html
├─ reference/
│  ├─ index.html
│  ├─ package-measurement-terms.html
│  ├─ common-packaging-materials.html
│  ├─ dimensional-weight-divisors.html
│  └─ box-dimensions-order.html
├─ about.html
├─ contact.html
├─ privacy.html
├─ 404.html
├─ robots.txt
├─ sitemap.xml
├─ llms.txt
├─ CNAME
├─ handover.md
├─ partials/
│  ├─ header.html
│  └─ footer.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  ├─ components.js
│  │  └─ calculators.js
│  └─ favicon/
│     ├─ favicon.svg
│     └─ favicon.ico
└─ tools-qa/
   ├─ qa.mjs
   ├─ navigation-qa.mjs
   └─ verify-calculations.mjs
```

기존 저장소에 다른 정상 구조가 이미 있으면 무조건 갈아엎지 말고, 목적에 맞게 조정한다.

---

# 0. 디자인 방향

## 핵심 인상

**Packing bench / measurement station / order prep worksheet**

사이트를 열었을 때 일반적인 SaaS 랜딩페이지나 기존 계산기 사이트 복제품이 아니라, 실제 포장 작업대에서 치수와 자재를 정리하는 도구처럼 보여야 한다.

## 시각 요소

- 박스 치수선, 접힘선, 라벨 스티커, 패킹 슬립, 자재 태그에서 영감
- 결과 영역은 작업표 또는 포장 사양서처럼 명확하게 표현
- 장식보다 읽기 쉬운 숫자와 단위가 우선
- 카드마다 과도한 둥근 모서리를 반복하지 않는다.
- 모든 섹션을 똑같은 흰색 카드로 만들지 않는다.
- 헤더 로고 영역은 줄바꿈되거나 눌리지 않게 보호한다.
- 텍스트 로고는 `Pack Prep Tools`로 고정한다.
- `%`, `in`, `cm`, `lb`, `kg`, `ft²` 같은 suffix가 입력값과 다른 줄로 깨지지 않게 한다.

## 반응형 기준

최소 아래 폭에서 직접 확인한다.

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
- footer 링크 누락 없음
- Contact/About/Privacy의 모바일 여백 정상
- 긴 수치와 단위가 화면 밖으로 나가지 않음

---

# 0. Phase 1 — Foundation Build

## 목표

사이트의 디자인, 구조, 계산 로직, SEO, QA 기준을 먼저 확정한다.  
이 단계가 통과되기 전에는 계산기와 문서를 대량 생성하지 않는다.

## 공개 기본 페이지

- Homepage
- Tools hub
- Guides hub
- Reference hub
- About
- Contact
- Privacy
- 404

## 핵심 계산기 10개

### 0. Dimensional Weight Calculator

입력:
- Length
- Width
- Height
- DIM divisor
- Unit system

결과:
- Cubic size
- Dimensional weight
- Rounded billable dimensional weight
- 공식 설명

주의:
- 실제 운임 또는 billable weight를 단정하지 않는다.
- 사용자가 실제 중량과 비교할 수 있는 입력은 추후 또는 현재 단계에서 함께 제공 가능하다.

### 0. Length + Girth Calculator

입력:
- Longest side
- Width
- Height
- Unit

결과:
- Girth = 2 × width + 2 × height
- Length + girth
- 사용자가 넣은 제한값 대비 차이

### 0. Box Size Calculator

입력:
- Product length/width/height
- Clearance per side
- Optional extra allowance

결과:
- Recommended internal box dimensions
- Added volume
- 설명

### 0. Box Volume Calculator

입력:
- Length
- Width
- Height
- Quantity
- Unit

결과:
- Volume per box
- Total volume
- 변환 단위

### 0. Void Fill Calculator

입력:
- Internal box dimensions
- Product dimensions
- Product quantity
- Fill factor 또는 safety factor

결과:
- Empty volume
- Adjusted fill volume
- 결과가 음수일 경우 오류 대신 “product does not fit” 처리

### 0. Bubble Wrap Calculator

입력:
- Product dimensions
- Number of wrap layers
- Overlap allowance
- Quantity

결과:
- Estimated sheet area
- Estimated roll length
- 계산 가정

### 0. Packing Paper Calculator

입력:
- Product 또는 void volume
- Number of units
- Paper density/usage factor
- Waste allowance

결과:
- Estimated paper required
- 결과 범위와 가정

### 0. Tape Usage Calculator

입력:
- Box length
- Box width
- Number of seams
- Extra overlap per seam
- Number of boxes

결과:
- Tape per box
- Total tape
- Estimated roll count

### 0. Poly Mailer Size Calculator

입력:
- Product width
- Product length
- Product depth/thickness
- Closure allowance

결과:
- Recommended minimum flat width
- Recommended minimum flat length
- 실제 제품 형태에 따라 달라질 수 있다는 안내

### 0. Packaging Cost per Order

입력:
- Box or mailer cost
- Void fill cost
- Tape cost
- Label cost
- Insert cost
- Labor minutes
- Hourly labor rate
- Other cost

결과:
- Material cost
- Labor cost
- Total packaging cost per order
- Monthly total based on optional order count

## 계산기 페이지 필수 콘텐츠

각 페이지는 계산 폼만 두지 않는다.

반드시 포함:

1. 명확한 H1
2. 1~2문단의 용도 설명
3. 입력 라벨과 단위
4. 계산 버튼
5. Reset 버튼
6. 결과 요약
7. 공식 또는 계산 방식
8. Worked example
9. 결과 해석
10. Assumptions and limitations
11. 관련 계산기 링크
12. Guide 또는 Reference 링크
13. `Last reviewed` 날짜
14. “estimate only” 안내가 필요한 경우 표시

## 계산 오류 처리

- 빈 값
- 0 또는 음수
- NaN
- Infinity
- 제품이 상자보다 큰 경우
- 지나치게 큰 값
- 단위 전환
- 소수점 반올림
- Reset 후 결과 초기화
- 모바일 숫자 키패드
- suffix 줄바꿈

위 항목을 모두 테스트한다.

---

# 0. Phase 1 Guides / Reference

## Guides 4개

1. How to Measure a Box Correctly
2. Dimensional Weight Explained for Small Sellers
3. How Much Clearance Should Packaging Have?
4. How to Reduce Packaging Cost per Order

## Reference 4개

1. Package Measurement Terms
2. Common Packaging Materials and Uses
3. Dimensional Weight Divisors
4. Box Dimensions: Internal vs External

## 문서 품질 기준

- 검색어를 반복한 얇은 문서 금지
- 각 문서는 독립적인 실용 가치가 있어야 한다.
- 계산기 입력값과 실제 작업 흐름을 연결한다.
- 표, 공식, 예제, 주의사항 중 필요한 요소를 포함한다.
- 출처가 필요한 사실은 공식 또는 신뢰 가능한 출처를 사용한다.
- 특정 정책값은 검토일을 표시한다.
- 다른 프로젝트 문장을 그대로 재사용하지 않는다.

---

# 0. SEO와 공개 페이지 규칙

모든 색인 가능한 HTML에 아래를 적용한다.

- 고유한 `<title>`
- 고유한 meta description
- self-referencing canonical
- 한 개의 명확한 H1
- viewport
- Open Graph title/description/url
- favicon
- GA4
- Header/Footer
- 내부 링크
- 정적 JSON-LD

## 구조화 데이터

계산기:
- `WebApplication`
- `BreadcrumbList`

Guide/Reference:
- `Article` 또는 적절한 문서형 schema
- `BreadcrumbList`

주의:
- 실제 페이지에 없는 평점, 리뷰, 작성자 자격을 꾸며내지 않는다.
- 동적으로 깨지는 JSON-LD보다 정적 JSON-LD를 우선한다.
- 같은 페이지에 중복 schema를 넣지 않는다.

## sitemap

- 색인 가능한 절대 URL만 포함
- 404 제외
- canonical과 URL 일치
- 삭제된 페이지 제거
- 중복 URL 제거

## robots.txt

- 공개 자산과 페이지를 불필요하게 차단하지 않는다.
- sitemap 절대 URL을 포함한다.

## llms.txt

- 사이트 목적
- 주요 도구 허브
- Guide/Reference 허브
- 계산 결과의 한계
- 연락처
- 사이트맵 위치

---

# 0. 공통 Header/Footer 규칙

## Header

필수 메뉴:

- Home
- Tools
- Guides
- Reference
- About

모바일에서 메뉴가 깨지지 않아야 한다.

## Footer

필수 링크:

- Tools
- Guides
- Reference
- About
- Contact
- Privacy

필수 문구:

- 계산 결과는 추정치임
- 실제 운송사, 마켓플레이스, 포장재 제조사 조건 확인 안내
- 저작권 연도
- 브랜드명

## 공통 partial 주의

- Header/Footer partial을 JS로 로드해도 각 HTML의 `<head>` SEO 요소는 페이지별로 정적으로 둔다.
- partial 로딩 실패 시 페이지 전체가 사용할 수 없게 만들지 않는다.
- 상대경로가 루트와 하위 폴더에서 모두 동작하게 한다.
- `file://`가 아니라 GitHub Pages 경로 기준으로 테스트한다.

---

# 0. QA Quality Gate

아래가 모두 통과해야 “완료”라고 보고할 수 있다.

## 자동 QA

- 모든 공개 HTML 파싱 가능
- title 누락 없음
- meta description 누락 없음
- canonical 누락/중복 없음
- H1 누락/중복 없음
- GA4 ID 누락 없음
- 잘못된 GA4 ID 없음
- 중복 ID 없음
- 깨진 내부 링크 없음
- 존재하지 않는 JS/CSS 참조 없음
- JavaScript 문법 오류 없음
- sitemap 누락/중복 없음
- robots.txt와 sitemap 연결 정상
- 404가 sitemap에 없음
- `localhost`, 임시 도메인, 다른 프로젝트 도메인 흔적 없음

## 계산 검증

각 계산기마다 최소:

- 정상값 2개
- 경계값 1개
- 오류값 1개
- 단위 전환이 있으면 양방향 검증
- 공식과 독립적으로 계산한 expected 값 비교

## 브라우저 QA

대표 페이지만 눈으로 보는 것으로 끝내지 않는다.

최소 확인:

- Homepage
- Tools hub
- Guides hub
- Reference hub
- 계산기 10개
- Guide 2개 이상
- Reference 2개 이상
- About
- Contact
- Privacy
- 404

폭:

- 1440
- 1280
- 1024
- 768
- 390

## 완료 금지 조건

아래 중 하나라도 있으면 완료라고 말하지 않는다.

- 계산기 버튼이 반응하지 않음
- 결과가 NaN 또는 Infinity
- suffix 줄바꿈
- 헤더 로고 깨짐
- 모바일 가로 스크롤
- Footer 링크 누락
- About/Contact/Privacy 레이아웃 깨짐
- 다른 프로젝트 도메인 또는 Analytics ID 잔존
- sitemap과 실제 페이지 불일치
- JS 콘솔 오류
- placeholder/lorem ipsum/TODO 잔존
- 얇은 계산기 설명
- 테스트하지 않은 계산 로직

---

# 0. 이전 프로젝트에서 반복된 낭비 방지 규칙

## 0. 디자인 재작업 방지

- 첫 단계에서 색상, 타이포그래피, 간격, 입력, 결과, 버튼, 표, Header/Footer를 확정한다.
- Homepage와 대표 계산기 1개를 먼저 완성한다.
- 390px와 1440px에서 확인한 뒤 나머지 페이지에 확장한다.
- 대량 생성 후 “전부 비슷하다”는 문제를 만들지 않는다.

## 0. 페이지 누락 방지

- Header/Footer 메뉴 목록을 한 번 확정한다.
- 모든 페이지에서 About, Contact, Privacy 접근성을 자동 검사한다.
- 상세 페이지가 허브와 연결되어야 한다.
- orphan page를 허용하지 않는다.

## 0. 잘못된 공통 치환 방지

- 사이트 전체 regex 치환 전 `git diff` 범위를 확인한다.
- 계산기 ID, link href, canonical, JSON-LD는 일괄 치환 후 전수 검사한다.
- 다른 프로젝트 브랜드, 이메일, 도메인, GA4 ID를 검색한다.

검색 예:

```bash
grep -R "G-" .
grep -R "http" --include="*.html" .
grep -R "TODO\|Lorem\|placeholder" .
```

Windows에서는 PowerShell `Select-String` 또는 Node QA 스크립트를 사용해도 된다.

## 0. 계산식 복붙 오류 방지

- 계산기별 입력 ID만 읽는다.
- 공통 함수가 존재하지 않는 DOM 요소를 읽지 않게 한다.
- 계산 공식은 UI 구현과 별도의 검증 스크립트에서 다시 계산한다.
- 단위 변환은 한곳에서 관리한다.

## 0. 캐시 혼동 방지

배포 후 화면이 이상하면 무조건 코드를 다시 고치지 않는다.

먼저 확인:

1. GitHub Actions/Pages 배포 상태
2. 원격 main 커밋
3. 실제 HTTP 응답 바이트
4. Cloudflare 캐시
5. 브라우저 강력 새로고침
6. 시크릿 창

로컬 파일과 배포 파일이 같은지 확인한 후 수정한다.

## 0. 보고만 하고 검증하지 않는 문제 방지

- “PASS”라고 적으려면 실행한 명령과 검사 건수를 남긴다.
- 브라우저 QA는 실제 렌더링한 페이지와 폭을 기록한다.
- 계산 검증은 입력과 expected 결과를 기록한다.
- 커밋 해시와 push 여부를 보고한다.

## 0. 토큰 낭비 방지

- 한 번에 필요 이상으로 페이지를 확장하지 않는다.
- 구조가 확정되기 전 대량 콘텐츠를 만들지 않는다.
- 이미 통과한 영역을 이유 없이 전면 재작성하지 않는다.
- 작업 범위를 벗어난 “추가 개선”을 임의로 하지 않는다.
- 다음 Phase는 현재 Phase의 Quality Gate 통과 후 진행한다.

---

# 0. Phase 로드맵

## Phase 1 — Foundation Build

목표:
- 기본 페이지 8개
- 계산기 10개
- Guide 4개
- Reference 4개
- 공통 디자인/SEO/QA 기반
- 공개 HTML 예상 26개

완료 조건:
- 자동 QA 통과
- 계산 검증 통과
- 5개 반응형 폭 브라우저 QA 통과
- HIGH 위험 0

## Phase 2 — Seller Operations Expansion

후보 계산기:

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

후보 문서:

- Box vs Poly Mailer
- Choosing Void Fill
- Packing Station Workflow
- Packaging Inventory Basics
- Tape Types
- Label Placement Basics

Phase 1 완료 전 시작하지 않는다.

## Phase 3 — Fulfillment and Bulk Prep

후보:

- Pallet layer count
- Cases per pallet
- Pallet height
- Carton cube
- Master carton planning
- Kitting cost
- Bundle packing cost
- Prep batch estimator

주의:
- 팔레트와 운송 관련 계산은 실제 제한조건을 단정하지 않고 사용자 입력 중심으로 설계한다.

## Phase 4 — 운영 데이터 기반 보강

조건:
- GSC와 GA4 데이터가 쌓인 뒤 진행

검토:
- 실제 노출 검색어
- 검색 순위
- 계산 실행률
- 이탈 페이지
- 색인 상태
- thin content
- 내부 링크
- AdSense 준비 상태

데이터 없이 추측만으로 대규모 페이지를 추가하지 않는다.

---

# 0. 현재 상태

## 인프라

- [x] 도메인 확보: `packpreptools.com`
- [x] GitHub 저장소: `https://github.com/canghun13/packpreptools`
- [x] GitHub Pages 기본 세팅
- [x] Cloudflare 기본 세팅
- [x] GA4 측정 ID 확정: `G-XR7JWJ36CD`
- [x] 기본 배포 페이지 존재
- [ ] 저장소 전체 구조 점검
- [ ] 공통 디자인 시스템
- [ ] 기본 페이지
- [ ] 계산기
- [ ] Guides
- [ ] Reference
- [ ] 자동 QA
- [ ] 계산 검증
- [ ] 브라우저 QA
- [ ] sitemap/robots/llms 최종 검증

## 현재 공개 페이지 수

- 미확정 — Codex 첫 작업에서 실제 파일과 배포를 기준으로 집계

## 현재 계산기 수

- 0 또는 미확정 — Codex가 실제 저장소를 확인해 갱신

## 현재 위험

### HIGH
- 없음으로 추정하지만 저장소 점검 전 확정 금지

### MEDIUM
- 기본 배포만 되어 있어 실제 페이지 구조와 SEO 상태 미검증
- GitHub 저장소 remote/branch 상태 미기록

### LOW
- Cloudflare 캐시와 GitHub Pages 배포 지연 가능성

---

# 0. 작업 완료 후 반드시 갱신할 항목

Codex는 매 작업 종료 전에 아래 형식을 유지하여 이 문서를 갱신한다.

## 최근 완료 내역

- 날짜:
- 작업 환경: 회사 / 집 / 기타
- 사용 모델:
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
- 배포 확인:
- 남은 문제:

## 다음 작업

- 정확히 한 단계만 명시
- 권장 모델/강도 표시
- 완료 조건 표시

## 최근 검증 명령

```bash
# 실제 사용한 명령으로 교체
```

## 최근 계산 검증 사례

| Calculator | Input | Expected | Actual | Result |
|---|---|---:|---:|---|
| 예시 | 예시 | 예시 | 예시 | PASS/FAIL |

## 최근 브라우저 QA

| Page | 1440 | 1280 | 1024 | 768 | 390 |
|---|---|---|---|---|---|
| Homepage | - | - | - | - | - |
| Tools hub | - | - | - | - | - |
| Representative calculator | - | - | - | - | - |

---

# 0. 최종 완료 보고 템플릿

```text
Pack Prep Tools 작업 완료 보고

완료 범위:
최종 공개 HTML:
최종 계산기:
Guides:
Reference:

자동 QA:
계산 검증:
브라우저 QA:
콘솔 오류:

커밋:
push:
실배포 확인:

남은 HIGH 위험:
남은 MEDIUM 위험:
남은 LOW 위험:

다음 권장 작업:
권장 모델:
```

---

# 0. 현재 다음 작업

## 작업

**Phase 1 — Foundation Build**

## 권장 모델

**Sol**

## 완료 조건

- 기본 페이지 8개
- 계산기 10개
- Guide 4개
- Reference 4개
- 공통 Header/Footer
- 독립 디자인 시스템
- GA4/SEO/JSON-LD
- robots/sitemap/llms/404
- 자동 QA PASS
- 계산 검증 PASS
- 1440/1280/1024/768/390 브라우저 QA PASS
- HIGH 위험 0
- handover.md 갱신
- commit 및 가능한 경우 push
