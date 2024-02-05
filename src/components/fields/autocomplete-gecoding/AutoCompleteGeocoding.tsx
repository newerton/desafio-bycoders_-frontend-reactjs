import Image from 'next/image';
import { useCallback, useState } from 'react';

import { Skeleton } from '@/components/animations/skeleton';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks';
import { GeocodingListResponse } from '@/services/gecoding';
import { useGetGeocodingList } from '@/services/gecoding/use-get-geocoding-list';

export const AutoCompleteGeocoding = () => {
  const [value, setValue] = useState<string | null>(null);
  const debouncedValue = useDebounce<string | null>(value, 500);

  const { data, isFetching, isLoading } = useGetGeocodingList(debouncedValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAdd = useCallback((item: GeocodingListResponse) => {
    console.log({ item });
  }, []);

  return (
    <>
      <Input
        name="search"
        onChange={handleChange}
        placeholder="Search for a city or place"
        disabled={isFetching}
        autoComplete="off"
      />
      {isFetching && (
        <Skeleton.Root>
          <Skeleton.Item size="xl" />
        </Skeleton.Root>
      )}

      {data && data.length > 0 && (
        <div className="flex flex-col text-left w-full border-2 border-stone-100 shadow-md p-3 gap-3">
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex hover:bg-stone-100 p-2 rounded-md cursor-pointer justify-between items-center"
              onClick={() => handleAdd(item)}
            >
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={`https://open-meteo.com/images/country-flags/${item.country_code.toLocaleLowerCase()}.svg`}
                    alt={item.country_code}
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  {item.name}, {item.admin1 ? `${item.admin1},` : ''}{' '}
                  {!item.admin1 && item.admin2 ? `${item.admin2},` : ''}{' '}
                  {item.country}
                </div>
              </div>
              <div className="text-blue-400">Add</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
