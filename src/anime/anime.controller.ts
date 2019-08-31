import {
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AnimeService } from './anime.service';

@Controller('api')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post('anime')
  async readList(@Req() request: Request): Promise<object> {
    try {
      return await this.animeService.anime(request);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
