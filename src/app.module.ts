import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { Cat, CatSchema} from './schemas/cat.schema';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SoapService } from './soap/soap.service';
import { SoapController } from './soap/soap.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatsController, SoapController],
  providers: [CatsService, SoapService],
})
export class AppModule {}
