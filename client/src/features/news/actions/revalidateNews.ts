'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateNews(page?: number) {
  try {
    if (page) {
      revalidateTag(`news-page-${page}`);
      return {
        success: true,
        message: `News page ${page} revalidated successfully`,
      };
    } else {
      revalidateTag('medical-news');
      return {
        success: true,
        message: 'All medical news revalidated successfully',
      };
    }
  } catch (error) {
    console.error('Revalidation error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to revalidate',
    };
  }
}
