import { MediaListGroupType } from './types/index';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class MediaListCollectionDto {
  @ApiModelProperty()
  readonly lists: [MediaListGroupType];

  @ApiModelProperty()
  readonly user: UserDto;
}
