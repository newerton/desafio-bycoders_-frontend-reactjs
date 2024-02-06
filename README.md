<h2 align="center">

![ByCoders](https://raw.githubusercontent.com/newerton/images/main/technical-test/bycoders/bycoders.png)

Teste Técnico - Open Meteo

</h2>

## Technology

- NextJs 14 (App Folder)
- Tailwind CSS
- cva, clsx and twMerge
- Dayjs
- Lottie
- React Icons
- React Hook Form
- Zod
- Zustand

## Miscellaneous

- Open Meteo (https://open-meteo.com) (Weather Forecast, Geocoding and Air Quality)
- ArcGIS (https://developers.arcgis.com) (Reverse Geocoding)
- Meteocons (https://bas.dev/work/meteocons)
- usehookts-ts (https://usehooks-ts.com)
- Commitlint (https://github.com/conventional-changelog/commitlint)
- Husky (https://typicode.github.io/husky/)
- Prettier (https://prettier.io/)

## Getting Started

First, rename .env.local.example to .env.local to add API Key

Create a new API key in ArcGIS (https://developers.arcgis.com)

```env
ARCGIS_GEOCODING_API_KEY=Add your key here
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
