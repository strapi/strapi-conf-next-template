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

import { useRef, MutableRefObject } from 'react';
import { default as NextImage } from 'next/image';
import { Speaker } from '@lib/types';
import { IconGithub, IconTwitter, IconLinkedin } from '@components/icons';
import DownloadButton from '@components/DownloadButton';
import BackLink from '@components/BackLink';
import styles from './styles.module.scss';

type Props = {
  speaker: Speaker;
};

export default function SpeakerSection({ speaker }: Props) {
  return (
    <>
      <BackLink url="/speakers" text="Back to speakers" />
      <div key={speaker.name} className={styles.container}>
        <div className={styles.imageWrapper}>
          {speaker?.image?.url && (
            <NextImage
              alt={speaker?.name}
              title={speaker?.name}
              src={speaker.image.url}
              className={styles.image}
              loading="eager"
              quality="75"
              objectFit="cover"
              height={400}
              width={300}
              sizes={speaker.image?.sizes}
            />
          )}
        </div>
        <div className={styles.speakerDetails}>
          <div>
            {speaker?.name && <h1 className={styles.name}>{speaker.name}</h1>}
            {speaker?.company && (
              <p className={styles.title}>
                {`${speaker.title} @ `}
                <span className={styles.company}>{speaker.company}</span>
              </p>
            )}
            {speaker?.bio && (
              <div>
                <h2 className={styles.bioHeader}>Bio</h2>
                <p className={styles.bio}>{speaker.bio}</p>
              </div>
            )}
            <div className={styles.socials}>
              <h3 className={styles.socialsHeader}>Social Media</h3>
              {speaker?.twitter && (
                <a
                  aria-label="Twitter"
                  href={speaker.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconTwitter theme="white" width={24} />
                </a>
              )}
              {speaker?.github && (
                <a
                  aria-label="GitHub"
                  className={styles.githubIcon}
                  href={speaker.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGithub color="#D8D8D8" size={24} />
                </a>
              )}
              {speaker?.linkedin && (
                <a
                  aria-label="LinkedIn"
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubIcon}
                >
                  <IconLinkedin theme="white" width={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.downloads}>
        <DownloadButton type="speaker" slug={speaker?.slug} text="2:1 Card" />
        <DownloadButton type="speaker" slug={speaker?.slug} squared text="1:1 Card" />
      </div>
      {speaker?.talk && (
        <div className={styles.talkDetails}>
          {speaker.talk?.title && <h3 className={styles.socialsHeader}>{speaker.talk.title}</h3>}
          {speaker.talk?.description && <p>{speaker.talk.description}</p>}
        </div>
      )}
    </>
  );
}
