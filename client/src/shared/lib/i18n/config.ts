import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const initializeI18n = async () => {
  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: false,
      lng: 'en', // 기본 언어를 명시적으로 설정

      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        requestOptions: {
          cache: 'default',
        },
      },

      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false,
      },

      ns: ['common', 'symptoms'],
      defaultNS: 'common',

      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      },

      // 리소스 프리로딩
      resources: {
        en: {
          common: {
            'navbar.home': 'Home',
            'navbar.translate': 'AI Translation',
            'navbar.first_aid': 'AI First Aid',
            'navbar.hospital_pharmacy_nearby': 'Hospital & Pharmacy Nearby',
            'about.title': 'Why Choose VitalTrip?',
            'about.subtitle':
              'Overcoming language barriers and quickly locating healthcare facilities worldwide',
            'about.hero.tagline': 'Hospital Finder • Medical Translation • AI First Aid',
            'about.hero.description': 'Everything you need for medical emergencies abroad',
            'about.hero.cta_button': 'Find Help Nearby',
            'about.features.google_challenge':
              '2025 Google Asia-Pacific Solution Challenge - Top 10 Finalists',
            'about.features.ai_first_aid.title': 'AI First Aid',
            'about.features.ai_first_aid.description':
              'Get AI-powered emergency response advice and first aid guidance',
            'about.features.smart_translation.title': 'Smart Translation',
            'about.features.smart_translation.description':
              'Translate symptoms and communicate clearly with medical staff',
            'about.features.emergency_locations.title': 'Emergency Locations',
            'about.features.emergency_locations.description':
              'Find nearby hospitals & pharmacies with real-time location data',
            'about.features.support_24_7.title': '24/7 Support',
            'about.features.support_24_7.description':
              'Access travel chatbot and emergency contacts anytime, anywhere',
            'video.title': 'See VitalTrip in Action',
            'video.description': 'Watch how VitalTrip helps travelers in emergency situations',
            'footer.tagline': 'Your essential travel safety companion.',
            'footer.description':
              'Helping travelers handle medical emergencies abroad with confidence.',
            'footer.features_title': 'Features',
            'footer.contact_title': 'Get in Touch',
            'footer.contact_us': 'Contact Us',
            'footer.medical_translation': 'Medical Translation',
            'footer.ai_first_aid_assistant': 'AI First Aid Assistant',
            'footer.copyright': 'VitalTrip. All rights reserved.',
            // Menu 및 Common 번역
            'menu.about_us': 'Home Page',
            'menu.emergency': 'Emergency Call',
            'menu.contact': 'Contact Us',
            submit: 'Submit',
            loading: 'Loading...',
            error: 'Error occurred',
            confirm: 'Confirm',
            cancel: 'Cancel',
            select: 'Select',
            close: 'Close',
          },
          symptoms: {
            'symptoms.title': 'Describe your symptom',
            'symptoms.selectPlaceholder': 'Select symptom',
            'symptoms.detailPlaceholder': 'Describe your symptoms in detail',
            'symptoms.types.BLEEDING': 'Bleeding',
            'symptoms.types.BURNS': 'Burns',
            'symptoms.types.FRACTURE': 'Fracture',
            'symptoms.types.ALLERGIC_REACTION': 'Allergic Reaction',
            'symptoms.types.SEIZURE': 'Seizure',
            'symptoms.types.HEATSTROKE': 'Heatstroke',
            'symptoms.types.HYPOTHERMIA': 'Hypothermia',
            'symptoms.types.POISONING': 'Poisoning',
            'symptoms.types.BREATHING_DIFFICULTY': 'Breathing Difficulty',
            'symptoms.types.ANIMAL_BITE': 'Animal Bite',
            'symptoms.types.FALL_INJURY': 'Fall Injury',
          },
        },
        ko: {
          common: {
            'navbar.home': '홈',
            'navbar.translate': 'AI 번역',
            'navbar.first_aid': 'AI 응급처치',
            'navbar.hospital_pharmacy_nearby': '병원 & 약국 찾기',
            'about.title': '왜 VitalTrip을 선택해야 할까요?',
            'about.subtitle': '언어 장벽을 극복하고 전 세계 의료 시설을 빠르게 찾아보세요',
            'about.hero.tagline': '병원 찾기 • 의료 번역 • AI 응급처치',
            'about.hero.description': '해외 의료 응급상황에 필요한 모든 것',
            'about.hero.cta_button': '근처 도움 찾기',
            'about.features.google_challenge':
              '2025 구글 아시아-태평양 솔루션 챌린지 - 상위 10개 팀 진출',
            'about.features.ai_first_aid.title': 'AI 응급처치',
            'about.features.ai_first_aid.description':
              'AI 기반 응급 대응 조언 및 응급처치 가이드 제공',
            'about.features.smart_translation.title': '스마트 번역',
            'about.features.smart_translation.description':
              '증상을 번역하고 의료진과 명확하게 소통하세요',
            'about.features.emergency_locations.title': '응급 위치',
            'about.features.emergency_locations.description':
              '실시간 위치 데이터로 근처 병원 및 약국을 찾아보세요',
            'about.features.support_24_7.title': '24시간 지원',
            'about.features.support_24_7.description':
              '언제 어디서나 여행 챗봇 및 응급 연락처에 접근하세요',
            'video.title': 'VitalTrip 실제 화면 보기',
            'video.description':
              'VitalTrip이 여행자들의 응급상황에서 어떻게 도움이 되는지 시청하세요',
            'footer.tagline': '필수적인 여행 안전 동반자입니다.',
            'footer.description':
              '해외 의료 응급상황에서 여행자들이 자신감 있게 대처할 수 있도록 도움을 드립니다.',
            'footer.features_title': '기능',
            'footer.contact_title': '문의하기',
            'footer.contact_us': '만나기',
            'footer.medical_translation': '의료 번역',
            'footer.ai_first_aid_assistant': 'AI 응급처치 도우미',
            'footer.copyright': 'VitalTrip. 모든 권리 보유.',
            // Menu 및 Common 번역
            'menu.about_us': '홈페이지',
            'menu.emergency': '응급 전화',
            'menu.contact': '문의하기',
            submit: '제출',
            loading: '로딩 중...',
            error: '오류가 발생했습니다',
            confirm: '확인',
            cancel: '취소',
            select: '선택',
            close: '닫기',
          },
          symptoms: {
            'symptoms.title': '증상을 설명해주세요',
            'symptoms.selectPlaceholder': '증상 선택',
            'symptoms.detailPlaceholder': '증상을 자세히 설명해주세요',
            'symptoms.types.BLEEDING': '출혈',
            'symptoms.types.BURNS': '화상',
            'symptoms.types.FRACTURE': '골절',
            'symptoms.types.ALLERGIC_REACTION': '알레르기 반응',
            'symptoms.types.SEIZURE': '발작',
            'symptoms.types.HEATSTROKE': '열사병',
            'symptoms.types.HYPOTHERMIA': '저체온증',
            'symptoms.types.POISONING': '중독',
            'symptoms.types.BREATHING_DIFFICULTY': '호흡곤란',
            'symptoms.types.ANIMAL_BITE': '동물 교상',
            'symptoms.types.FALL_INJURY': '낙상 부상',
          },
        },
      },
    });

  // 현재 언어의 리소스 미리 로드
  const currentLang = i18n.language || 'en';
  await i18n.loadLanguages([currentLang, 'en', 'ko']);
};

initializeI18n().catch(console.error);

export { i18n };
