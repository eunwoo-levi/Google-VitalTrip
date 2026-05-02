'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import { useEffect, useState } from 'react';

export const useGoogleMapSearch = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (!autocompleteService && window.google?.maps?.places) {
      setAutocompleteService(new google.maps.places.AutocompleteService());
    }

    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    if (!autocompleteService) return;

    const timer = setTimeout(() => {
      autocompleteService.getPlacePredictions(
        { input: searchTerm, language: i18n.language || 'en' },
        (predictions) => {
          if (predictions) setSuggestions(predictions);
        },
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, autocompleteService, i18n.language]);

  return { searchTerm, setSearchTerm, suggestions, setSuggestions };
};
