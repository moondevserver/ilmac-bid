# TODO

## 공통

[X] upsert 제대로 되지 않음(nid가 같아도 insert 됨)
  - primary key가 nid를 포함한 복수개인 경우 upsert가 제대로 되지 않음(primary key들이 모두 같은 값을 가져야 update가 됨)
  - autoincrement인 경우, 무조건 primary key에 포함되어야 함

[ ] error log, scraping log

## fetch list

## fetch detail

[X] 조달청 파일 확장자, image에서 추출
    ```python
    # name이 '조달청'인 경우 elements에 추가
    {"key": "ext", "xpath": '//*[@id="frm"]/table/tbody/tr/td/div[3]/a[not(@target)]', "target": 'src'}

    # 요소 스크랩후 처리
    f_exts = [f_ext.split(";")[0].split("images/")[1].split(".")[0] for f_ext in f_exts]
    rst["파일이름"] = SEPERATOR.join([f"{f_name}.{f_exts[i]}" for (i, f_name) in enumerate(f_names)])
    del rst["ext"]
    ```

## download files
[X] download 예정 nids
   ```python
   nids = [r[0] for r in mysql.fetch("SELECT `nid`  FROM details  WHERE nid > (SELECT MAX(`nid`) FROM files) AND `파일주소` != '';")]
   ```

[ ] `파일이름`, `파일주소` 개수가 다른 경우 처리

# BUG

## fetch detail
### 게시물 사라짐
> 479: 인천 부평구청	https://www.icbp.go.kr/main/eminwon/eminwonAnnounceDetail.do?mgt_no=36688&listsz=50&pgno=2
안전점검 수행기관 지정 공고: 
> 904: 인천서구청	https://www.seo.incheon.kr/open_content/main/bbs/bbsMsgDetail.do?msg_seq=36799&listsz=50&bcd=gosi&pgno=2
https://www.seo.incheon.kr/open_content/main/bbs/bbsMsgDetail.do?msg_seq=36640&listsz=50&bcd=gosi&pgno=3
건설공사(건축분야) 안전점검 수행기관 지정 공고(백석동 한들구역 14블럭 1로트) 게시물 사라짐


## download file

### 강화군청(1), 조달청(25) SSL Error
> Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:997)')))

> https://stackoverflow.com/questions/71170255/max-retries-exceeded-with-url-error-while-running-the-code

```python
from urllib3.exceptions import InsecureRequestWarning
from urllib3 import disable_warnings

disable_warnings(InsecureRequestWarning)

response = requests.get(url, verify=False)
````

