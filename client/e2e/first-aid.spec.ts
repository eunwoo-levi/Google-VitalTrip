import { test, expect } from '@playwright/test';
import { setupPage, mockAuthAPIs } from './helpers/mock';

test.describe('AI 응급처치 (First Aid)', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await page.goto('/first-aid');
  });

  test('헤더 및 타이틀 표시', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toContainText('AI First Aid');
  });

  test('VitalTrip 로고 클릭 - 홈으로 이동', async ({ page }) => {
    await page.locator('header a[href="/"]').click();
    await expect(page).toHaveURL('/');
  });

  test('페이지 레이아웃 렌더링', async ({ page }) => {
    // div.min-h-screen이 여러 개일 수 있으므로 .first() 사용
    await expect(page.locator('div.min-h-screen').first()).toBeVisible();
  });

  test('인터랙션 가능한 요소 존재', async ({ page }) => {
    const interactiveElements = page.locator('button, input, textarea');
    expect(await interactiveElements.count()).toBeGreaterThan(0);
  });
});
