import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async createCat(name: string, age: number): Promise<Cat> {
    const cat = new this.catModel({ name, age });
    return cat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec(); // Esto devuelve todos los registros de gatos
  }
}
