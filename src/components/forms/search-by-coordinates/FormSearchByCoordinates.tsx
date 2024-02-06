import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ControlledTextField } from '@/components/fields/controlled-text-field';
import { Button } from '@/components/ui/button';
import { ForecastProps, getForecast } from '@/services/forecast';

const FormLatitudeLongitude = z.object({
  latitude: z.string().min(1, { message: 'Latitude is required' }),
  longitude: z.string().min(1, { message: 'Longitude is required' }),
});

type FormLatitudeLongitudeSchema = z.infer<typeof FormLatitudeLongitude>;

export const FormSearchByCoordinates = () => {
  const mutation = useMutation({
    mutationFn: (data: ForecastProps) => {
      return getForecast(data);
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
        placeholder="longitude"
        autoComplete="off"
      />
      <Button onClick={handleSubmit(onSubmit)} size="lg">
        Search
      </Button>
    </div>
  );
};
