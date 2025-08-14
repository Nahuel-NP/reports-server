import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { cmToPoints } from 'src/helpers/cmToPoint.helper';

export const getCountriesReport = (): TDocumentDefinitions => {
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: 'Countries Report',
      subtitle: 'List of countries',
      showLogo: true,
      showDate: true,
    }),
    pageSize: 'A4',
    pageMargins: [cmToPoints(2.5), cmToPoints(4), cmToPoints(1), cmToPoints(0)],
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 100, '*'],
          body: [
            ['Country', 'Code', 'Population', 'Area'],
            ['Argentina', 'ARG', 45000000, 2780000],
            [
              { text: 'Bolivia', bold: true, alignment: 'center' },
              'BOL',
              11000000,
              1100000,
            ],
          ],
        },
      },
    ],
  };
};
