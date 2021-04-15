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

import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_NAME, SITE_URL, TWITTER_USER_NAME } from '@lib/constants';
import { Navigation } from '@lib/types';
import Layout from '@components/Layout';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Meta = {
  title: string | null;
  description: string | null;
  image?: string | null;
  url?: string | null;
};

type Props = {
  className?: string;
  meta: Meta;
  children: React.ReactNode;
  fullViewport?: boolean;
  navigation?: Navigation;
  hideNav?: boolean;
};

export default function Page({
  className,
  meta,
  children,
  fullViewport = false,
  hideNav,
  navigation
}: Props) {
  const router = useRouter();
  const image = meta.image || '/twitter-card.png';
  const title = meta.title || SITE_NAME;
  const url = meta.url || `${SITE_URL}${router.asPath}`;
  const description = meta.description || SITE_NAME;

  return (
    <div className={cn('page-container', { full: fullViewport })}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        <link rel="apple-touch-icon" sizes="150x150" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {image && (
          <meta
            property="og:image"
            content={
              image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_API_URL}${image}`
            }
          />
        )}
      </Head>
      <Layout className={cn({ hideNav })} hideNav={hideNav} navigation={navigation}>
        {children}
      </Layout>
    </div>
  );
}
