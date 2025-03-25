- 현재 아래(### 현재 서비스 개요)와 같이 2개의 docker(python, mysql)와 googlesheets로 서비스되고 있는 입찰 공고 관리 시스템을,
- nextjs + db docker 구현하려고 해요.

## 문의 사항
- nextjs와 db는 별도의 docker로 구현하는 게 좋을까요?
- db는 sqlite or mysql or postgreSQL 중 어떤 게 좋을까요?

---

## 현재 서비스
  - 스크래핑:
    - selenium 사용
    - `src/app/api/scraping`에서 구현
    - 개별 사이트별 스크래핑이 가능하도록 하고, 스크래핑이 정상적인지 테스트할 수 있도록
    - 자동(예약) 스크래핑 구현
  - googlesheets에서 하고 있는 역할은 `src/app/[pageN]`(frontend)에서 대체
    - 대시보드(통계/에러(스크래핑, 서버)/신규 목록)
    - 공고 목록/상세/편집/이동(카테고리 변경)
    - 설정(스크래핑 사이트 추가/편집/테스트, 사용자 관리)
    - 입찰 관리(진행 예정 입찰 / 진행중(입찰/낙찰.탈락) 입찰
- tech stack
  - nextjs
  - frontend: shadcn
  - backend: postgreSQL / prisma, graphql / selenium

---

## 참고 코드

### 현재 서비스 코드
- python(현재 서비스중중): `/volume1/docker/servers/ilmac-bid/servers/python`
- script(현재 사용중중): `/volume1/docker/servers/ilmac-bid/script`

### 리팩토링 코드
- javascript(backend): `/volume1/docker/servers/ilmac-bid/servers/nodejs`
- typescript(frontend): `/volume1/docker/servers/ilmac-bid/servers/nextjs`


---

## 현재 서비스 개요
- ubuntu docker
  - python
    - 입찰 공고 사이트 게시판에서 입찰 공고 목록들 스크래핑(Playwright)
  - ~/.bashrc
    - 1일 2회 전체 사이트 스크래핑 및 DB 저장
    ```
    service cron restart
    ```
    - mysql 데이터 출력 web service
    ```
    if ! lsof -i:8002 ; then
      nohup uvicorn server_mysql:app --reload --host=0.0.0.0 --port=8002 > output.log 2>&1 &
    fi
    ```

- mysql docker
  - 스크래핑 데이터 저장: notices
  - 스크래핑 설정: settings_list
  - 공고 카테고리 분류 키워드: settings_keyword

- googlesheets
  - 전체 스크래핑 목록 보기
  - 카테고리별 입찰 공고 목록 보기
  - 입찰 공고 스크래핑 통계 보기(일별/주별)
  - 스크래핑 설정 편집
  - 분류 키워드 편집


---

## Code Guidelines

### TypeScript Guidelines
- Code AREA 표시
  - Import AREA
  - Functions AREA
  - Export AREA
- type에 `any` 사용 가능
- arrow function 사용
- 함수 개별적으로 export 하지 않고, 파일 하단에 모아서, `export { fun1, fun2, fun3, ... }`
- index.ts 가 있는 경우, 폴더 내의 다른 함수들은 모두 index.ts 에서 export
- type 파일은 모두 `src/types.ts` 파일에 일괄 저장

### Naming Conventions
  - Use camelCase for functions and variables
  - Use UPPER_CASE for constants
  - Use kebab-case for file names

### Documentation
- Add JSDoc comments for functions
- Add usage examples in comments