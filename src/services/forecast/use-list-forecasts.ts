import { useQuery } from '@tanstack/react-query';

import { ForecastsProps, useForecastsStore } from '@/stores';

export const useListForecasts = () => {
  const { forecasts } = useForecastsStore();

  const query = useQuery<ForecastsProps[]>({
    queryKey: ['list-forecasts'],
    queryFn: () => forecasts,
  });

  return query;
};
