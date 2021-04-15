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

import { useState, useEffect } from 'react';
import { parseISO, format, isBefore, isAfter } from 'date-fns';
import Image from 'next/image';
import Link from '@components/Link';
import { Talk, Speaker } from '@lib/types';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  className?: string;
  talk: Talk;
  showTime: boolean;
};

interface RenderCardContentParams {
  title: string;
  speaker: Speaker[];
}

const formatDate = (date: string) => {
  if (!date) return '';
  // https://github.com/date-fns/date-fns/issues/946
  return format(parseISO(date), "h:mmaaaaa'm'");
};

export default function TalkCard({
  className,
  talk: { title, speaker, start, end, link },
  showTime
}: Props) {
  const [isTalkLive, setIsTalkLive] = useState(false);
  const [startAndEndTime, setStartAndEndTime] = useState('');

  useEffect(() => {
    const now = Date.now();
    setIsTalkLive(isAfter(now, parseISO(start)) && isBefore(now, parseISO(end)));
    setStartAndEndTime(`${formatDate(start)} – ${formatDate(end)}`);
  }, []);

  const hasSpeakers = speaker && speaker?.length > 0;
  const hasCustomLink = link !== null && link !== '';
  const talkLink = hasCustomLink ? link : hasSpeakers ? `/speakers/${speaker?.[0]?.slug}` : null;

  const renderCardContent = ({ title, speaker }: RenderCardContentParams) => {
    return (
      <div className={styles.cardBody}>
        {title && (
          <h4 title={title} className={styles.title}>
            {title}
          </h4>
        )}
        {hasSpeakers && (
          <div className={styles.speaker}>
            <div className={styles.avatarGroup}>
              {speaker &&
                speaker?.map(s => (
                  <div key={s?.name} className={styles.avatarWrapper}>
                    {s?.image?.url && (
                      <Image
                        loading="lazy"
                        alt={s?.name}
                        className={styles?.avatar}
                        src={s.image.url}
                        title={s?.name}
                        width={24}
                        height={24}
                        objectFit="cover"
                      />
                    )}
                  </div>
                ))}
            </div>
            <h5 className={styles.name}>
              {speaker?.length === 1 ? speaker[0].name : `${speaker?.length} speakers`}
            </h5>
          </div>
        )}
      </div>
    );
  };

  return (
    <div key={title} className={styles.talk}>
      {showTime && <p className={styles.time}>{startAndEndTime || <>&nbsp;</>}</p>}
      {talkLink ? (
        <Link
          href={talkLink}
          className={cn(className, styles.card, {
            isTalkLive
          })}
          isExternal={talkLink.startsWith('http')}
        >
          {renderCardContent({ title, speaker })}
        </Link>
      ) : (
        <div
          className={cn(className, styles.card, {
            isTalkLive
          })}
        >
          {renderCardContent({ title, speaker })}
        </div>
      )}
    </div>
  );
}
