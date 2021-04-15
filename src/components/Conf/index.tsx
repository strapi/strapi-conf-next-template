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

import { useState } from 'react';
import { PageState, ConfDataContext, UserData } from '@hooks/useConfData';
import Ticket from '@components/Ticket';
import ConfContainer from '@components/ConfContainer';
import Hero from '@components/Hero';
import Form from '@components/Form';
import Dots from './Dots';
import Decorator from '@components/decorators';
import styles from './styles.module.scss';

type Props = {
  defaultUserData: UserData;
  sharePage?: boolean;
  defaultPageState?: PageState;
};

export default function Conf({
  defaultUserData,
  sharePage,
  defaultPageState = 'registration'
}: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <ConfContainer>
        {pageState === 'registration' && !sharePage ? (
          <>
            <Dots className={styles.dots} />
            <Decorator position="top" />
            <Decorator position="bottom" />
            <Hero />
            <Form className={styles.form} />
          </>
        ) : (
          <Ticket
            username={userData.username}
            name={userData.name}
            ticketNumber={userData.ticketNumber}
            sharePage={sharePage}
          />
        )}
      </ConfContainer>
    </ConfDataContext.Provider>
  );
}
