import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as chartUtils from 'src/helpers/chart-utils';
const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'], // Set X-axis labels
      datasets: [
        {
          label: 'Mi primer gráfico',
          data: [65, 59, 80, 81, 56, 55, 10],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        },
      ],
    },
  };

  return chartUtils.chartJsToImage(chartConfig);
};
export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    const chartImage = await generateChartImage();
    return {
      content: [
        {
          svg: svgContent,
          width: 150,
        },
        {
          image: chartImage,
          width: 500,
        },
      ],
    };
  };
