import { ForwardedRef, forwardRef } from 'react';
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

import { Input } from '@/components/ui/input';

type ControlledTextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    error: string | undefined;
  };

export const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  ...props
}: ControlledTextFieldProps<T>) => {
  return (
    <Controller
      render={({ field }) => <Input {...field} {...props} />}
      control={control}
      name={name}
    />
  );
};
