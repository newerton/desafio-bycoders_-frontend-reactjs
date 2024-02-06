import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ControlledTextField } from '@/components/fields/controlled-text-field';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { generateUniqueHash } from '@/libs/utils/math';
import { AirQualityResponse, getAirQuality } from '@/services/air-quality';
import {
  ForecastProps,
  ForecastResponse,
  getForecast,
} from '@/services/forecast';
import { GeocodingResponse, getGeocoding } from '@/services/gecoding';
import { GeoCodingStore, useForecastsStore } from '@/stores';

const FormLatitudeLongitude = z.object({
  latitude: z.string().min(1, { message: 'Latitude is required' }),
  longitude: z.string().min(1, { message: 'Longitude is required' }),
});

type FormLatitudeLongitudeSchema = z.infer<typeof FormLatitudeLongitude>;

export const FormSearchByCoordinates = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { addForecast, findForecast } = useForecastsStore();

  const mutation = useMutation({
    mutationFn: (data: ForecastProps) => {
      const geocodingResult = getGeocoding(data);
      const forecastResult = getForecast(data);
      const airQualityResult = getAirQuality(data);

      return Promise.all([geocodingResult, forecastResult, airQualityResult]);
    },
    onSuccess: async ([geocodingData, forecastData, airQualityData]: [
      GeocodingResponse,
      ForecastResponse,
      AirQualityResponse,
    ]) => {
      let prepareGeocodingData: GeoCodingStore = {
        id: generateUniqueHash(
          `${geocodingData.address.City},${geocodingData.address.Region}`,
        ),
        city: geocodingData.address.City,
        state: geocodingData.address.Region,
        country: geocodingData.address.CntryName,
        country_code: geocodingData.address.CountryCode.substring(0, 2),
        latitude: geocodingData.location.y,
        longitude: geocodingData.location.x,
        timestamp: new Date().toISOString(),
        timezone: 'America/Sao_Paulo',
      };

      if (geocodingData.address.Addr_type === 'POI') {
        prepareGeocodingData = {
          id: generateUniqueHash(
            `${geocodingData.address.PlaceName},${geocodingData.address.Type}`,
          ),
          city: geocodingData.address.PlaceName,
          state: geocodingData.address.Type,
          country: geocodingData.address.Type,
          country_code: geocodingData.address.Type.substring(0, 2),
          latitude: geocodingData.location.y,
          longitude: geocodingData.location.x,
          timestamp: new Date().toISOString(),
          timezone: 'America/Sao_Paulo',
        };
      }

      const geoCodingExists = findForecast(prepareGeocodingData.id);
      if (geoCodingExists) {
        setError('Already added!');
      }

      addForecast({
        geocoding: prepareGeocodingData,
        forecast: forecastData,
        airQuality: airQualityData,
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLatitudeLongitudeSchema>({
    resolver: zodResolver(FormLatitudeLongitude),
    defaultValues: {
      latitude: undefined,
      longitude: undefined,
    },
  });

  const onSubmit = useCallback(
    async (data: FormLatitudeLongitudeSchema) =>
      mutation.mutate({ latitude: data.latitude, longitude: data.longitude }),
    [mutation],
  );

  return (
    <>
      {error && <Alert variant="error">{error}</Alert>}
      <div className="flex gap-4">
        <ControlledTextField<FormLatitudeLongitudeSchema>
          name="latitude"
          control={control}
          error={errors.latitude?.message}
          placeholder="Latitude"
          autoComplete="off"
        />
        <ControlledTextField<FormLatitudeLongitudeSchema>
          name="longitude"
          control={control}
          error={errors.longitude?.message}
          placeholder="Longitude"
          autoComplete="off"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          size="lg"
          loading={mutation.isPending}
        >
          Add
        </Button>
      </div>
    </>
  );
};
