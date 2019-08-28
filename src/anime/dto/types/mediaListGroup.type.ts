import { ApiModelProperty } from '@nestjs/swagger';
import { MediaListType } from './index';

export class MediaListGroupType {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly status: Enumerator;

  @ApiModelProperty()
  readonly isCustomList: boolean;

  @ApiModelProperty()
  readonly isSplitCompletedList: boolean;

  @ApiModelProperty()
  readonly entries: [MediaListType];
}
