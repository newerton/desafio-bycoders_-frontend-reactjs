import { useQuery } from '@tanstack/react-query';

import { ForecastResponse, getForecast } from '.';

type UseGetForecastProps = {
  latitude: string | null;
  longitude: string | null;
};

export const useGetForecast = ({
  latitude,
  longitude,
}: UseGetForecastProps) => {
  const query = useQuery<ForecastResponse>({
    queryKey: ['geocoding', { latitude, longitude }],
    queryFn: async () => getForecast({ latitude, longitude }),
    refetchOnWindowFocus: false,
    enabled: !!latitude && !!longitude,
  });

  return query;
};
