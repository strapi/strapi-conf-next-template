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
import { Sponsor } from '@lib/types';
import styles from '../styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

export default function SponsorCard({
  sponsor,
  forwardRef
}: {
  sponsor: Sponsor;
  forwardRef?: any;
}) {
  return (
    <div
      ref={forwardRef}
      className={cn(styles.card, {
        [styles.gold]: sponsor?.tier === 'gold',
        [styles.silver]: sponsor?.tier === 'silver'
      })}
    >
      <Link role="button" tabIndex={0} key={sponsor?.name} href={`/expo/${sponsor?.slug}`}>
        <div className={styles.imageWrapper}>
          {sponsor?.cardImage?.url && (
            <Image
              alt={sponsor.name}
              src={sponsor.cardImage.url}
              className={cn({
                [styles.bronze]: sponsor.tier === 'bronze'
              })}
              objectFit="cover"
              loading="lazy"
              title={sponsor.name}
              width={900}
              height={500}
            />
          )}
        </div>
        {sponsor?.tier !== 'bronze' && (
          <div className={styles.cardBody}>
            <div>
              {sponsor?.name && <h2 className={styles.name}>{sponsor.name}</h2>}
              {sponsor?.description && <p className={styles.description}>{sponsor.description}</p>}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}
