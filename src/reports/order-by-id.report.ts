import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { DateFormatter } from 'src/helpers/date-formatter.helper';

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
    pageMargins: [cmToPoints(2), cmToPoints(1), cmToPoints(2), cmToPoints(0)],
    content: [
      {
        text: 'Tucan code',
        style: 'header',
      },
      {
        columns: [
          {
            text: 'Calle falsa 123, Puerto Vilelas\nChaco, ARGENTINA.\nCUIT: 20-12312312-1\nhttps://pedroso.nahuel.dev.com',
          },
          {
            text: `Recibo no. #123123\n${DateFormatter.getFormattedDate(new Date())}\nConsumidor final`,
            alignment: 'right',
          },
        ],
      },
    ],
  };
};
