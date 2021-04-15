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

import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllStages } from '@lib/cms-api';
import { Stage, PageProps } from '@lib/types';
import StageContainer from '@components/StageContainer';

interface Props extends PageProps {
  stage: Stage;
  stages: Stage[];
}

export default function StagePage({ stage, stages }: Props) {
  return <StageContainer stage={stage} allStages={stages} />;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const type = 'stages';
  const slug = params?.slug;
  const stages = await getAllStages();
  const stage = stages.find((s: Stage) => s.slug === slug) || null;

  if (!stage) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      stage,
      stages,
      settings: {
        ...stage?.settings,
        type,
        fullViewport: true
      }
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stages = await getAllStages();

  const slugs = stages.map((s: Stage) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};
