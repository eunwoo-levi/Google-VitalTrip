export interface TravelAlertItem {
  alarm_lvl: string;
  continent_cd: string;
  continent_eng_nm: string;
  continent_nm: string;
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  dang_map_download_url: string;
  flag_download_url: string;
  map_download_url: string;
  org_country_idx: string;
  region_ty: string;
  remark: string;
  written_dt: string | null;
}

export interface TravelAlertApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: TravelAlertItem[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
      currentCount: number;
    };
  };
}

export const ALARM_LEVEL = {
  '1': {
    label: '여행유의',
    color: 'blue',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  '2': {
    label: '여행자제',
    color: 'yellow',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
  },
  '3': {
    label: '출국권고',
    color: 'orange',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
  },
  '4': {
    label: '여행금지',
    color: 'red',
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
  },
} as const;
