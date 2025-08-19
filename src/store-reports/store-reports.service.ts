import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports/order-by-id.report';

@Injectable()
export class StoreReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getOrderReportById(orderId: string) {
    const docDefinition = orderByIdReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
