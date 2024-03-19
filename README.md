# Course-api

This is a simple course api using nestjs and typeorm.

## Installation

### Docker 설치

```bash
$ brew cask install docker
```

### 패키지 설치

```bash
$ pnpm install
```

## Running

### 로컬 실행

```bash
$ docker-compose up -d
$ yarn start
```

## Test

```bash

yarn test

```

## Feature

- 모노레포
- 기능형 패키징
    - course
    - instructor
- 계층
    - controller, service, repository
- 도메인 모델 패턴
    - rich domain
- 공통 모듈 (libs)
    - mailer
        - aws localstack
    - logger
        - 횡단 관심사 분리
    - web-client
        - 추상화
        - 팩토리 메서드 패턴
        - 빌더 패턴
- 테스트
    - e2e
    - integration
    - unit
