import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getList } from './functions/index';

@Injectable()
export class AnimeService {
  async anime(request: Request): Promise<object> {
    const { body } = request;

    if (body.queryResult.intent.displayName === 'ReadList') {
      return await getList(request);
    }
  }
}
