import { httpServer } from '@/src/shared/utils/httpServer';
import { NewsQueryParams, NewsResponse } from '../types';

// ISR 전용 함수
export async function fetchMedicalNewsSSR({
  page = 1,
  pageSize = 10,
  country = 'us',
}: NewsQueryParams = {}): Promise<NewsResponse> {
  const response = await httpServer.get<{
    message: string;
    data: {
      articles: NewsResponse['articles'];
      totalResults: number;
      page: number;
      pageSize: number;
    };
  }>(`/news/headlines?page=${page}&pageSize=${pageSize}&country=${country}`);

  return response.data;
}
