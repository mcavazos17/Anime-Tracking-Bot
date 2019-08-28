import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { MediaListCollectionDto } from './dto/mediaListCollection.dto';

@Controller('api/anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('getList')
  async readList(): Promise<MediaListCollectionDto> {
    try {
      return await this.animeService.getList();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
