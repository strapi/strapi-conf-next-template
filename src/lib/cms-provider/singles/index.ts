import { fetchCmsAPI } from '@lib/cms-provider/utils';
import { Job } from '@lib/types';

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      jobs {
        id
        companyName
        title
        description
        link
        discord
        rank
      }
    }
  `);

  return data.jobs;
}
