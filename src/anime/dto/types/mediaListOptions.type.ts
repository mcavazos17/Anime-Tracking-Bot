import { MediaListTypeOptionsType } from './index';
import { ApiModelProperty } from '@nestjs/swagger';

export class MediaListOptionsType {
  @ApiModelProperty()
  readonly scoreFormat: Enumerator;

  @ApiModelProperty()
  readonly rowOrder: string;

  @ApiModelProperty()
  readonly useLegacyLists: boolean;

  @ApiModelProperty()
  readonly animeList: MediaListTypeOptionsType;

  @ApiModelProperty()
  readonly mangaList: MediaListTypeOptionsType;
}
