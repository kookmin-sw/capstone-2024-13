# Secure

## Index

1. [Abstract](#abstract)

2. [Content](#content)

- [Threat Modeling](#1-threat-modeling)

- [Vulnerability Assessment](#2-vulnerability-assessment)

- [Apply Security Techniques](#3-apply-Security-Techniques)

3. [Report Link](#report-link)

## 1. Abstract

최근 몇 년 동안 웹 애플리케이션을 대상으로 한 사이버 보안 사건의 빈도와 심각성이 크게 증가했다.

대표적인 사례로는 2021년 발생한 Log4j 취약점이 있다. 공격자들이 널리 사용되는 로깅 라이브러리의 치명적인 결함을 악용하여 전 세계 수많은 웹 애플리케이션에서 심각한 보안 침해를 일으켰다. 이 사건은 웹 애플리케이션 취약점이 초래할 수 있는 광범위한 위험을 보여주었고, 강력한 보안 조치의 필요성을 더욱 강조했다.

보안의 주요 목적은 웹 애플리케이션을 사이버 공격으로부터 사전에 보호하여 허가되지 않은 접근, 사용, 공개, 손상, 변경, 파괴 등으로부터 보호함으로써 무결성, 기밀성, 가용성을 제공하는 것이다.

서비스의 전체적인 보안 태세를 강화하고, 더 안전한 사용자 경험을 제공하며, 웹 애플리케이션에 대한 신뢰를 유지하고자 "아니 근데 오늘 진짜"에서는 위협 모델링, 취약점 진단 그리고 보안 기법 적용이라는 크게 세 가지 프로세스를 진행했다.

위협 모델링은 우리 웹 애플리케이션에 특화된 잠재적 위협을 식별하고 이에 맞는 방어책을 설계하는 데 도움을 준다. 취약점 진단은 모의 해킹과 소스 코드 분석을 포함하여 보안 취약점을 탐지하고 이를 악용하기 전에 해결할 수 있게 한다. 이런 취약점 진단 결과를 바탕으로 완화 방안을 적용하고, 동일한 취약점이 다시 발생하지 않도록 재점검해 보안을 강화하기 위해 보안 기법을 적용한다.

## 2. Content

### 1. Threat Modeling

위협 모델링은 애플리케이션 아키텍처에서 발생할 수 있는 취약점을 사전에 식별하는 방법이다. 여기에는 애플리케이션을 다이어그램화하고, 보안 결함을 식별하고, 이러한 결함을 완화하는 작업이 포함된다.

"아니 근데 오늘 진짜" 프로젝트 서비스 대상으로는 OWASP top 10의 기준과 STRIDE Framework를 기반으로 위협 모델링을 진행했다.

### 2. Vulnerability Assessment

- Source Code Analysis

  - using tool : [Sourcecode_Security_Staticanalysis](/secure/tools/Sourcecode_Security_Staticanalysis/)
  - Scanning like this
    - MongoDB 쿼리 및 인증 문제 검사: MongoDB 쿼리 또는 인증 관련 코드를 찾아, 보안 문제가 발생할 수 있는 부분을 찾는다.
    - Nosql Injection 검사: NoSQL 쿼리에서 발생할 수 있는 인젝션 공격을 찾아, 보안 문제가 발생할 수 있는 부분을 찾는다.
    - 미사용 변수 검사: 선언되었지만 사용되지 않는 변수를 찾는다.
    - 매직 넘버 검사: 코드 내에서 직접 사용된 숫자 리터럴(상수)를 찾는다.
    - 암시적 any 검사: 명시적인 타입 선언 없이 파라미터가 any 타입으로 암시적으로 사용되는 경우를 찾는다.

- Prompt Injection

  - Prompt Injection은 해커나 악의적인 공격자가 AI 모델의 입력 값을 조작하여 모델이 의도하지 않은 결과를 반환하도록 유도하는 공격 기법이다. 이를 통해서 공격자는 모델의 보안성을 악용하여 사용자 데이터를 유출하거나 또는 학습된 모델의 결과를 왜곡시키는 것이 가능하다. 심각한 경우로 이어진다고 가정할 때, Prompt에 들어간 데이터가 출력에 직접 노출되거나 큰 영향을 주는 경우들도 발생 가능하다.
  - 본 서비스에서는 User Input으로 기존에 설정되어 있던 챗봇 테마를 변경할 수 있는 기능이 확인되었다.

- IDOR Vulnerability

  - IDOR(Insecure Direct Object Reference) 취약점은 부적절한 인가 취약점으로 수평적/수직적 권한 상승이 발생하고, 이를 통해서 타 사용자 정보에 접근해 유출하거나 기존 권한으로는 사용이 불가능한 기능을 이용하는 문제가 생긴다.
  - 본 서비스에서는 인가되지 말아야 할 각 diary에 할당되는 Mongodb object_id 값을 URL 상에서 검색을 통해 조회가 가능한 것을 발견되었으며 또한, 인가되지 말아야 할 각 POST /diary/find 에서 본인의 album_id가 아닌 다른 사용자의 album_id에 해당하는 값을 request 값으로 보내게 되면, 앨범 내에 있는 모든 일기들을 response에서 확인이 가능한 것이 발견되었다.

- Nosql Injection

  - Nosql Injection 취약점은 SQL을 사용하는 것으로 알려진 DBMS를 제외한 나머지 Database에 대한 Injection 공격이다. 일반적으로 NoSQL 데이터베이스는 기존 SQL 데이터베이스보다 consistency check가 느슨하다. NoSQL 데이터베이스는 relational constraints와 consistency check를 덜 요구하기 때문에 성능이나 확장에서의 이점이 크지만 SQL 문법이 아닌 각각의 시스템의 쿼리 문법 등에 대한 Injection 공격은 동일하게 영향을 받는다.

  - 이 프로젝트에서는 MongoDB query를 input 값으로 Request를 진행하는데 이 때, Input으로 MongoDB query의 검증 처리가 되지 않아서, $ne, $where 같은 query 문을 request의 body에 포함시켜 서비스 전체 사용자 정보들을 response로 받아볼 수 있었고, 악의적으로 시간 지연 공격이 가능하다는 것이 발견되었다.

### 3. Apply Security Techniques

#### Apply mitigations for vulnerabilities

- Prompt Injection

  - 사용자의 입력에 의해서 프롬프트 템플릿 역할이 변경되지 않도록 전처리 과정이 필요하다고 분석하였고, 의심이 가는 메세지들을 전처리 하는 방법과, 챗봇 테마의 origin을 대화가 길어지게 될 때 변질될 수 있는 방법을 해결하기 위해 테마 템플릿을 재업데이트 해주는 방법 적용.
  - [#41에서 해결](#https://github.com/kookmin-sw/capstone-2024-13/issues/41)

- IDOR Vulnerability

  - diary에도 private, public 값을 부여하여 private diary는 다른 계정에서 access가 되지 않도록 수정하는 방법을 택해야 한다고 판단했다.

  - /album/album-objectId/diary/diary-objectId와 /search/diary/diary-objectId의 실제 URL 경로에서 다른 계정에서의 access를 제한하도록 수정되도록 대응책을 적용했다.

  - 임시 대응 방법으로는 “$in” 연산자를 제한을 두어 접근을 막도록 하는 방법을 생각했고 적용했다.

  - 향후 더 보안을 신경쓰기 위해서는 API Endpoint의 세분화를 통해 filter를 input으로 못 주도록 하는 방법으로 개선이 필요하다고 판단했다.

  - [#135에서 해결](https://github.com/kookmin-sw/capstone-2024-13/issues/135)
  - [#203에서 해결](https://github.com/kookmin-sw/capstone-2024-13/issues/203)

- Nosql Injection
  - 악의적인 목적의 NoSQL query가 삽입되지 않도록 “$where”와 같은 mongoDB query 연산자에 대한 검증이 필요하다고 분석하였고 해당 사항 적용예정
  - [#209에서 확인 가능](https://github.com/kookmin-sw/capstone-2024-13/issues/209)

#### Configure and Test Secure Elements

[1] 인증서 비교 로직

[Secure - Get certification with cerbot](https://github.com/kookmin-sw/capstone-2024-13/pull/35)

[2] Nginx Dos 방어 설정

[Secure - Mitigating DDoS Attacks with NGINX](https://github.com/kookmin-sw/capstone-2024-13/pull/211)

[3] Test from DDoS

[using tools : siege](https://github.com/JoeDog/siege)

Result of Test :
`siege -c100 -t1M -d3 you-know-what.com`

| Evalution metrics        | value            |
| ------------------------ | ---------------- |
| Transactions:            | 30811 hits       |
| Availability:            | 99.19 %          |
| Elapsed time:            | 60.97 secs       |
| Data transferred:        | 380.10 MB        |
| Response time:           | 0.07 secs        |
| Transaction rate:        | 505.35 trans/sec |
| Throughput:              | 6.23 MB/sec      |
| Concurrency:             | 36.22            |
| Successful transactions: | 30914            |
| Failed transactions:     | 252              |
| Longest transaction:     | 13.24            |
| Shortest transaction:    | 0.00             |

## 3. Report Link

### [1. Threat model Report](https://drive.google.com/file/d/1_M_HGPTJpAWiBZSFz0EwUGlkzua3zC6C/view?usp=sharing)

### [2. Prompt Injection Report](https://drive.google.com/file/d/1GaM7Vr_xan0lFXuunMo1kiprSSjJbHqr/view?usp=sharing)

### [3. IDOR Vulnerability Report](https://docs.google.com/document/d/12aGYJWLGO6YeE_dsFN0KugB3qvCrr_uT/edit?usp=sharing&ouid=114149362994510103571&rtpof=true&sd=true)

### [4. IDOR & Nosql Injection Vulnerability Report](https://drive.google.com/file/d/1hplFxoQeR_FSKbp1-79JUZCHUD7Dc944/view?usp=sharing)
