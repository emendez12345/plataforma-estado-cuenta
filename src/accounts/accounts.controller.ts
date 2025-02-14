import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { json } from 'node:stream/consumers';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll() {
    const accountServices = await this.accountsService.apiSolutions();
    const accounts = []; // Array para acumular los datos
    // return accountServices.data.ComprobanteSolutions;
    accountServices.data.ComprobanteSolutions.forEach((accountService) => {
      const account = {
        empresa:accountService.CabeceraComprobante.NombreEmpresa,
        centroComercial:accountService.CabeceraComprobante.NombreCentroComercial,
        fechaEmision:accountService.CabeceraComprobante.FechaEmision,
        fechaVencimiento:accountService.CabeceraComprobante.FechaVencimiento,
        // diasAtrasados:accountService.CabeceraComprobante.FechaEmision, - FechaVencimiento
        factura:accountService.CabeceraComprobante.NumeracionComprobante,
        // valor:accountService.CabeceraComprobante.No, se encuentra
        // intereses:accountService.CabeceraComprobante.No, se encuentra
        observaciones:accountService.CabeceraComprobante.Observaciones,
        // estado:accountService.CabeceraComprobante.FechaEmision, - FechaVencimiento
              };

      // Agregar el objeto account al array accounts
      accounts.push(account);
    });

    // Retornar el array con todos los objetos 'accounts'
    return accounts;
  }

  @Get('save')
  saveAll() {
    return this.accountsService.apiSolutions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
