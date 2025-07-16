import React, { useEffect, useState } from 'react';

export const useGoogleMapSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (!autocompleteService && window.google?.maps?.places) {
      const newService = new google.maps.places.AutocompleteService();
      setAutocompleteService(newService);
    }

    if (searchTerm && autocompleteService) {
      autocompleteService.getPlacePredictions(
        {
          input: searchTerm,
          language: 'en',
        },
        (predictions) => {
          if (predictions) setSuggestions(predictions);
        },
      );
    } else if (!searchTerm) {
      setSuggestions([]);
    }
  }, [searchTerm, autocompleteService]);

  return { searchTerm, setSearchTerm, suggestions, setSuggestions };
};
