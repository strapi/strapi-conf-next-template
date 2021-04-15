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

import { SSRProvider, OverlayProvider } from 'react-aria';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Global } from '@lib/types';
import { getGlobal } from '@lib/cms-api';
import { formatMetas } from '@lib/format-metas';
import GlobalDataContext from '@lib/global-context';
import NProgress from '@components/NProgress';
import ResizeHandler from '@components/ResizeHandler';
import Page from '@components/Page';
import '@styles/global.scss';
import '@styles/nprogress.scss';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

interface CustomAppProps extends AppProps {
  global: Global;
}

export default function App({ Component, pageProps, global }: CustomAppProps) {
  const { asPath } = useRouter();
  const settings = pageProps?.settings ?? {};
  const hideNav = pageProps?.hideNav ?? false;
  const meta = formatMetas(pageProps);

  return (
    <SSRProvider>
      <OverlayProvider>
        <GlobalDataContext.Provider value={{ ...global }}>
          <Page
            className={cn(styles.container, styles[settings?.type])}
            meta={meta}
            fullViewport={settings?.fullViewport ?? false}
            hideNav={hideNav}
            {...global}
          >
            <Component key={asPath} {...pageProps} />
          </Page>
        </GlobalDataContext.Provider>
        <ResizeHandler />
        <NProgress />
      </OverlayProvider>
    </SSRProvider>
  );
}

App.getInitialProps = async () => {
  const global = await getGlobal();

  return { global };
};
