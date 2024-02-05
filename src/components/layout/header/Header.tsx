import { PageHeader } from '@/components/miscellaneous/page-header';

const navigation = [{ name: 'Home', href: '/' }];

export const Header = () => {
  return (
    <PageHeader.Root>
      <PageHeader.Nav>
        <PageHeader.Logo />
      </PageHeader.Nav>
    </PageHeader.Root>
  );
};
