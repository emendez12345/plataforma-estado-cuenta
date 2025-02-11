import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsSchema } from '../schemas/accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Accounts', schema: AccountsSchema }]), // Registra el modelo
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
