export interface EncyclopediaItem {
  id: number;
  title: string;
  altTitles: string[];
  summary: string;
  categories: string[];
  url: string;
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

export function getCategory(categories: string[]): Exclude<CategoryKey, 'all'> {
  const text = categories.join(' ').toLowerCase();
  if (/infect|virus|bacteria|parasit|fungal/.test(text)) return 'infectious';
  if (/heart|cardio|vascular|blood pressure|artery|vein/.test(text)) return 'cardiovascular';
  if (/lung|respirat|breath|pulmon|airway/.test(text)) return 'respiratory';
  if (/digest|stomach|bowel|intestin|liver|gastr/.test(text)) return 'digestive';
  if (/brain|nerve|neural|mental|psychiatric|psycho/.test(text)) return 'neurological';
  if (/injur|wound|fracture|burn|trauma/.test(text)) return 'injury';
  return 'other';
}
