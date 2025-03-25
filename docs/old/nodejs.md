Playwright 브라우저를 설치해야 합니다. 다음 명령어들을 순서대로 실행해주세요:

1. Playwright 브라우저 설치:
```bash
npx playwright install chromium
```

2. 만약 Docker나 Linux 환경에서 추가 의존성이 필요한 경우:
```bash
# Ubuntu/Debian
apt-get update
apt-get install -y libglib2.0-0 libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libdbus-1-3 libxcb1 libxkbcommon0 libx11-6 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2 libatspi2.0-0
```

3. 또는 Playwright의 의존성 설치 스크립트 사용:
```bash
npx playwright install-deps chromium
```

4. 그리고 나서 다시 실행:
```bash
node scraper/bid.js
```

또한 headless 모드 설정을 명시적으로 변경해보겠습니다:

```javascript:servers/nodejs/scraper/bid.js
// ... existing code ...
export const fetchListPages = async (names, save = true) => {
  const browser = await chromium.launch({ 
    headless: HEADLESS,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
// ... rest of the code ...
```
이렇게 수정하면:
1. 브라우저가 sandbox 없이 실행되어 권한 문제를 피할 수 있습니다
2. Docker나 root 환경에서도 실행이 가능해집니다

만약 여전히 문제가 있다면, 다음 사항을 확인해주세요:
1. Node.js 버전이 최신인지
2. Playwright가 제대로 설치되었는지
3. 시스템에 필요한 의존성이 모두 설치되었는지
