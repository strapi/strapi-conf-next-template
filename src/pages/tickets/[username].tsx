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
import Error from 'next/error';
import Head from 'next/head';
import { SkipNavContent } from '@reach/skip-nav';
import { getGuestTicketData } from '@lib/user-api';
import { PageProps } from '@lib/types';
import { SAMPLE_TICKET_NUMBER } from '@lib/constants';
import ConfContent from '@components/Conf';
import { getSettings } from '@lib/cms-provider';

interface TicketProps extends PageProps {
  username: string | null;
  usernameFromParams: string | null;
  name: string | null;
  ticketNumber: number | null;
}

export default function TicketShare({ username, ticketNumber, name }: TicketProps) {
  if (!ticketNumber) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <SkipNavContent />
      <ConfContent
        defaultUserData={{
          username: username || undefined,
          name: name || '',
          ticketNumber
        }}
        sharePage
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<TicketProps> = async ({ params }) => {
  const username = params?.username?.toString() || null;
  const type = 'ticket';

  const defaultData: TicketProps = {
    username: null,
    usernameFromParams: username || null,
    name: null,
    ticketNumber: SAMPLE_TICKET_NUMBER,
    settings: {
      type
    }
  };

  if (username) {
    const res = await getGuestTicketData(username);
    const guest = await res?.json();
    const settings = await getSettings(type);

    if (!guest) {
      return {
        props: {
          ...defaultData
        },
        revalidate: 5
      };
    }

    if (guest?.ticketNumber) {
      return {
        props: {
          username: guest?.username || null,
          usernameFromParams: guest?.username || null,
          name: guest?.name || guest?.username || null,
          ticketNumber: parseInt(guest?.ticketNumber, 10) || null,
          settings: {
            ...settings,
            type,
            variables: {
              name: guest?.name ?? guest?.username ?? null
            }
          }
        },
        revalidate: 5
      };
    }
  }

  return {
    props: {
      ...defaultData
    },
    revalidate: 5
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return Promise.resolve({
    paths: [],
    fallback: 'blocking'
  });
};
