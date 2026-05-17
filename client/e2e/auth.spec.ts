import { test, expect } from '@playwright/test';
import { setupPage, mockAuthAPIs } from './helpers/mock';

test.describe('인증 플로우', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await mockAuthAPIs(page);
  });

  test('로그인 페이지 렌더링', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveTitle(/Login.*VitalTrip/i);
    // 로그인 페이지에 VitalTrip Logo 이미지가 있음 (LanguageSelectionModal에도 동일 alt가 있어 .first() 사용)
    await expect(page.locator('img[alt="VitalTrip Logo"]').first()).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Login');
  });

  test('로그인 - 빈 폼 제출 시 버튼 비활성화', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('로그인 - 잘못된 자격증명 에러 표시', async ({ page }) => {
    await page.goto('/login');

    // 패스워드 정책(소문자+숫자+특수문자 조합)을 만족해야 버튼이 활성화됨
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'WrongPass1!');
    await page.click('button[type="submit"]');

    await expect(page.locator('p.text-red-600').first()).toBeVisible({ timeout: 10_000 });
  });

  test('로그인 페이지 - 회원가입 링크 클릭', async ({ page }) => {
    await page.goto('/login');

    await page.click('a[href="/signup"]');
    await expect(page).toHaveURL('/signup');
  });

  test('회원가입 페이지 렌더링', async ({ page }) => {
    await page.goto('/signup');

    await expect(page).toHaveTitle(/Sign Up.*VitalTrip/i);
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#passwordConfirm')).toBeVisible();
  });

  test('회원가입 - 비밀번호 불일치 시 Continue 버튼 비활성화', async ({ page }) => {
    await page.goto('/signup');

    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'Password1!');
    await page.fill('#passwordConfirm', 'DifferentPass1!');

    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('회원가입 - 로그인 페이지 이동 링크', async ({ page }) => {
    await page.goto('/signup');

    await page.click('a[href="/login"]');
    await expect(page).toHaveURL('/login');
  });

  test('회원가입 - step1 정상 입력 시 Continue 활성화', async ({ page }) => {
    await page.goto('/signup');

    await page.fill('#email', 'newuser@example.com');
    await page.fill('#password', 'Password1!');
    await page.fill('#passwordConfirm', 'Password1!');

    await expect(page.locator('button[type="submit"]')).toBeEnabled({ timeout: 5_000 });
  });
});
