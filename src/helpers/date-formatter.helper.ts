export class DateFormatter {
  static formatter = new Intl.DateTimeFormat('es-Ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  static getFormattedDate(date: Date) {
    return DateFormatter.formatter.format(date);
  }
}
