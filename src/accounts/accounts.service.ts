import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { InjectModel } from '@nestjs/mongoose';
import { AccountsSchema } from '../schemas/accounts.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Accounts') private readonly accountsModel: Model<AccountsSchema>
  ) {}
  private url =
    'https://app-colombia.solutionsmalls.com:22573/jSolutionsUnico/APISolutionsWS';
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async apiSolutions(): Promise<any> {
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
                <usuario>lsaiz</usuario>
                <clave>Unico*123</clave>
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

      // Convertir el XML a JSON
      const parser = new xml2js.Parser({
        explicitArray: false, // Evitar arrays innecesarios
        mergeAttrs: true, // Fusionar atributos con el objeto
      });
      // Convertir la respuesta XML a JSON
      const jsonResponse = await parser.parseStringPromise(response.data);

      const data= jsonResponse['soap:Envelope']['soap:Body'][
        'ns2:carteraClientesObtenerResponse'
      ]['return']['CarteraClientesSolutions'];
      const newDocument = new this.accountsModel({
        data: data,

      });
      return await newDocument.save();
      
    } catch (error) {
      // Manejo de errores
      throw new Error(`Error en la petición: ${error.message}`);
    }
  }
}
