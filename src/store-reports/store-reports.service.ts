import { Injectable, NotFoundException } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import {
  CompleteOrderData,
  orderByIdReport,
} from 'src/reports/order-by-id.report';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';
import { getBasicChartSvgReport } from 'src/reports/basic-chart-svg.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderReportById(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const docDefinition = orderByIdReport({
      title: 'Order Report',
      data: order as any as CompleteOrderData,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getSvgCharts() {
    const docDefinition = await getBasicChartSvgReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
