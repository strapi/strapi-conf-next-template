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
import RichText from '@components/RichText';
import styles from './styles.module.scss';

interface Props {
  forwardRef?: any;
}

export default function LearnMore({ forwardRef }: Props) {
  const ctx = useContext(GlobalDataContext);

  return ctx?.edito?.learnMore ? (
    <div className={styles.contact}>
      <RichText
        forwardRef={forwardRef}
        className={styles.contactEmail}
        text={ctx.edito.learnMore}
      />
    </div>
  ) : null;
}
