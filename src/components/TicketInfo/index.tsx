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
import { DATE, SITE_URL } from '@lib/constants';
import { IconConf } from '@components/icons';
import { IconPlatform } from '@components/icons';
import styles from './styles.module.scss';
import styleUtils from '@styles/utils.module.scss';

const siteUrl = new URL(SITE_URL);
const siteUrlForTicket = `${siteUrl.host}${siteUrl.pathname}`.replace(/\/$/, '');

export default function TicketInfo() {
  const ctx = useContext(GlobalDataContext);
  const createdBy = (
    <div className={styles.createdBy}>
      <div className={styles.createdByText}>Created by </div>
      <div className={styles.createdByLogo}>
        <IconPlatform height="100%" color="$accents-4" />
      </div>
    </div>
  );
  return (
    <div className={styles.info}>
      <div className={styles.logo}>
        <IconConf />
      </div>
      <div className={styles.date}>
        <div>{ctx?.eventDate?.standard ?? DATE}</div>
        <div>ONLINE</div>
      </div>
      <div className={styleUtils.hideOnMobile}>{createdBy}</div>
      <div className={styles.url}>{siteUrlForTicket}</div>
      <div className={styleUtils.showOnMobile}>{createdBy}</div>
    </div>
  );
}
