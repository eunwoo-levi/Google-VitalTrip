export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  sourceName: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  page: number;
  pageSize: number;
}

export interface NewsQueryParams {
  page?: number;
  pageSize?: number;
  country?: string;
}
