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
import { getGuest } from '@lib/cms-provider';

export default async function saveGithubToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const body = req.body;

  if (!body.username) {
    return res.json({
      ticketNumber: null,
      username: null,
      name: null
    });
  }

  const token = process.env.GUEST_ADMIN_TOKEN as string;
  const guest = await getGuest('username', body.username, token);

  if (!guest) {
    return res.json({
      ticketNumber: null,
      username: null,
      name: null
    });
  }

  res.json({ ticketNumber: guest?.ticketNumber, username: guest?.username, name: guest?.name });
}
