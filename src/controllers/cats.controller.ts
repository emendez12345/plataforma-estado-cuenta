import { Controller, Post, Body } from '@nestjs/common';
import { CatsService } from '../services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() body: { name: string; age: number }) {
    return this.catsService.createCat(body.name, body.age);
  }
}
