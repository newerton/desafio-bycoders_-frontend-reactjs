import { PageHeader } from '@/components/miscellaneous/page-header';

const navigation = [{ name: 'Home', href: '/' }];

export const Header = () => {
  return (
    <PageHeader.Root>
      <PageHeader.Nav>
        <PageHeader.Logo />
        <PageHeader.Drawer navigation={navigation} />
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <PageHeader.Item
              key={item.name}
              href={item.href}
              name={item.name}
            />
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end" />
      </PageHeader.Nav>
    </PageHeader.Root>
  );
};
