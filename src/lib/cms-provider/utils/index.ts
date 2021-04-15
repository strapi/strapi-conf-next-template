/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { Image, Link } from '@lib/types';

const IMAGE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

export function serializeImage(image: Image): Image {
  if (!image?.url) return null;
  let imageUrl: string = image.url.startsWith('http') ? image.url : `${IMAGE_URL}${image.url}`;

  return {
    ...image,
    sizes: '',
    url: `${imageUrl}?auto=compress,format`
  };
}

export function serializeLink(link: Link) {
  return {
    ...link,
    isExternal: link?.text?.startsWith('http') ? true : false
  };
}

export async function fetchCmsAPI(
  query: string,
  { variables }: { variables?: Record<string, any> } = {},
  token?: string
) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({
      query,
      ...(variables && { variables })
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
