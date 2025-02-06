import { Controller, Get } from '@nestjs/common';
import { SoapService } from './soap.service';

@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  // Endpoint para consumir el servicio SOAP
  @Get('api-solutions')
  async getApiSolutions() {
    try {
      const response = await this.soapService.apiSolutions();
      return response.data; // Devolver la respuesta del servicio SOAP
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
