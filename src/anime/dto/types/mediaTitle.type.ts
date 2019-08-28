import { ApiModelProperty } from '@nestjs/swagger';

export class MediaTitleType {
  @ApiModelProperty()
  readonly romaji: string;

  @ApiModelProperty()
  readonly english: string;

  @ApiModelProperty()
  readonly native: string;

  @ApiModelProperty()
  readonly userPreferred: string;
}
