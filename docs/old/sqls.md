# * SELECT 예시

## left join
```sql
SELECT
    notices.기관명,
    notices.제목,
    notices.상세페이지주소,
    details.파일이름,
    details.파일주소,
    files.sn,
    files.파일이름,
    files.파일주소
FROM notices
LEFT JOIN details ON notices.nid = details.nid
LEFT JOIN files ON notices.nid = files.nid
WHERE
    notices.nid = '1509'
ORDER BY files.sn ASC;
```

## left join2
SELECT
    notices.nid,
    notices.작성일,
    notices.기관명,
    details.공고번호,
    notices.제목,
    notices.상세페이지주소,
    files.sn + 1,
    files.파일이름,
    files.파일주소
FROM details
LEFT JOIN notices ON notices.nid = details.nid
LEFT JOIN files ON details.nid = files.nid
WHERE notices.작성일 > '2023-03-01'
ORDER BY details.nid ASC, files.sn ASC;

# * left join3
SELECT
    notices.nid,
    notices.작성일,
    notices.기관명,
    details.공고번호,
    notices.제목,
    notices.상세페이지주소,
    files.sn + 1,
    files.파일이름,
    files.파일주소
FROM details
LEFT JOIN notices ON notices.nid = details.nid
LEFT JOIN files ON details.nid = files.nid
WHERE notices.nid IN (167, 241, 598)
ORDER BY details.nid ASC, files.sn ASC;

# * left join2(details에는 없는 항목(details에 insert되지 않은 항목))
SELECT notices.nid, notices.기관명
FROM notices
LEFT OUTER JOIN details
ON notices.nid=details.nid
WHERE notices.작성일 > '2023-04-01' AND details.nid IS NULL
ORDER BY notices.nid ASC;

SELECT notices.nid, notices.기관명
FROM notices
LEFT OUTER JOIN details
ON notices.nid=details.nid
WHERE notices.작성일 > '2023-03-31' AND details.nid IS NULL;


# * multiple table
SELECT
    notices.기관명,
    notices.상세페이지주소,
    details.공고번호,
    details.담당부서,
    files.sn,
    files.파일이름,
    files.파일주소
FROM notices, details, files
WHERE
    notices.nid = '1509' AND
    details.did = '112' AND
    files.nid = '1';

** TEST 중
SELECT
    notices.nid,
    notices.기관명,
    files.sn,
    files.파일이름,
    files.파일주소,
    details.공고번호,
    notices.제목,
    notices.상세페이지주소,
    notices.작성일
FROM notices
LEFT JOIN details ON notices.nid = details.nid
LEFT JOIN files ON notices.nid = files.nid
WHERE notices.nid = (SELECT `nid` FROM details);

# ** 검색어
SELECT `검색어`
FROM settings_keyword
WHERE `use`=true AND `검색타입`='포함'
ORDER BY `sn` DESC
LIMIT 1

SELECT `검색어`
FROM settings_keyword
WHERE `use`=true AND `검색타입`='배제'
ORDER BY `sn` DESC
LIMIT 1;

**  equals Multiple values
SELECT * FROM posts WHERE userid IN (44,44,33,44,33,0)

# ALTER

## 컬럼 추가
ALTER TABLE [테이블명] ADD [새컬럼명] 자료형 # 맨 뒤에
ALTER TABLE `테이블명` ADD `새컬럼명` 자료형 FIRST # 맨 앞에
ALTER TABLE [테이블명] ADD [새컬럼명] 자료형 AFTER [앞컬럼명] # [앞컬럼명] 뒤에
ALTER TABLE details ADD `기관명` varchar(20)
ALTER TABLE settings_list ADD `작성자` varchar(20) AFTER `작성일`

## primary key 추가

ALTER TABLE `DB명`.`테이블명` ADD PRIMARY KEY (`컬럼명`, `컬럼명`);
ex) ALTER TABLE `calorie`.`COMMENT` ADD PRIMARY KEY(`ID`, `Date`);

## primary key 삭제


ALTER TABLE `DB명`.`테이블명` DROP PRIMARY KEY;
ex) ALTER TABLE `calorie`.`COMMENT` DROP PRIMARY KEY;

## primary key 수정 ( 삭제와 동시에 추가 )

ALTER TABLE `DB명`.`테이블명` DROP PRIMARY KEY, ADD PRIMARY KEY (`ID`, `Date`);
ex) ALTER TABLE `calorie`.`COMMENT` DROP PRIMARY KEY, ADD PRIMARY KEY (`ID`, `Date`);

# UPDATE
## update replace
UPDATE _settings_detail SET `파일이름` = REPLACE(`파일이름`, '@#', '|-'), `파일주소` = REPLACE(`파일주소`, '@#', '|-'), `담당부서` = REPLACE(`담당부서`, '@#', '|-'), `작성자` = REPLACE(`작성자`, '@#', '|-');

    