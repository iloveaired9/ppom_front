import { chromium } from 'playwright';
import * as fs from 'fs';

/**
 * 뽐뿌 모바일 사이트의 다크모드 분석
 * m.ppomppu.co.kr의 현재 디자인과 색상을 캡처하고 분석합니다.
 */

async function analyzePpomppu() {
  const browser = await chromium.launch({
    headless: false, // 브라우저 표시
  });

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }, // 모바일 뷰포트 (iPhone)
  });

  console.log('\n🌐 뽐뿌 모바일 사이트에 접속 중...\n');

  try {
    // 뽐뿌 사이트 접속
    await page.goto('https://m.ppomppu.co.kr/', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    console.log('✅ 페이지 로드 완료\n');

    // 현재 다크모드 상태 확인
    const htmlClass = await page.locator('html').getAttribute('class');
    const htmlDataTheme = await page.locator('html').getAttribute('data-theme');

    console.log('📋 현재 상태:');
    console.log(`   HTML class: ${htmlClass || '없음'}`);
    console.log(`   data-theme: ${htmlDataTheme || '없음'}\n`);

    // CSS 변수 추출
    console.log('🎨 CSS 변수 분석 중...\n');

    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      const vars: Record<string, string> = {};

      // CSS 변수 모두 추출
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        if (prop.startsWith('--')) {
          vars[prop] = style.getPropertyValue(prop).trim();
        }
      }

      return vars;
    });

    console.log(`발견된 CSS 변수: ${Object.keys(cssVars).length}개`);
    if (Object.keys(cssVars).length > 0) {
      Object.entries(cssVars)
        .slice(0, 15)
        .forEach(([key, value]) => {
          console.log(`   ${key}: ${value}`);
        });
      if (Object.keys(cssVars).length > 15) {
        console.log(`   ... 외 ${Object.keys(cssVars).length - 15}개\n`);
      } else {
        console.log();
      }
    } else {
      console.log('   (CSS 변수 없음)\n');
    }

    // 배경색, 텍스트색 추출
    console.log('🎨 주요 색상 추출 중...\n');

    const colors = await page.evaluate(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const bodyColor = window.getComputedStyle(document.body).color;

      // 헤더 색상
      const header = document.querySelector('header') || document.querySelector('[role="banner"]');
      const headerBg = header ? window.getComputedStyle(header).backgroundColor : 'N/A';

      // 첫 번째 섹션/카드
      const section = document.querySelector('section') || document.querySelector('.card') || document.querySelector('[class*="container"]');
      const sectionBg = section ? window.getComputedStyle(section).backgroundColor : 'N/A';

      // 링크 색상
      const link = document.querySelector('a');
      const linkColor = link ? window.getComputedStyle(link).color : 'N/A';

      // 버튼 색상
      const button = document.querySelector('button');
      const buttonBg = button ? window.getComputedStyle(button).backgroundColor : 'N/A';

      return {
        body: { background: bodyBg, text: bodyColor },
        header: headerBg,
        section: sectionBg,
        link: linkColor,
        button: buttonBg,
      };
    });

    console.log('추출된 색상:');
    console.log(`   Body BG:      ${colors.body.background}`);
    console.log(`   Body Text:    ${colors.body.text}`);
    console.log(`   Header BG:    ${colors.header}`);
    console.log(`   Section BG:   ${colors.section}`);
    console.log(`   Link Color:   ${colors.link}`);
    console.log(`   Button BG:    ${colors.button}\n`);

    // 스크린샷 1: 현재 라이트 모드
    console.log('📸 라이트 모드 스크린샷 저장 중...\n');
    await page.screenshot({
      path: 'ppomppu-light.png',
      fullPage: true,
    });
    console.log('✅ 저장: ppomppu-light.png\n');

    // 다크모드 활성화 시도
    console.log('🌙 다크모드 활성화 시도 중...\n');

    try {
      // 1. 클래스 추가
      await page.evaluate(() => {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.colorScheme = 'dark';
      });
      console.log('✓ 다크모드 클래스 및 속성 적용\n');
    } catch (e) {
      console.log('✗ 다크모드 적용 실패\n');
    }

    await page.waitForTimeout(1000);

    // 스크린샷 2: 다크모드 시뮬레이션
    console.log('📸 다크모드 스크린샷 저장 중...\n');
    await page.screenshot({
      path: 'ppomppu-dark.png',
      fullPage: true,
    });
    console.log('✅ 저장: ppomppu-dark.png\n');

    // HTML 구조 분석
    console.log('📝 HTML 구조 분석 중...\n');

    const htmlStructure = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        lang: root.getAttribute('lang'),
        classes: root.className,
        dataAttributes: Array.from(root.attributes)
          .filter(attr => attr.name.startsWith('data-'))
          .map(attr => `${attr.name}="${attr.value}"`),
        head: {
          metaColorScheme: document.querySelector('meta[name="color-scheme"]')?.getAttribute('content'),
          metaThemeColor: document.querySelector('meta[name="theme-color"]')?.getAttribute('content'),
        },
        styleSheets: document.styleSheets.length,
      };
    });

    console.log('HTML 구조:');
    console.log(`   언어: ${htmlStructure.lang}`);
    console.log(`   클래스: ${htmlStructure.classes || '없음'}`);
    console.log(`   Data 속성: ${htmlStructure.dataAttributes.join(', ') || '없음'}`);
    console.log(`   color-scheme meta: ${htmlStructure.head.metaColorScheme || '없음'}`);
    console.log(`   theme-color meta: ${htmlStructure.head.metaThemeColor || '없음'}`);
    console.log(`   스타일시트: ${htmlStructure.styleSheets}개\n`);

    // 분석 결과 저장
    const report = {
      timestamp: new Date().toISOString(),
      url: 'm.ppomppu.co.kr',
      viewport: { width: 390, height: 844 },
      lightMode: {
        colors,
        htmlClass,
        htmlDataTheme,
      },
      darkModeSupport: {
        cssVariablesCount: Object.keys(cssVars).length,
        hasDarkClass: (await page.locator('html').getAttribute('class'))?.includes('dark'),
        hasDataTheme: !!(await page.locator('html').getAttribute('data-theme')),
      },
      htmlStructure,
    };

    fs.writeFileSync('ppomppu-analysis.json', JSON.stringify(report, null, 2));
    console.log('✅ 분석 결과 저장: ppomppu-analysis.json\n');

    console.log('═'.repeat(60));
    console.log('🎉 분석 완료!\n');
    console.log('생성된 파일:');
    console.log('  • ppomppu-light.png       (라이트 모드 스크린샷)');
    console.log('  • ppomppu-dark.png        (다크모드 시뮬레이션)');
    console.log('  • ppomppu-analysis.json   (상세 분석 결과)\n');
    console.log('브라우저를 닫으려면 아무 키나 누르세요...\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }

  // 사용자가 확인하도록 대기
  await page.waitForTimeout(5000);
  await browser.close();
}

// 실행
analyzePpomppu().catch(console.error);
