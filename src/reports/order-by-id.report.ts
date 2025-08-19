import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { DateFormatter } from 'src/helpers/date-formatter.helper';
import { footerSection } from './sections/footer.section';
import { CurrencyFormatter } from 'src/helpers/currency-formatter';

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [cmToPoints(0.5), cmToPoints(1.4), 0, cmToPoints(1)],
  },
};
const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: cmToPoints(4),
};
export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: {
      columns: [logo],
      margin: [cmToPoints(2), cmToPoints(1), cmToPoints(0), cmToPoints(0)],
    },
    footer: footerSection,
    pageMargins: [cmToPoints(2), cmToPoints(1), cmToPoints(2), cmToPoints(2)],
    content: [
      {
        text: 'Tucan code',
        style: 'header',
      },
      {
        columns: [
          {
            text: 'Calle falsa 123, Puerto Vilelas\nChaco, ARGENTINA.\nCUIT: 20-12312312-1\nhttps://pedroso-nahuel.vercel.app/',
          },
          {
            text: [
              { text: 'Recibo no. #123123', bold: true, fontSize: 14 },
              `\n${DateFormatter.getFormattedDate(new Date())}\nConsumidor final`,
            ],
            alignment: 'right',
          },
        ],
      },
      {
        qr: 'https://pedroso-nahuel.vercel.app/',
        fit: 100,
        alignment: 'right',
        margin: [0, cmToPoints(0.5)],
      },
      {
        text: [
          {
            text: 'Cobrar a:\n',
            bold: true,
          },
          `Razon social: Ejemplo
           CUIT: 20-12312312-1
           Domicilio: calle falsa 123, Puerto Vilelas
           Chaco, ARGENTINA.`,
        ],
        marginBottom: cmToPoints(1),
      },
      {
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Subtotal'],
            [
              '1',
              'Descripción',
              '1',
              '1',
              {
                text: CurrencyFormatter.formatCurrency(100),
                alignment: 'right',
              },
            ],
            [
              '2',
              'Descripción',
              '1',
              '1',
              {
                text: CurrencyFormatter.formatCurrency(1400),
                alignment: 'right',
              },
            ],
          ],
        },
      },
      {
        margin: [0, cmToPoints(1)],
        columns: [
          {
            text: '',
            width: '*',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(1500),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(1500),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
