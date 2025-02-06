import { Controller, Get } from '@nestjs/common';
import { SoapService } from './soap.service';

@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  @Get('consume')
  async consumeSoap() {
    try {
      const result = await this.soapService.consumeSoapService();
      return { result }; // Devolver el resultado de manera estructurada
    } catch (error) {
      console.error('Error en el consumo SOAP:', error);
      return { error: error.message || error }; // Manejo de error mejorado
    }
  }
}
