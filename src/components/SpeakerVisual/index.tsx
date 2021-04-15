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
import { DATE } from '@lib/constants';
import { IconPlatform } from '@components/icons';
import Decorator from '@components/decorators';
import classnames from 'classnames/bind';
import styles from './styles.module.scss';
const cx = classnames.bind(styles);

interface SpeakerVisual {
  name: string | string[] | null;
  title: string | string[] | null;
  company: string | string[] | null;
  image: string | null;
  talk: string | string[] | null;
  format: string | string[] | null;
}

export default function SpeakerVisual({
  format,
  name,
  title,
  company,
  image,
  talk
}: SpeakerVisual) {
  const ctx = useContext(GlobalDataContext);
  const positionString = title || company ? `${title ?? ''} ${company ? `@${company}` : ''}` : null;
  return (
    <div className={cx(styles.SpeakerCard, format)}>
      <div className={styles.logo}>
        <Image src="/logo-conf.png" width={297} height={298} />
      </div>
      <div className={styles.date}>
        <p>{ctx?.eventDate?.standard ?? DATE}</p>
      </div>
      <Decorator className={styles.decoratorTop} position="top" />
      <Decorator className={styles.decoratorBottom} position="bottom" />
      <div className={styles.speakerWrapper}>
        <p className={cx(styles.textWrapper, styles.textEffect, styles.speakerHeading)}>SPEAKER</p>
        <div className={styles.center}>
          <div className={styles.portraitContainer}>
            <div className={styles.portraitWrapper}>
              <div className={styles.portraitBackground}>
                {image && (
                  <div className={styles.portrait}>
                    <Image layout="fill" src={image} objectFit="cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.talkWrapper}>{talk && <p>{talk}</p>}</div>
        </div>
        <div className={cx(styles.textWrapper, styles.speakerDetails)}>
          {name && <p className={styles.name}>{name}</p>}
          {positionString && (
            <p className={cx(styles.textEffect, styles.position)}>{positionString}</p>
          )}
        </div>
      </div>
      <div className={styles.marketing}>
        <p className={styles.hashtag}>#strapiconf</p>
        <div className={styles.strapiLogo}>
          <IconPlatform height="100%" color="$accents-4" />
        </div>
      </div>
    </div>
  );
}
