import { httpServer } from '@/src/shared/utils/httpServer';
import { EncyclopediaItem } from '../types';

export async function fetchEncyclopedia(): Promise<EncyclopediaItem[]> {
  try {
    const res = await httpServer.get<EncyclopediaItem[] | { data: EncyclopediaItem[] }>(
      '/encyclopedia',
      { next: { revalidate: 86400 } },
    );
    return Array.isArray(res) ? res : (res.data ?? []);
  } catch {
    return [];
  }
}
