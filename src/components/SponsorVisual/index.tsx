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

import { useContext } from 'react';
import GlobalDataContext from '@lib/global-context';
import Image from 'next/image';
import Decorator from '@components/decorators';
import { DATE } from '@lib/constants';
import classnames from 'classnames/bind';
import styles from './styles.module.scss';
const cx = classnames.bind(styles);

interface SponsorVisual {
  name: string | string[] | null;
  tier: string | string[] | null;
  image: string | string[] | null;
}

export default function SponsorVisual({ name, tier, image }: SponsorVisual) {
  const ctx = useContext(GlobalDataContext);
  return (
    <div className={styles.SponsorCard}>
      <div className={styles.logo}>
        <Image src="/logo-conf.png" width={297} height={298} />
      </div>
      <div className={styles.date}>
        <p>{ctx?.eventDate?.standard ?? DATE}</p>
      </div>
      <Decorator className={styles.decoratorTop} position="top" />
      <Decorator className={styles.decoratorBottom} position="bottom" />
      <div className={styles.sponsorWrapper}>
        <p className={cx(styles.textWrapper, styles.textEffect, styles.sponsorHeading)}>
          {tier ? tier : ''} sponsor
        </p>
        <div className={styles.sponsorLogoBackground}>
          {image && (
            <div className={styles.sponsorLogo}>
              <Image layout="fill" src={image as string} objectFit="contain" />
            </div>
          )}
        </div>
        <div className={cx(styles.textWrapper, styles.sponsorDetails)}>
          {name && <p className={cx(styles.textEffect, styles.name)}>@{name}</p>}
        </div>
      </div>
      <div className={styles.marketing}>
        <p className={styles.button}>#strapiconf</p>
      </div>
    </div>
  );
}
