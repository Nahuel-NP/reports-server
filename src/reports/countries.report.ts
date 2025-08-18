import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}
export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const {
    title = 'Countries Report',
    subtitle = 'List of countries',
    countries,
  } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title,
      subtitle,
      showLogo: true,
      showDate: true,
    }),
    footer: footerSection,
    pageSize: 'A4',
    pageMargins: [
      cmToPoints(2.5),
      cmToPoints(4),
      cmToPoints(1),
      cmToPoints(1.5),
    ],
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2 ? country.iso2 : '',
              country.iso3 ? country.iso3 : '',
              { text: country.name ? country.name : '', bold: true },
              country.continent ? country.continent : '',
              country.local_name ? country.local_name : '',
            ]),
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          fontSize: 16,
          bold: true,
          alignment: 'left',
        },
        margin: [0, cmToPoints(1), 0, 0],
      },
      {
        layout: 'noBorders',
        table: {
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            [
              {
                text: 'Total de paises',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${countries.length} paises`,
                bold: true,
                colSpan: 2,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
