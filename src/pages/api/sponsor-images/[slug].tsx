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
import { getSponsor } from '@lib/cms-api';

export default async function sponsorImages(req: NextApiRequest, res: NextApiResponse) {
  let url: string;
  const { slug } = req.query || {};

  if (slug) {
    const slugString = slug.toString();
    const sponsor = await getSponsor(slugString);

    if (!sponsor?.slug) {
      res.statusCode = 404;
      return res.end('Not Found');
    }

    url = `${SITE_URL}/sponsor-image?slug=${encodeURIComponent(slugString)}`;

    if (sponsor?.name) {
      url = `${url}&name=${encodeURIComponent(sponsor.name)}`;
    }

    if (sponsor?.tier) {
      url = `${url}&tier=${encodeURIComponent(sponsor.tier)}`;
    }

    const imageUrl = sponsor?.cardImage?.url ?? sponsor?.logo?.url ?? null;
    if (imageUrl) {
      url = `${url}&image=${encodeURIComponent(
        imageUrl.replace('?auto=compress,format&q=40', '')
      )}`;
    }

    const file = await screenshot(url);

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
