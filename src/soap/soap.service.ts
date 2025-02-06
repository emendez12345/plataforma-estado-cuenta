import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import * as fs from 'fs'; // Para leer archivos si es necesario

@Injectable()
export class SoapService {
  private wsdl: string =
    'https://app-colombia.solutionsmalls.com:22573/jSolutionsUnico/APISolutionsWS?WSDL';

  async consumeSoapService() {
    return new Promise((resolve, reject) => {
      soap.createClient(this.wsdl, (err, client) => {
        if (err) {
          return reject('Error al crear cliente SOAP: ' + err);
        }
        const soapBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:util="http://util.jsolutions.solutionsMall.com.ar/">
                            <soapenv:Header/>
                            <soapenv:Body>
                                <util:clientesListar>
                                    <!--Optional:-->
                                    <usuario>lsaiz</usuario>
                                    <!--Optional:-->
                                    <clave>Unico*123</clave>
                                </util:clientesListar>
                            </soapenv:Body>
                            </soapenv:Envelope>`;
        // Realizar la solicitud con el cuerpo SOAP manual
        client.clientesListar(soapBody, (err, result) => {
          if (err) {
            return reject('Error en la llamada SOAP: ' + err);
          }
          // Mostrar el resultado completo para ver qué contiene
          console.log('Resultado completo:', result);
          if (result && result.clientesListarResult) {
            resolve(result.clientesListarResult); // Accede a la propiedad correcta
          } else {
            reject(
              'No se pudo obtener la propiedad carteraClientesObtenerResponse',
            );
          }
        });
      });
    });
  }
}
