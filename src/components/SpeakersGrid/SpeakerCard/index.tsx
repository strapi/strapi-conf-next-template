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

import Link from '@components/Link';
import Image from 'next/image';
import { Speaker } from '@lib/types';
import styles from '../styles.module.scss';

type Props = {
  speaker: Speaker;
};

export default function SpeakerCard({ speaker }: Props) {
  return (
    <Link
      key={speaker?.slug}
      className={styles.card}
      role="button"
      tabIndex={0}
      href={`/speakers/${speaker.slug}`}
    >
      <div className={styles.imageWrapper}>
        {speaker?.image?.url && (
          <Image
            alt={speaker?.name}
            src={speaker.image.url}
            className={styles.image}
            loading="lazy"
            quality="50"
            title={speaker?.name}
            objectFit="cover"
            width={350}
            height={350}
            sizes={speaker.image?.sizes}
          />
        )}
      </div>
      <div className={styles.cardBody}>
        <div>
          {speaker?.name && <h2 className={styles.name}>{speaker.name}</h2>}
          {speaker?.company && (
            <p className={styles.title}>
              {`${speaker?.title} @ `}
              <span className={styles.company}>{speaker.company}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
