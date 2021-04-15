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
import { useRouter } from 'next/router';
import { IconConf } from '@components/icons';
import { Navigation } from '@lib/types';
import MobileMenu from '@components/MobileMenu';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  navigation?: Navigation;
};

export default function Header({ navigation }: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;

  return (
    <header className={cn(styles.header)}>
      <div className={styles.wrapper}>
        <div className={styles.headerLogos}>
          <Link className={styles.logo} aria-label="Get back to Strapi Conf homepage" href="/">
            <IconConf />
          </Link>
          {navigation && <MobileMenu key={router.asPath} navigation={navigation} />}
        </div>
        <div className={styles.tabs}>
          {navigation?.links?.map(({ text, url, ...rest }) =>
            text && url ? (
              <Link
                key={url}
                href={url}
                className={cn(styles.tab, {
                  tabActive: activeRoute.startsWith(url)
                })}
                {...rest}
              >
                {text}
              </Link>
            ) : null
          )}
        </div>
      </div>
    </header>
  );
}
