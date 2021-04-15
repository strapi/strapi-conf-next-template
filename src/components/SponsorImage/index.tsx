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

import { useRouter } from 'next/router';
import SponsorVisual from '@components/SponsorVisual';
import styles from './styles.module.scss';

export default function SponsorImage() {
  const { query } = useRouter();
  const { name = null, tier = null, image = null } = query;
  if (query.slug) {
    return (
      <div className={styles.background}>
        <div className={styles.page}>
          <SponsorVisual name={name} tier={tier} image={image} />
        </div>
      </div>
    );
  }
  return <></>;
}
