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

import { GetStaticProps } from 'next';
import { getAllSpeakers, getSettings } from '@lib/cms-api';
import { PageProps, Speaker } from '@lib/types';
import { EDITO } from '@lib/constants';
import SpeakersGrid from '@components/SpeakersGrid';
import Heading from '@components/Heading';
import styles from '../styles.module.scss';

interface Props extends PageProps {
  speakers: Speaker[];
}

export default function Speakers({ speakers, settings }: Props) {
  const heading = {
    hero: settings?.title ?? EDITO.speakers.title,
    description: settings?.description ?? EDITO.speakers.description
  };

  return (
    <div className={styles.container}>
      <Heading {...heading} />
      {speakers && speakers?.length > 0 && <SpeakersGrid speakers={speakers} />}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const type = 'speakers';
  const [speakers, settings] = await Promise.all([getAllSpeakers(), getSettings(type)]);

  return {
    props: {
      speakers,
      settings: {
        ...settings,
        type
      }
    },
    revalidate: 60
  };
};
