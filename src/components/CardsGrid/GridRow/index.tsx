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

import { IconDiscord, IconLink } from '@components/icons';
import { Job } from '@lib/types';
import styles from './styles.module.scss';

interface GridItemProps {
  items: any[];
  title?: string;
  discord?: string;
}

export default function GridRow({ items, title, discord }: GridItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.rowHeader}>
        {title && <h2 className={styles.companyName}>{title}</h2>}
        {discord && (
          <a href={discord} target="_blank" rel="noopener noreferrer" className={styles.button}>
            <span>Join the recruiters live on</span>
            <IconDiscord />
          </a>
        )}
      </div>
      <div className={styles.grid}>
        {items?.map((item: Job) => (
          <a
            key={item.id}
            className={styles.card}
            href={item?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.cardBody}>
              <div>
                {item?.title && <h3 className={styles.title}>{item.title}</h3>}
                {item?.companyName && <p className={styles.company}>{item.companyName}</p>}
                {item?.description && <p className={styles.description}>{item.description}</p>}
              </div>
              <p className={styles.link}>
                Learn More <IconLink className={styles.icon} />
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
