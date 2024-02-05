import { LogoAndName } from '@/components/ui/logo';

export interface PageHeaderLogoProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PageHeaderLogo = ({ ...props }) => {
  return <LogoAndName {...props} />;
};
