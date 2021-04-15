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

import Image from 'next/image';
import { Sponsor } from '@lib/types';
import {
  IconLinkedin,
  IconTwitter,
  IconFacebook,
  IconInstagram,
  IconLink
} from '@components/icons';
import DownloadButton from '@components/DownloadButton';
import BackLink from '@components/BackLink';
import Button from '@components/Button';
import styles from './styles.module.scss';
import styleUtils from '@styles/utils.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  sponsor: Sponsor;
};

export default function SponsorSection({ sponsor }: Props) {
  return (
    <>
      <BackLink url="/expo" text="Back to expo" />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.nameAndLogo}>
            {sponsor?.logo && sponsor.logo?.url && (
              <div className={styles.logoWrapper}>
                <Image
                  alt={sponsor?.name}
                  src={sponsor.logo.url}
                  className={styles.image}
                  loading="lazy"
                  objectFit="cover"
                  title={sponsor?.name}
                  height={64}
                  width={64}
                />
              </div>
            )}
            {sponsor?.name && (
              <h1 className={styles.name}>
                {sponsor?.website ? <a href={sponsor.website}>{sponsor.name}</a> : sponsor.name}
              </h1>
            )}
          </div>
          <p className={styles.description}>{sponsor.description}</p>
          <div className={styles.socials}>
            <div className={styles.socialsWrapper}>
              {sponsor?.twitter && (
                <a
                  aria-label="Twitter"
                  href={sponsor.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                >
                  <IconTwitter theme="white" width={24} />
                </a>
              )}
              {sponsor?.linkedin && (
                <a
                  aria-label="LinkedIn"
                  href={sponsor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                >
                  <IconLinkedin theme="white" width={24} />
                </a>
              )}
              {sponsor?.facebook && (
                <a
                  aria-label="Facebook"
                  href={sponsor.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                >
                  <IconFacebook theme="white" width={24} />
                </a>
              )}
              {sponsor?.instagram && (
                <a
                  aria-label="Instagram"
                  href={sponsor.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                >
                  <IconInstagram />
                </a>
              )}
            </div>
          </div>
          <div className={styles.sponsorDetails}>
            <div className={styles.buttons}>
              {sponsor?.callToActionLink && (
                <Button url={sponsor.callToActionLink}>{sponsor.callToAction}</Button>
              )}
              {sponsor?.discord && (
                <Button theme="purple" url={sponsor.discord}>
                  Chat on Discord
                </Button>
              )}
              <DownloadButton
                className={cn(styles.download)}
                type="sponsor"
                slug={sponsor?.slug}
                text="Download card"
              />
            </div>
          </div>
          {sponsor?.links && sponsor?.links?.length > 0 && (
            <div className={styles.resources}>
              <h2 className={styles.heading}>Resources</h2>
              <div className={cn(styles.buttons, styles.buttonsResources)}>
                {sponsor.links.map(link =>
                  link ? (
                    <Button
                      key={link.url}
                      className={cn(styles.button, styles.buttonResource)}
                      {...link}
                    >
                      <span className={styles.truncate}>{link.text}</span>
                      <IconLink />
                    </Button>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.videoWrapper}>
          <div className={styles.iframeContainer}>
            <iframe
              className={cn(styles.video, styleUtils.appear, styleUtils.appearFirst)}
              allow="picture-in-picture"
              allowFullScreen
              frameBorder="0"
              height="100%"
              src={`https://youtube.com/embed/${sponsor.youtubeSlug}`}
              title={sponsor.name}
              width="100%"
            />
          </div>
        </div>
      </div>
    </>
  );
}
