import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport } from 'src/reports/employment-letter.report';
import { getHelloWorldReport } from 'src/reports/hello-world.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('Connected to database');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Nahuel',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    console.log(
      '🚀 ~ BasicReportsService ~ employmentLetterById ~ employee:',
      employee,
    );
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
