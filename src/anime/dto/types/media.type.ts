import { ApiModelProperty } from '@nestjs/swagger';
import { MediaTitleType, MediaListType } from './index';

export class MediaType {
  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly title: MediaTitleType;

  @ApiModelProperty()
  readonly status: Enumerator;

  @ApiModelProperty()
  readonly mediaListEntry: MediaListType;
}
