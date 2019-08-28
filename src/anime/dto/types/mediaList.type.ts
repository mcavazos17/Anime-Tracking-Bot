import { ApiModelProperty } from '@nestjs/swagger';
import { MediaType } from './index';

export class MediaListType {
  @ApiModelProperty()
  readonly media: MediaType;

  @ApiModelProperty()
  readonly progress: number;

  @ApiModelProperty()
  readonly score: number;
}
