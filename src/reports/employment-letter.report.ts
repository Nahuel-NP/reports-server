import { cmToPoints } from 'helpers/cmToPoint.helper';
import {
  Content,
  StyleDictionary,
  type TDocumentDefinitions,
} from 'pdfmake/interfaces';

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

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: cmToPoints(2.5),
  height: cmToPoints(2.5),
};
export const getEmploymentLetterReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [cmToPoints(2.5), cmToPoints(3), cmToPoints(1), cmToPoints(2)],
    header: {
      columns: [
        logo,
        {
          text: `${new Date().toLocaleString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`,
          alignment: 'right',
          margin: [0, cmToPoints(1), cmToPoints(1), 0],
        },
      ],
      margin: [cmToPoints(2.5), cmToPoints(1), cmToPoints(1), 0],
    },
    content: [
      {
        text: 'Employment Letter',
        style: 'headerTitle',
      },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], 
por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra 
empresa desde el [Fecha de Inicio del Empleado].\n\n
 Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del 
Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores.\n\n
 La jornada laboral del Sr./Sra. [Nombre del Empleado] es de [Número de Horas] horas 
semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y 
procedimientos establecidos por la empresa.\n\n
 Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: 'Atentamente,\n',
        style: 'signature',
      },
      {
        text: '[Nombre del Empleador]\n',
        style: 'signature',
      },
      {
        text: '[Cargo del Empleador]\n',
        style: 'signature',
      },
      {
        text: '[Nombre de la Empresa]\n',
        style: 'signature',
      },
      {
        text: '[Fecha de Emisión]',
        style: 'signature',
      },
    ],
  };
  return docDefinition;
};
