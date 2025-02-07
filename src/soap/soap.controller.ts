import { Controller, Get} from '@nestjs/common';
import { SoapService } from './soap.service';

@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  // Endpoint para consumir el servicio SOAP
  @Get('api-solutions')
  async getApiSolutions() {
    try {
      const jsonResponse  = await this.soapService.apiSolutions();
      return jsonResponse; // Devolver la respuesta del servicio SOAP
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

//   @Post('api-solutions')
//   async postApiSolutions(@Body() requestData: any) {
//     try {
//       // Aquí puedes personalizar la forma en la que se construye el XML
//       // con los datos del requestData
//       const response = await this.soapService.apiSolutions(requestData);
//       return response.data;
//     } catch (error) {
//       throw new Error(`Error: ${error.message}`);
//     }
//   }
}
