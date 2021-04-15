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

export type Image = {
  url?: string;
  sizes?: string;
} | null;

export type Speaker = {
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  linkedin: string;
  github: string;
  company: string;
  talk: Talk;
  image: Image;
  cardPortrait?: Image;
  imageSquare: Image;
  settings: Settings;
};

export type Stage = {
  id: string;
  name: string;
  slug: string;
  stream: string;
  discord: string;
  description?: string;
  schedule: Talk[];
  settings: Settings;
};

export type Talk = {
  title: string;
  description: string;
  start: string;
  end: string;
  link: string;
  speaker: Speaker[];
};

export type Link = {
  url: string;
  text?: string;
};

export type Sponsor = {
  name: string;
  description: string;
  slug: string;
  website: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  callToAction: string;
  callToActionLink: string;
  links: SponsorLink[];
  discord: string;
  tier: string;
  tierRank: string;
  cardImage: Image;
  logo: Image;
  youtubeSlug: string;
  settings: Settings;
};

export type SponsorLink = Link;

export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  discord: string;
  link: string;
  rank: string;
};

export type ConfUser = {
  id?: string;
  guestId?: number;
  email: string;
  ticketNumber: number;
  name?: string | null;
  username?: string | null;
  createdAt: number;
};

export type GitHubOAuthData = {
  type: 'token';
  token: string;
  name: string;
  login: string;
};

export type NavigationItem = {
  url: string;
  text: string;
};

export type Navigation = {
  links: NavigationItem[];
};

export type Edito = {
  homeTitle?: string;
  homeSubtitle?: string;
  joinTitle?: string;
  joinSubtitle?: string;
  learnMore?: string;
};

export type Footer = {
  credits?: string;
  links?: Link[];
};

export type EventDate = {
  standard?: string;
  short?: string;
};

export type Global = {
  navigation?: Navigation;
  edito?: Edito;
  eventDate?: EventDate;
  footer?: Footer;
};

export type Settings = {
  type?: 'homepage' | 'schedule' | 'stages' | 'sponsors' | 'jobs' | 'speakers';
  fullViewport?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: Image;
  variables?: {
    [key: string]: string;
  };
  title?: string;
  description?: string;
};

export type Page = {
  id: number;
  type: 'homepage' | 'schedule' | 'stages' | 'sponsors' | 'jobs' | 'speakers';
  settings: Settings;
};

export type PageProps = {
  settings: Settings;
  global?: Global;
};
