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

import { TicketGenerationState } from '@lib/constants';
import { IconGithub, IconAvatar } from '@components/icons';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  name?: string;
  username?: string;
  size?: number;
  ticketGenerationState: TicketGenerationState;
};

export default function TicketProfile({ name, username, size = 1, ticketGenerationState }: Props) {
  return (
    <div className={styles.profile}>
      <span
        className={cn(styles.skeleton, styles.wrapper, styles.inline, styles.rounded, {
          [styles.show]: ticketGenerationState === 'loading'
        })}
      >
        {username ? (
          <img src={`https://github.com/${username}.png`} alt={username} className={styles.image} />
        ) : (
          <span className={cn(styles.image, styles.emptyIcon)}>
            <IconAvatar />
          </span>
        )}
      </span>
      <div className={styles.text}>
        <p
          className={cn(styles.name, {
            nameBlank: !username
          })}
        >
          <span
            className={cn(styles.skeleton, styles.wrapper, {
              show: ticketGenerationState === 'loading'
            })}
          >
            {name || username || 'Your Name'}
          </span>
        </p>
        <p className={styles.username}>
          <span
            className={cn(styles.skeleton, styles.wrapper, {
              show: ticketGenerationState === 'loading'
            })}
          >
            <span className={styles.githubIcon}>
              <IconGithub color="#d8d8d8" size={20 * size} />
            </span>
            {username || <>username</>}
          </span>
        </p>
      </div>
    </div>
  );
}
