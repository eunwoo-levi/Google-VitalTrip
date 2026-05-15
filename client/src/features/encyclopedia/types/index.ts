export interface EncyclopediaItem {
  id: string;
  name: string;
  synonyms: string[];
  icdCode: string;
}

export type CategoryKey =
  | 'all'
  | 'infectious'
  | 'cardiovascular'
  | 'respiratory'
  | 'digestive'
  | 'neurological'
  | 'injury'
  | 'other';

export const CATEGORY_COLORS: Record<CategoryKey, string> = {
  all: '',
  infectious: 'bg-emerald-100 text-emerald-700',
  cardiovascular: 'bg-red-100 text-red-700',
  respiratory: 'bg-sky-100 text-sky-700',
  digestive: 'bg-orange-100 text-orange-700',
  neurological: 'bg-violet-100 text-violet-700',
  injury: 'bg-amber-100 text-amber-700',
  other: 'bg-gray-100 text-gray-500',
};

export const CATEGORY_BORDER: Record<Exclude<CategoryKey, 'all'>, string> = {
  infectious: 'border-l-emerald-400',
  cardiovascular: 'border-l-red-400',
  respiratory: 'border-l-sky-400',
  digestive: 'border-l-orange-400',
  neurological: 'border-l-violet-400',
  injury: 'border-l-amber-400',
  other: 'border-l-gray-300',
};

export const CATEGORY_ICONS: Record<CategoryKey, string> = {
  all: '🏥',
  infectious: '🦠',
  cardiovascular: '❤️',
  respiratory: '🫁',
  digestive: '🫀',
  neurological: '🧠',
  injury: '🩹',
  other: '📋',
};

export function getCategory(icdCode?: string): Exclude<CategoryKey, 'all'> {
  if (!icdCode) return 'other';
  const num = parseInt(icdCode);
  if (isNaN(num)) return 'other';
  if (num >= 1 && num <= 139) return 'infectious';
  if (num >= 320 && num <= 389) return 'neurological';
  if (num >= 390 && num <= 459) return 'cardiovascular';
  if (num >= 460 && num <= 519) return 'respiratory';
  if (num >= 520 && num <= 579) return 'digestive';
  if (num >= 800 && num <= 999) return 'injury';
  return 'other';
}
