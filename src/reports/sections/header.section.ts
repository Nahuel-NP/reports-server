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
  const { showLogo = true, title, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getFormattedDate(new Date()),
        alignment: 'right',
        margin: [0, cmToPoints(1), cmToPoints(1), 0],
      }
    : '';

  const headerTitle: Content = title
    ? {
        text: title,
        alignment: 'center',
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, headerDate],
    margin: [cmToPoints(2.5), cmToPoints(1), cmToPoints(1), 0],
  };
};
