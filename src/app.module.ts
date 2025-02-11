import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    // MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    AccountsModule
  ],
  // controllers: [CatsController, SoapController],
  // providers: [CatsService, SoapService],
})
export class AppModule {}
