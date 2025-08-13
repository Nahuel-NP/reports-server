import { type TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}
export const getHelloWorldReport = (options: ReportOptions) => {
  const docDefinition: TDocumentDefinitions = {
    content: [`Hello ${options.name}`],
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
  };
  return docDefinition;
};
