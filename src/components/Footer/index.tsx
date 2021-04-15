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

import { useContext, Fragment } from 'react';
import Link from '@components/Link';
import GlobalDataContext from '@lib/global-context';
import styles from './styles.module.scss';
import { COPYRIGHT_HOLDER } from '@lib/constants';

export default function Footer() {
  const ctx = useContext(GlobalDataContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLegal}>
        <div className={styles.footerCopyright}>{ctx?.footer?.credits ?? COPYRIGHT_HOLDER}</div>
        <div className={styles.footerCenterGroup}>
          {ctx?.footer?.links?.map((link, index) => (
            <Fragment key={index}>
              <p className={styles.footerParagraph}>
                <Link className={styles.footerLink} href={link?.url} {...link}>
                  {link?.text}
                </Link>
              </p>
              <div className={styles.footerSeparator} />
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
