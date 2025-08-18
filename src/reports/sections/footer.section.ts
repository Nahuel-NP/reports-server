import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { type Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  //   pageSize: ContextPageSize,
): Content => {
  return {
    text: `Página ${currentPage} de ${pageCount}`,
    alignment: 'right',
    margin: [0, 0, cmToPoints(1), 0],
    bold: true,
  };
};
