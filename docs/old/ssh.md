> 서버 재실행
```bash
ssh root@1.231.118.201 -p2224  # ssh 접속, pw: IlmacRoot9(
cd ~  # root 디렉토리로 이동
vi .bashrc  # .bashrc 확인
source .bashrc  # .bashrc 실행
```


> ~/.bashrc
```
# ssh start on boot
service ssh start
cd /home/MoonDev/servers
# uvicorn server_bid_notice:app --reload --host=0.0.0.0 --port=8001
uvicorn server_mysql:app --reload --host=0.0.0.0 --port=8002
service cron restart
```

host	1.231.118.201
host	1.231.118.217
port	2306
user	root
password	mysqlIlmac1!
database	Bid
