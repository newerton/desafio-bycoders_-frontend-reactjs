import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef, useCallback, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { updateForecast } from '@/services/forecast';
import { useForecastsStore } from '@/stores';

const forecastCardButtonsActionsVariants = cva('flex', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardButtonsActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardButtonsActionsVariants> {
  geocoding_id: string;
}

const ForecastCardButtonsActions = forwardRef<
  HTMLDivElement,
  ForecastCardButtonsActionsProps
>(({ className, geocoding_id, ...props }, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    findForecast,
    removeForecast,
    updateForecast: updateForecastStore,
  } = useForecastsStore();

  const handleUpdate = useCallback(
    async (id: string) => {
      setLoading(true);
      const forecast = findForecast(id);
      if (forecast) {
        const updateForecastResponse = await updateForecast({
          id,
          latitude: forecast.geocoding.latitude.toString(),
          longitude: forecast.geocoding.longitude.toString(),
        });
        if (updateForecastResponse) {
          updateForecastStore(id, updateForecastResponse);
        }
      }
      setLoading(false);
    },
    [findForecast, updateForecastStore],
  );

  return (
    <div
      className={cn(
        forecastCardButtonsActionsVariants({
          className,
        }),
      )}
      ref={ref}
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleUpdate(geocoding_id)}
        loading={loading}
      >
        Update
      </Button>
      <div
        className="flex justify-end w-full p-2 cursor-pointer"
        onClick={() => removeForecast(geocoding_id)}
      >
        <IoMdClose size={20} />
      </div>
    </div>
  );
});

ForecastCardButtonsActions.displayName = 'ForecastCardButtonsActions';

export { ForecastCardButtonsActions, forecastCardButtonsActionsVariants };
