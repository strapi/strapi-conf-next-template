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
import { Job, Sponsor, Stage, Speaker, Settings, Global } from '@lib/types';
import * as strapiApi from './cms-provider';

const cmsApi = strapiApi;

export async function getAllSpeakers(): Promise<Speaker[]> {
  return cmsApi.getAllSpeakers();
}

export async function getSpeaker(slug: string): Promise<Speaker> {
  return cmsApi.getSpeaker(slug);
}

export async function getAllStages(): Promise<Stage[]> {
  return cmsApi.getAllStages();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getSponsor(slug: string): Promise<Sponsor> {
  return cmsApi.getSponsor(slug);
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}

export async function getGlobal(): Promise<Global> {
  return cmsApi.getGlobal();
}

export async function getSettings(type: string): Promise<Settings> {
  return cmsApi.getSettings(type);
}
