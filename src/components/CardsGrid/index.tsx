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

import GridRow from './GridRow';
import { Job } from '@lib/types';
import styles from './styles.module.scss';

type Props = {
  items: Job[];
};
interface AllCompanies {
  [key: string]: {
    discord?: string;
    items?: Job[];
    rank?: number;
  };
}

export default function CardsGrid({ items }: Props) {
  const companies = items
    .sort((a, b) => {
      const aRank = a?.rank && a?.rank !== '' ? Number(a?.rank) : 100;
      const bRank = b?.rank && b?.rank !== '' ? Number(b?.rank) : 100;
      return aRank - bRank;
    })
    .reduce((allCompanies: AllCompanies, item) => {
      allCompanies[item.companyName] = {
        items: [...(allCompanies[item.companyName]?.items || []), item],
        rank: allCompanies[item.companyName]?.rank ?? Number(item?.rank),
        discord: allCompanies[item.companyName]?.discord ?? item?.discord
      };
      return allCompanies;
    }, {});

  return (
    <>
      {Object.keys(companies).map((companyName: string) => (
        <div key={companyName} className={styles.companyRow}>
          <GridRow
            title={companyName}
            discord={companies?.[companyName]?.discord}
            items={companies?.[companyName]?.items ?? []}
          />
        </div>
      ))}
    </>
  );
}
