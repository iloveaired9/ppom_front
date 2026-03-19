import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('뽐뿌 NEW 페이지 로드 중...');
  await page.goto('https://m.ppomppu.co.kr/new/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // 페이지 내용 추출
  const html = await page.content();
  const pageUrl = page.url();

  console.log('✓ 페이지 로드 완료');

  // 스크린샷 캡처
  await page.screenshot({
    path: path.join(__dirname, '../public/ppomppu-new-original.png'),
    fullPage: true
  });
  console.log('✓ 원본 스크린샷 저장');

  // 다크모드 적용된 스크린샷
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.screenshot({
    path: path.join(__dirname, '../public/ppomppu-new-dark.png'),
    fullPage: true
  });
  console.log('✓ 다크모드 스크린샷 저장');

  // HTML 저장
  fs.writeFileSync(
    path.join(__dirname, '../public/ppomppu-new-original.html'),
    html,
    'utf-8'
  );
  console.log('✓ 원본 HTML 저장');

  // 페이지 구조 분석
  const structure = await page.evaluate(() => {
    const getElementInfo = (el, depth = 0) => {
      if (depth > 8) return null;

      const children = [];
      for (let child of el.children) {
        const childInfo = getElementInfo(child, depth + 1);
        if (childInfo) children.push(childInfo);
      }

      return {
        tag: el.tagName.toLowerCase(),
        class: el.className,
        id: el.id,
        text: el.textContent.substring(0, 100),
        children: children.slice(0, 10)
      };
    };

    return {
      title: document.title,
      url: document.location.href,
      structure: getElementInfo(document.body),
      styles: Array.from(document.styleSheets)
        .filter(sheet => !sheet.href || sheet.href.includes('ppomppu'))
        .map(sheet => ({
          href: sheet.href,
          rules: sheet.cssRules ? sheet.cssRules.length : 0
        }))
    };
  });

  fs.writeFileSync(
    path.join(__dirname, '../public/ppomppu-structure.json'),
    JSON.stringify(structure, null, 2),
    'utf-8'
  );
  console.log('✓ 페이지 구조 분석 완료');

  await browser.close();
  console.log('\n✅ 모든 데이터 수집 완료!');
})();
