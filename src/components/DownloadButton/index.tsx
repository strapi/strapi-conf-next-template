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

import { useState, useRef, useEffect } from 'react';
import LoadingDots from '@components/LoadingDots';
import { IconDownload } from '@components/icons';
import styleUtils from '@styles/utils.module.scss';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  className?: string;
  slug: string;
  squared?: boolean;
  text: string;
  type: 'speaker' | 'sponsor';
};

export default function DownloadButton({ className, type, slug, squared, text }: Props) {
  const [imgReady, setImgReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const downloadLink = useRef<HTMLAnchorElement>();
  const downloadUrl = `/api/${type}-images/${slug}${squared ? '?format=square' : ''}`;

  useEffect(() => {
    setImgReady(false);

    const img = new Image();

    img.src = downloadUrl;
    img.onload = () => {
      setImgReady(true);
      setLoading(false);
      if (downloadLink.current) {
        downloadLink.current.click();
        downloadLink.current = undefined;
      }
    };
  }, [downloadUrl]);

  return (
    <a
      className={cn(className, styles.button, {
        [styles.loading]: loading
      })}
      href={loading ? undefined : downloadUrl}
      onClick={e => {
        if (imgReady) return;

        e.preventDefault();
        downloadLink.current = e.currentTarget;
        // Wait for the image download to finish
        setLoading(true);
      }}
      rel="nofollow"
      download={`${slug ?? type}.png`}
    >
      {loading ? (
        <LoadingDots size={4} />
      ) : (
        <>
          <IconDownload width={24} /> {text}
        </>
      )}
    </a>
  );
}
