import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { StyleDictionary, type TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers/date-formatter.helper';

interface ReportOptions {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}
const style: StyleDictionary = {
  headerTitle: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, cmToPoints(1), 0, cmToPoints(1)],
  },
  body: {
    margin: [0, 0, 0, cmToPoints(2)],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
};

export const getEmploymentLetterReportById = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [cmToPoints(2.5), cmToPoints(3), cmToPoints(1), cmToPoints(2)],
    header: headerSection({
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: 'Employment Letter',
        style: 'headerTitle',
      },
      {
        text: `Yo, ${options.employerName}, en mi calidad de ${options.employerPosition} de ${options.employerCompany}, 
por medio de la presente certifico que ${options.employeeName} ha sido empleado en nuestra 
empresa desde el ${DateFormatter.getFormattedDate(options.employeeStartDate)}.\n\n
 Durante su empleo, el Sr./Sra. ${options.employeeName} ha desempeñado el cargo de ${options.employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores.\n\n
 La jornada laboral del Sr./Sra. ${options.employeeName} es de ${options.employeeHours} horas 
semanales, con un horario de ${options.employeeWorkSchedule}, cumpliendo con las políticas y 
procedimientos establecidos por la empresa.\n\n
 Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: 'Atentamente,\n',
        style: 'signature',
      },
      {
        text: options.employerName + '\n',
        style: 'signature',
      },
      {
        text: options.employerPosition + '\n',
        style: 'signature',
      },
      {
        text: options.employerCompany + '\n',
        style: 'signature',
      },
      {
        text: DateFormatter.getFormattedDate(new Date()),
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es un ejemplo de constancia de empleo',
      alignment: 'center',
      fontSize: 10,
    },
  };
  return docDefinition;
};
