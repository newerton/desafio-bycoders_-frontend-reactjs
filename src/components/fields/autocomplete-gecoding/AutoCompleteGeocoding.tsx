import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { Skeleton } from '@/components/animations/skeleton';
import { GeocodingList } from '@/components/geocoding/geocoding-list';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks';
import { useGetGeocodingList } from '@/services/gecoding';

export const AutoCompleteGeocoding = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string | null>(value, 500);

  const { data, isFetching } = useGetGeocodingList(debouncedValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClearAll = useCallback(() => {
    setValue('');
  }, []);

  useEffect(() => {
    if (debouncedValue === '') {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  }, [debouncedValue, handleClearAll]);

  return (
    <>
      <Input
        name="search"
        onChange={handleChange}
        placeholder="Search for a city or place"
        disabled={isFetching}
        autoComplete="off"
        ref={inputRef}
      />
      {isFetching && (
        <Skeleton.Root>
          <Skeleton.Item size="xl" />
        </Skeleton.Root>
      )}

      {data && data.length > 0 && (
        <GeocodingList.Root>
          <div
            className="flex justify-end w-full p-2 cursor-pointer"
            onClick={handleClearAll}
          >
            <IoMdClose size={20} />
          </div>
          {data?.map((item) => (
            <GeocodingList.Item key={item.id} item={item}>
              <div className="flex items-center gap-2">
                <GeocodingList.Image code={item.country_code} />
                <GeocodingList.Label
                  city={item.name}
                  state={item.admin1 || item.admin2}
                  country={item.country}
                />
              </div>
            </GeocodingList.Item>
          ))}
        </GeocodingList.Root>
      )}
    </>
  );
};
