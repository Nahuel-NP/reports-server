import { Content } from 'pdfmake/interfaces';
import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { DateFormatter } from 'src/helpers/date-formatter.helper';

interface HeaderSectionOptions {
  showLogo?: boolean;
  title?: string;
  subtitle?: string;
  showDate?: boolean;
}
const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: cmToPoints(2.5),
  height: cmToPoints(2.5),
};

export const headerSection = (options: HeaderSectionOptions): Content => {
  const { showLogo = true, title, subtitle, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getFormattedDate(new Date()),
        alignment: 'right',
        marginTop: cmToPoints(1),
      }
    : '';

  const headerSubTitle: Content = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
          bold: true,
        },
      }
    : '';

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, cmToPoints(0.5), 0, 0],
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubTitle,
        ],
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, headerDate],
    margin: [cmToPoints(2.5), cmToPoints(1), cmToPoints(1), cmToPoints(0)],
  };
};
