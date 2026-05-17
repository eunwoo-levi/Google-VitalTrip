import { httpServer } from '@/src/shared/utils/httpServer';
import { EncyclopediaItem } from '../types';

interface RawItem {
  id: number;
  title: string;
  altTitles?: string[];
  summary?: string;
  categories?: string[];
  url?: string;
}

interface ApiResponse {
  message: string;
  data: {
    total: number;
    items: RawItem[];
  };
}

function mapItems(items: RawItem[]): EncyclopediaItem[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    altTitles: item.altTitles ?? [],
    summary: item.summary ?? '',
    categories: item.categories ?? [],
    url: item.url ?? '',
  }));
}

export async function fetchEncyclopedia(): Promise<{ total: number; items: EncyclopediaItem[] }> {
  try {
    const res = await httpServer.get<ApiResponse>('/encyclopedia', {
      next: { revalidate: 86400 },
    });
    return { total: res.data.total, items: mapItems(res.data.items) };
  } catch {
    return { total: 0, items: [] };
  }
}

export async function fetchEncyclopediaPage(params: {
  search?: string;
  offset?: number;
  limit?: number;
}): Promise<{ total: number; items: EncyclopediaItem[] }> {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set('search', params.search);
  if (params.offset !== undefined) searchParams.set('offset', String(params.offset));
  if (params.limit !== undefined) searchParams.set('limit', String(params.limit));

  try {
    const res = await fetch(`/api/encyclopedia?${searchParams}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: ApiResponse = await res.json();
    return { total: json.data.total, items: mapItems(json.data.items) };
  } catch {
    return { total: 0, items: [] };
  }
}
