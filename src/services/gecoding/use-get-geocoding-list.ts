import { useQuery } from '@tanstack/react-query';

import { type GeocodingListResponse, getGeocodingList } from '.';

export const useGetGeocodingList = (name: string | null) => {
  const query = useQuery<GeocodingListResponse[]>({
    queryKey: ['geocoding', name],
    queryFn: async () => getGeocodingList(name),
    refetchOnWindowFocus: false,
    initialData: [],
    enabled: !!name,
  });

  return query;
};
