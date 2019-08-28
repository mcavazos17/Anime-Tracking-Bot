import { ApiModelProperty } from '@nestjs/swagger';

export class MediaListTypeOptionsType {
  @ApiModelProperty()
  readonly sectionOrder: [string];

  @ApiModelProperty()
  readonly splitCompletedSectionByFormat: boolean;

  @ApiModelProperty()
  readonly customLists: [string];

  @ApiModelProperty()
  readonly advanceScoring: [string];

  @ApiModelProperty()
  readonly advancedScoringEnabled: boolean;
}
