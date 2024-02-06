'use client';

import { useState } from 'react';

import { AutoCompleteGeocoding } from '@/components/fields/autocomplete-gecoding';
import { FormSearchByCoordinates } from '@/components/forms/search-by-coordinates';

export const ToggleSearchForms = () => {
  const [searchByCoordinates, setSearchByCoordinates] =
    useState<boolean>(false);

  const handleSearchByCoordinates = () => {
    setSearchByCoordinates((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!searchByCoordinates && <AutoCompleteGeocoding />}
      {searchByCoordinates && <FormSearchByCoordinates />}

      <div onClick={handleSearchByCoordinates} className="cursor-pointer">
        {searchByCoordinates
          ? 'Search by city or place'
          : 'Search by coordinates'}
      </div>
    </div>
  );
};
