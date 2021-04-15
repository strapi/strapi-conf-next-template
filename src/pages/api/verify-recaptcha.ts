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

export default async function verifyRecaptcha(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  if (!body?.token || !body?.action || !process.env.RECAPTCHA_SECRET_KEY)
    return res.status(401).json({ error: 'missing params or secret var' });

  const url = 'https://www.google.com/recaptcha/api/siteverify';

  const response = await fetch(
    `${url}?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body?.token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }
  );

  if (!response.ok) return res.status(500).json({ error: 'bad request' });

  const result = await response.json();

  if (
    result &&
    result.success &&
    typeof result.success === 'boolean' &&
    result.score &&
    result.score > 0.5 &&
    result.action === body?.action
  ) {
    return res.status(200).json({ success: result.success });
  }

  return res.status(200).json({ success: false });
}
