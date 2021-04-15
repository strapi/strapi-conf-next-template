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

import { useRef, useEffect, useState, useContext } from 'react';
import GlobalDataContext from '@lib/global-context';
import Tilt from 'vanilla-tilt';
import { UserData } from '@hooks/useConfData';
import { TicketGenerationState } from '@lib/constants';
import isMobileOrTablet from '@lib/is-mobile-or-tablet';
import { scrollTo } from '@lib/smooth-scroll';
import { DATE, SITE_NAME } from '@lib/constants';
import TicketForm from '@components/TicketForm';
import TicketVisual from '@components/TicketVisual';
import TicketActions from '@components/TicketActions';
import TicketCopy from '@components/TicketCopy';
import Form from '@components/Form';
import styles from './styles.module.scss';
import styleUtils from '@styles/utils.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type Props = {
  username: UserData['username'];
  ticketNumber: UserData['ticketNumber'];
  name: UserData['name'];
  sharePage?: boolean;
};

export default function Ticket({ username, name, ticketNumber, sharePage }: Props) {
  const ctx = useContext(GlobalDataContext);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [ticketGenerationState, setTicketGenerationState] = useState<TicketGenerationState>(
    'default'
  );
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 5,
        'max-glare': 0.16,
        'full-page-listening': true
      });
    }
  }, [ticketRef]);

  useEffect(() => {
    if (!sharePage && divRef && divRef.current && isMobileOrTablet()) {
      scrollTo(divRef.current, -30);
    }
  }, [divRef, sharePage]);

  return (
    <div
      className={cn(styles.ticketLayout, {
        ticketShareLayout: sharePage
      })}
    >
      <div>
        <div className={styles.ticketText}>
          <h2 className={styles.hero}>
            {sharePage ? (
              name ? (
                <>{name}’s Ticket</>
              ) : (
                <>{SITE_NAME}</>
              )
            ) : (
              <>
                You're in. <br /> Make it unique.
              </>
            )}
          </h2>
          <p className={styles.description}>
            {sharePage ? (
              <>
                Join {name ?? 'them '} on {ctx?.eventDate?.standard ?? DATE}.
              </>
            ) : (
              <>Generate a unique ticket image with your GitHub profile.</>
            )}
          </p>
        </div>
        <div>
          {!sharePage ? (
            <TicketForm
              defaultUsername={username}
              setTicketGenerationState={setTicketGenerationState}
            />
          ) : (
            <Form sharePage />
          )}
        </div>
      </div>
      <div className={styles.ticketVisualWrapper}>
        <div className={styles.ticketVisual}>
          <TicketVisual
            username={username}
            name={name}
            ticketNumber={ticketNumber}
            ticketGenerationState={ticketGenerationState}
          />
        </div>
        {!sharePage && (
          <div>
            {username ? (
              <div>
                <div className={styles.ticketActions}>
                  <TicketActions username={username} />
                </div>
                <div className={styles.ticketCopy}>
                  <TicketCopy username={username} />
                </div>
              </div>
            ) : (
              <div className={styles.ticketActionsPlaceholder} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
