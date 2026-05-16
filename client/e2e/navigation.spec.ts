import { test, expect } from '@playwright/test';
import { setupPage, mockAuthAPIs, mockEncyclopediaAPI } from './helpers/mock';

test.describe('네비게이션', () => {
  test('홈 페이지 접근', async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  test('Navbar 렌더링 (encyclopedia 페이지)', async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await mockEncyclopediaAPI(page);
    await page.goto('/encyclopedia');

    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav a[href="/"]').first()).toBeVisible();
  });

  test('Navbar - Translate 링크 이동', async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await mockEncyclopediaAPI(page);
    await page.goto('/encyclopedia');

    await page.locator('nav a[href="/translate"]').click();
    await expect(page).toHaveURL('/translate');
  });

  test('Navbar - First Aid 링크 이동', async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await mockEncyclopediaAPI(page);
    await page.goto('/encyclopedia');

    await page.locator('nav a[href="/first-aid"]').click();
    await expect(page).toHaveURL('/first-aid');
  });

  test('로그인 페이지 로고 클릭 - 홈으로 이동', async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
    await page.goto('/login');

    await page.locator('a[href="/"] img[alt="VitalTrip Logo"]').first().click();
    await expect(page).toHaveURL('/');
  });
});
