import { MediaListOptionsType } from './types/index';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly about: string;

  @ApiModelProperty()
  readonly mediaListOptions: MediaListOptionsType;
}
