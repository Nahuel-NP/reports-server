import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { cmToPoints } from 'src/helpers/cmToPoint.helper';
import { DateFormatter } from 'src/helpers/date-formatter.helper';
import { footerSection } from './sections/footer.section';
import { CurrencyFormatter } from 'src/helpers/currency-formatter';

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

export interface CompleteOrderData {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValue {
  title?: string;
  data: CompleteOrderData;
}
export const orderByIdReport = ({
  title,
  data,
}: ReportValue): TDocumentDefinitions => {
  const { customers, order_details } = data;

  const subTotal = order_details.reduce((acc, orderDetail) => {
    return acc + Number(orderDetail.products.price) * orderDetail.quantity;
  }, 0);
  return {
    styles: styles,
    info: {
      title,
    },
    header: {
      columns: [logo],
      margin: [cmToPoints(2), cmToPoints(1), cmToPoints(0), cmToPoints(0)],
    },
    footer: footerSection,
    pageMargins: [cmToPoints(2), cmToPoints(1), cmToPoints(2), cmToPoints(2)],
    content: [
      {
        text: 'Tucan code',
        style: 'header',
      },
      {
        columns: [
          {
            text: 'Calle falsa 123, Puerto Vilelas\nChaco, ARGENTINA.\nCUIT: 20-12312312-1\nhttps://pedroso-nahuel.vercel.app/',
          },
          {
            text: [
              { text: `Recibo no. ${data.order_id}`, bold: true, fontSize: 14 },
              `\n${DateFormatter.getFormattedDate(data.order_date)}\nConsumidor final`,
            ],
            alignment: 'right',
          },
        ],
      },
      {
        qr: 'https://pedroso-nahuel.vercel.app/',
        fit: 100,
        alignment: 'right',
        margin: [0, cmToPoints(0.5)],
      },
      {
        text: [
          {
            text: 'Cobrar a:\n',
            bold: true,
          },
          `Razon social: ${customers.customer_name}
           CUIT: ${customers.customer_id}
           Domicilio: ${customers.address}
           ${customers.city}, ${customers.country}.`,
        ],
        marginBottom: cmToPoints(1),
      },
      {
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Subtotal'],
            ...order_details.map((orderDetail) => [
              orderDetail.order_detail_id,
              orderDetail.products.product_name,
              orderDetail.quantity,
              CurrencyFormatter.formatCurrency(
                Number(orderDetail.products.price),
              ),
              {
                text: CurrencyFormatter.formatCurrency(
                  orderDetail.quantity * Number(orderDetail.products.price),
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },
      {
        margin: [0, cmToPoints(1)],
        columns: [
          {
            text: '',
            width: '*',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total + IVA', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal * 1.21),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
