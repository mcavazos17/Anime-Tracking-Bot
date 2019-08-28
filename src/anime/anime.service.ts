import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { Request } from 'express';

@Injectable()
export class AnimeService {
  async getList(request: Request): Promise<object> {
    const client = new GraphQLClient('https://graphql.anilist.co', {
      headers: {
        // tslint:disable-next-line: quotemark
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        // tslint:disable-next-line: quotemark
        "Authorization":
          // tslint:disable-next-line: max-line-length
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFjNjFiMDk5NjY5Mzc4MzdlYzE3MTdlOGFkYWQwZGQwNDJkYTAzNTgwMGFhNmZiZjk5Zjk3MWY0NTU2NDNkOWVhMmFmNTE0MWFiNjM0ODMxIn0.eyJhdWQiOiIyNDkxIiwianRpIjoiYWM2MWIwOTk2NjkzNzgzN2VjMTcxN2U4YWRhZDBkZDA0MmRhMDM1ODAwYWE2ZmJmOTlmOTcxZjQ1NTY0M2Q5ZWEyYWY1MTQxYWI2MzQ4MzEiLCJpYXQiOjE1NjY1NzY2MTgsIm5iZiI6MTU2NjU3NjYxOCwiZXhwIjoxNTk4MTk5MDE4LCJzdWIiOiIxOTU4NTciLCJzY29wZXMiOltdfQ.tZBG6QJpTHvLxyuzzENC_SPaDD-JF5ZPKG3Rq-TY17ePo9PNVITP7WvgqxK4AMDOvAGlw-njY1Xo9NmfImF8vBz-6bKGzkajwRuLZvll-qQ2aEp7xU2sivpi3KY4VmeAzENZftXVJKubttAxI3M_Nb5O3Brtkvu1iPJbrxHRKTUA1qfUfG-Hu1WyHwEk_JiekCbLV4SC22yhZ0_PfC_NNdLlbtfwbshfGzbnPyvcZPFNYwH19S1LyX3KKq8e8ubcXjP9Fe3lgfs-tLLnDTVbFZvl7UiCA0kUvMkmeuydHxXIe6TSw-ZBOlVdJnbEX5gDfdEnhOD-7WU-qxsDMCivfsXDd0MfwC2vcunH9gpgCfi9YDpfyjqnAU436APRsTIaoyjE80xMuzuDKWuO4x3DDv89yQIPQe_G-ovZOmNrBMfXIifQHcXCHsW1vj6LCDUT4_RqX_24r4YKyYsat4pD2_jzl_MfO3S_7gmasShjshoreK2WsalFHQ9S-ULG3gJkqn98z_KNC6Gxuruw5Zm5jiLbaCCi8pjCHHgdWBdQUTZh4kQcXTFyzEAlNNgbCYZbQr5P0NMNl7gR_DMWt_ZRzHMQMkT8WJNKREzvOwTuPfljRABSBhug_llduBt7w0Lfz8ON3vCLrZiVtMi0pyoXuJvPgUpRxmCPBnbieHEOjbg',
      },
    });
    const type = 'ANIME';
    const userID = 195857;
    const sort = 'STATUS';
    const status = {
      CURRENT: 'Current',
      PLANNING: 'Planning',
      COMPLETED: 'Completed',
      DROPPED: 'Dropped',
    };
    const userStatus = request.body.queryResult.parameters.AnimeStatus;

    const query = `{
      MediaListCollection(userId: ${userID}, type: ${type}, sort: [${sort}]){
        lists{
            name
            status
            entries{
                media{
                    id
                    title{
                        romaji
                        english
                    }
                    status
                    mediaListEntry{
                        score
                        progress
                    }
                }
            }
        }
    }
    }`;

    const list = await client
      .request(query)
      .then(response => {
        switch (userStatus) {
          case status.CURRENT: {
            return response.MediaListCollection.lists[0];
          }
          case status.PLANNING: {
            return response.MediaListCollection.lists[1];
          }
          case status.COMPLETED: {
            return response.MediaListCollection.lists[2];
          }
          case status.DROPPED: {
            return response.MediaListCollection.lists[3];
          }
          default: {
            return response.MediaListCollection;
          }
        }
      })
      .catch(error => {
        throw new InternalServerErrorException(error);
      });

    const titlesList = list.entries.map(res => res.media.title.english);

    const response = {
      fulfillmentText: `Your ${userStatus} List Includes: ${titlesList}`,
      payload: {
        google: {
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: `Your ${userStatus} list includes: ${titlesList}`,
                },
              },
            ],
          },
        },
      },
      source: `anime list`,
    };

    try {
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
