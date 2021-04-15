import { SITE_URL, SITE_NAME, EDITO } from '@lib/constants';
import { Sponsor, Speaker, Talk, Settings } from './types';

interface Data {
  sponsors?: Sponsor[];
  sponsor?: Sponsor;
  speakers?: Speaker[];
  speaker?: Speaker;
  schedule?: Talk[];
  settings?: Settings;
  username?: string | null;
  usernameFromParams?: string | null;
  name?: string | null;
  ticketNumber?: number | null;
}

export function insertVariablesInMeta(string: string | undefined, variables: any) {
  if (!string || string === '') return null;
  return string.replace('%name%', variables.name);
}

export function formatMetas(pageProps: Data) {
  const settings = pageProps?.settings;
  const type = settings?.type ?? 'default';

  return {
    title: settings?.metaTitle ?? EDITO[type].metaTitle,
    description: settings?.metaDescription ?? EDITO[type].metaDescription,
    image: settings?.metaImage?.url ?? null
  };
}
