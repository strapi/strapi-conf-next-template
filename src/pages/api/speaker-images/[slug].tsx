/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import screenshot from '@lib/screenshot';
import { SITE_URL } from '@lib/constants';
import { getSpeaker } from '@lib/cms-provider';

export default async function speakerImages(req: NextApiRequest, res: NextApiResponse) {
  let url: string;
  const { slug } = req.query || {};
  const squared = req.query?.format === 'square' ?? false;

  if (slug) {
    const slugString = slug.toString();
    const speaker = await getSpeaker(slugString);

    if (!speaker?.slug) {
      res.statusCode = 404;
      return res.end('Not Found');
    }

    url = `${SITE_URL}/speaker-image?slug=${encodeURIComponent(slugString)}${
      squared ? '&format=squared' : ''
    }`;

    if (speaker?.name) {
      url = `${url}&name=${encodeURIComponent(speaker.name)}`;
    }

    if (speaker?.title) {
      url = `${url}&title=${encodeURIComponent(speaker.title)}`;
    }

    if (speaker?.company) {
      url = `${url}&company=${encodeURIComponent(speaker.company)}`;
    }

    const imageUrl = speaker?.cardPortrait?.url ?? speaker?.image?.url ?? null;
    if (imageUrl) {
      url = `${url}&image=${encodeURIComponent(
        imageUrl.replace('?auto=compress,format&q=40', '')
      )}`;
    }

    if (speaker?.talk?.title) {
      url = `${url}&talk=${encodeURIComponent(speaker.talk.title)}`;
    }

    const dimensions = {
      ...(squared && {
        width: 1000,
        height: 1000
      })
    };

    const file = await screenshot(url, dimensions);
    res.setHeader('Content-Type', `image/png`);
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.statusCode = 200;
    res.end(file);
  } else {
    res.status(404).send('Not Found');
  }
}
