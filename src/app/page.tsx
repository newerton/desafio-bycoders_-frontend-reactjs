import { ForecastList } from '@/components/forecast/forecast-list';
import { ToggleSearchForms } from '@/components/miscellaneous/toggle-search-forms';
import { Cloud } from '@/components/ui/cloud';

export default function Home() {
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <Cloud.Root left>
          <Cloud.Item
            left
            clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          />
        </Cloud.Root>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Global Weather Insights
            </h1>
            <p className="mb-10 text-lg leading-8 text-gray-600">
              Discover the weather in any city or location with our easy-to-use
              search bar.
            </p>
            <ToggleSearchForms />
          </div>
        </div>
        <Cloud.Root right>
          <Cloud.Item
            right
            clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          />
        </Cloud.Root>
        <ForecastList />
      </div>
    </>
  );
}
