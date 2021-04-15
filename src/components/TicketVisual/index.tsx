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

import { TicketGenerationState } from '@lib/constants';
import TicketColoredMobile from '@components/TicketColoredMobile';
import TicketColored from '@components/TicketColored';
import TicketProfile from '@components/TicketProfile';
import TicketNumber from '@components/TicketNumber';
import TicketMono from '@components/TicketMono';
import TicketInfo from '@components/TicketInfo';
import TicketMonoMobile from '@components/TicketMonoMobile';
import styles from './styles.module.scss';

type Props = {
  size?: number;
  name?: string;
  ticketNumber?: number;
  username?: string;
  ticketGenerationState?: TicketGenerationState;
};

export default function TicketVisual({
  size = 1,
  name,
  username,
  ticketNumber,
  ticketGenerationState = 'default'
}: Props) {
  return (
    <>
      <div className={styles.visual} style={{ ['--size' as string]: size }}>
        <div className={styles.horizontalTicket}>
          {username ? <TicketColored /> : <TicketMono />}
        </div>
        <div className={styles.verticalTicket}>
          {username ? <TicketColoredMobile /> : <TicketMonoMobile />}
        </div>
        <div className={styles.profile}>
          <TicketProfile
            name={name}
            username={username}
            size={size}
            ticketGenerationState={ticketGenerationState}
          />
        </div>
        <div className={styles.info}>
          <TicketInfo />
        </div>
        {ticketNumber && (
          <div className={styles.ticketNumberWrapper}>
            <div className={styles.ticketNumber}>
              <TicketNumber number={ticketNumber} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
