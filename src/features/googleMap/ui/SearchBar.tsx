'use client';

import React, { useEffect, useState } from 'react';
import { searchPlaceAndMove } from '../utils/searchPlaceAndMove';

export default function SearchBar({
  service,
  mapInstance,
}: {
  service: google.maps.places.PlacesService | null;
  mapInstance: google.maps.Map | null;
}) {
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

  const handleSearch = (query: string) => {
    if (!query || !service || !mapInstance) return;
    setSearchTerm(query);
    setSuggestions([]);
    searchPlaceAndMove({ service, mapInstance, query });
  };

  return (
    <div className='absolute top-15 left-1/2 z-10 w-[300px] -translate-x-1/2 transform rounded-md bg-white p-2 shadow-lg'>
      <div className='flex'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(searchTerm);
          }}
          placeholder='Search a place'
          className='w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none'
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          className='rounded-r-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
        >
          Search
        </button>
      </div>

      {/* 자동완성 추천어 리스트 */}
      {suggestions.length > 0 && (
        <ul className='mt-1 max-h-40 overflow-auto rounded-md border border-gray-200 bg-white text-sm shadow-md'>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSearch(suggestion.description)}
              className='cursor-pointer px-3 py-2 hover:bg-gray-100'
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
