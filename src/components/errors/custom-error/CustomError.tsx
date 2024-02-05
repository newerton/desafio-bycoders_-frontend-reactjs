import { PiWarningCircle } from 'react-icons/pi';

export const CustomError = ({ errorText }: any) => {
  return (
    <span className="flex gap-1 text-sm text-red-500 items-center">
      <span className="w-4">
        <PiWarningCircle color="red" size={16} />
      </span>
      <span>{errorText}</span>
    </span>
  );
};
