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

import { Stage, Talk } from '@lib/types';
import TalkCard from '@components/TalkCard';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

function StageRow({ stage }: { stage: Stage }) {
  // Group talks by the time block
  const timeBlocks = stage.schedule.reduce((allBlocks: any, talk) => {
    allBlocks[talk.start] = [...(allBlocks?.[talk.start] || []), talk];
    return allBlocks;
  }, {});

  return (
    <div className={styles.rowContainer}>
      {/** @ts-ignore **/}
      <div key={stage.name} className={styles.row}>
        <h3 className={cn(styles.stageName, styles[stage.slug])}>
          <span>{stage.name}</span>
        </h3>
        <div className={cn(styles.talks, styles[stage.slug])}>
          {Object.keys(timeBlocks).map((startTime: string, id: number) => (
            <div key={startTime}>
              {timeBlocks?.[startTime]?.map((talk: Talk, index: number) => (
                <TalkCard
                  key={`${talk?.title}-${index}`}
                  className={styles.talkCard}
                  talk={talk}
                  showTime={index === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Props = {
  allStages: Stage[];
};

export default function Schedule({ allStages }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.rowWrapper}>
          {allStages.map((stage, index) => (
            <StageRow key={stage.slug} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
}
