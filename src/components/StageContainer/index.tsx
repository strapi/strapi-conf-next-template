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
import useSWR from 'swr';
import { Stage } from '@lib/types';
import useLoginStatus from '@hooks/useLoginStatus';
import ScheduleSidebar from '@components/ScheduleSidebar';
import ConfEntry from '@components/ConfEntry';
import { IconDiscord } from '@components/icons';
import styleUtils from '@styles/utils.module.scss';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  stage: Stage;
  allStages: Stage[];
};

export default function StageContainer({ stage, allStages }: Props) {
  const response = useSWR('/api/stages', {
    initialData: allStages,
    refreshInterval: 5000
  });

  const updatedStages = response.data || [];
  const updatedStage = updatedStages.find((s: Stage) => s.slug === stage.slug) || stage;
  const { loginStatus, mutate } = useLoginStatus();

  return (
    <div className={styles.container}>
      <div className={styles.streamContainer}>
        {loginStatus === 'loggedIn' ? (
          <div className={cn(styles.stream, styleUtils.appear, styleUtils.appearFirst)}>
            {updatedStage?.stream && (
              <div className={styles.iframeContainer}>
                <iframe
                  allow="autoplay; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  src={`${updatedStage.stream}${
                    updatedStage.stream.includes('?') ? '&' : '?'
                  }autoplay=1&mute=1`}
                  title={updatedStage.name}
                  width="100%"
                />
              </div>
            )}
            <div className={styles.bottom}>
              <div className={styles.messageContainer}>
                {stage?.name && <h2 className={styles.stageName}>{stage.name}</h2>}
                {stage?.description && (
                  <p className={styles.stageDescription}>{stage.description}</p>
                )}
              </div>
              {updatedStage?.discord && (
                <a
                  href={updatedStage.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.button}
                >
                  <span>Join the chat on</span>
                  <IconDiscord />
                </a>
              )}
            </div>
          </div>
        ) : loginStatus === 'loading' ? null : (
          <ConfEntry stageId={stage?.id} onRegister={() => mutate()} />
        )}
      </div>
      <ScheduleSidebar allStages={updatedStages} />
    </div>
  );
}
