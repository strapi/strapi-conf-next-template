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
import { getAllJobs, getSettings } from '@lib/cms-api';
import { Job, PageProps } from '@lib/types';
import { EDITO } from '@lib/constants';
import CardsGrid from '@components/CardsGrid';
import Heading from '@components/Heading';
import styles from './styles.module.scss';
interface Props extends PageProps {
  jobs: Job[];
}

export default function Jobs({ jobs, settings }: Props) {
  const heading = {
    hero: settings?.title ?? EDITO.jobs.title,
    description: settings?.description ?? EDITO.jobs.description
  };

  return (
    <div className={styles.container}>
      <Heading {...heading} />
      <CardsGrid items={jobs} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const type = 'jobs';
  const [jobs, settings] = await Promise.all([getAllJobs(), getSettings(type)]);

  return {
    props: {
      jobs,
      settings: {
        ...settings,
        type
      }
    },
    revalidate: 60
  };
};
