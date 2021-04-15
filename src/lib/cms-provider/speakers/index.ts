import { fetchCmsAPI, serializeImage } from '@lib/cms-provider/utils';
import { Speaker } from '@lib/types';

export async function getAllSpeakers(): Promise<Speaker[]> {
  const data = await fetchCmsAPI(`
  {
    speakers(sort: "name:asc") {
      id
      title
      company
      bio
      slug
      name
      settings {
        title
        description
        metaTitle
        metaDescription
        metaImage {
          url
        }
      }
      image {
        alternativeText
        width
        height
        url
        size
      }
      twitter
      linkedin
      github
      talk {
        id
        title
        start
        end
        description
        link
      }   
    }
  }  
  `);

  return data.speakers.map((speaker: Speaker) => ({
    ...speaker,
    image: {
      ...serializeImage(speaker?.image),
      sizes: '400px, (min-width: 1280px) 250px'
    }
  }));
}

export async function getSpeaker(slug: string): Promise<Speaker> {
  const data = await fetchCmsAPI(`
  {
    speakers(where: {slug: "${slug}"}) {
      id
      title
      company
      bio
      slug
      name
      image {
        alternativeText
        width
        height
        url
        size
      }
      cardPortrait {
        url
      }
      twitter
      linkedin
      github
      talk {
        id
        title
        start
        end
        description
        link
      }   
    }
  }  
  `);

  const speaker = data?.speakers?.[0] ?? null;

  return {
    ...speaker,
    image: {
      ...serializeImage(speaker?.image),
      sizes: '350px, (min-width: 1280px) 250px'
    }
  };
}
