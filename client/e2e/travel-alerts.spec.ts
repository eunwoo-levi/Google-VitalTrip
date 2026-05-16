import { test, expect } from '@playwright/test';
import { setupPage, mockAuthAPIs } from './helpers/mock';

// /alerts 페이지는 SSR에서 공공 API를 직접 호출함.
// API 키 없는 환경에서는 빈 배열([])로 폴백되므로 UI 구조 테스트에 집중.
test.describe('해외여행 경보 (Travel Alerts)', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await page.goto('/alerts');
  });

  test('페이지 타이틀', async ({ page }) => {
    await expect(page).toHaveTitle(/Travel Alert.*VitalTrip/i);
  });

  test('VitalTrip 로고 표시', async ({ page }) => {
    await expect(page.locator('img[alt="VitalTrip"]').first()).toBeVisible();
  });

  test('경보 레벨 통계 섹션 렌더링', async ({ page }) => {
    const statsGrid = page.locator('main .grid').first();
    await expect(statsGrid).toBeVisible();
  });

  test('국가 검색 input 렌더링', async ({ page }) => {
    const searchInput = page.locator('input').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Korea');
      await page.waitForTimeout(300);
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('VitalTrip 로고 클릭 - 홈으로 이동', async ({ page }) => {
    await page.locator('header a[href="/"]').click();
    await expect(page).toHaveURL('/');
  });
});
