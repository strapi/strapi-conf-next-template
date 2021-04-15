import { fetchCmsAPI, serializeImage } from '@lib/cms-provider/utils';
import { Stage, Speaker, Talk } from '@lib/types';

export async function getAllStages(): Promise<Stage[]> {
  const data = await fetchCmsAPI(`
    {
      stages {
        id
        name
        slug
        stream
        order
        description
        discord
        settings {
          title
          description
          metaTitle
          metaDescription
          metaImage {
            url
          }
        }
        schedule(sort: "start:asc") {
          id
          title
          start
          end
          description
          link
          speaker: speakers {
            id
            slug
            title
            bio
            name
            image {
              alternativeText
              width
              height
              url
              size
            }
            twitter
            github
            company
          }
        }
      }
    }
  `);

  return data.stages.map((stage: Stage) => ({
    ...stage,
    schedule: stage?.schedule.map((talk: Talk) => ({
      ...talk,
      speaker: talk?.speaker?.map((speaker: Speaker) => ({
        ...speaker,
        image: {
          ...serializeImage(speaker?.image)
        }
      }))
    }))
  }));
}
