import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class SoapService {
  // URL del servicio SOAP
  private url = 'https://app-colombia.solutionsmalls.com:22573/jSolutionsUnico/APISolutionsWS';

  // Función para hacer la llamada SOAP
  async apiSolutions(): Promise<AxiosResponse<string>> {
    // Definir los encabezados SOAP
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
      // Si no se requiere SOAPAction, lo puedes dejar así o ponerlo vacío
      // 'SOAPAction': '', 
    };

    // XML que se enviará al servicio SOAP
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:util="http://util.jsolutions.solutionsMall.com.ar/">
        <soapenv:Header/>
        <soapenv:Body>
            <util:carteraClientesObtener>
                <usuario>Solutions</usuario>
                <clave>Penelope01</clave>
                <parametros>
                    <![CDATA[
                    <FiltrosCarteraClientes>
                        <CabeceraCarteraClientes>
                            <CodigoEmpresa>13</CodigoEmpresa>
                            <CodigoCliente>569</CodigoCliente>
                            <NumeroContrato></NumeroContrato>
                            <DivisaExpresion></DivisaExpresion>
                            <CotizacionExpresion></CotizacionExpresion>
                            <ValoresCartera></ValoresCartera>
                            <FechaHasta></FechaHasta>
                            <FechaVencimiento></FechaVencimiento>
                        </CabeceraCarteraClientes>
                    </FiltrosCarteraClientes>
                    ]]>
                </parametros>
            </util:carteraClientesObtener>
        </soapenv:Body>
    </soapenv:Envelope>`;

    try {
      // Hacer la solicitud POST con Axios
      const response = await axios.post(this.url, xml, { headers });
      
      // Retornar la respuesta del servicio SOAP
      return response;
    } catch (error) {
      // Manejo de errores
      throw new Error(`Error en la petición: ${error.message}`);
    }
  }
}

