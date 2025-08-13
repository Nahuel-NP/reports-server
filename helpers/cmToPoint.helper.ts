export function cmToPoints(cm: number) {
  const pointsPerInch = 72;
  const cmPerInch = 2.54;
  return (cm / cmPerInch) * pointsPerInch;
}
