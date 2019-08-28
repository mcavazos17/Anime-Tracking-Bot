import {
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AnimeService } from './anime.service';
import { MediaListCollectionDto } from './dto/mediaListCollection.dto';

@Controller('api/anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post('getList')
  async readList(@Req() request: Request): Promise<object> {
    try {
      return await this.animeService.getList(request);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
