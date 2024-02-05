import { Logo } from '.';

export const LogoAndName = () => {
  return (
    <div className="flex items-center gap-4 lg:flex-1">
      <span className="sr-only">Weather Channel</span>
      <Logo />
      <div className="font-semibold">Weather Channel</div>
    </div>
  );
};
