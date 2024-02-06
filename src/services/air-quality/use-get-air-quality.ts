import { useQuery } from '@tanstack/react-query';

import { AirQualityResponse, getAirQuality } from '.';

type UseGetAirQualityProps = {
  latitude: string | null;
  longitude: string | null;
};

export const useGetAirQuality = ({
  latitude,
  longitude,
}: UseGetAirQualityProps) => {
  const query = useQuery<AirQualityResponse>({
    queryKey: ['geocoding', { latitude, longitude }],
    queryFn: async () => getAirQuality({ latitude, longitude }),
    refetchOnWindowFocus: false,
    enabled: !!latitude && !!longitude,
  });

  return query;
};
