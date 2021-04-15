import { fetchCmsAPI, serializeImage } from '@lib/cms-provider/utils';
import { Sponsor } from '@lib/types';

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
  {
    sponsors(sort: "name:asc") {
      id
      slug
      name
      website
      twitter
      facebook
      linkedin
      instagram
      description
      callToAction
      callToActionLink
      discord
      links {
        text
        url
      }
      youtubeSlug
      tier
      tierRank
      cardImage {
        alternativeText
        width
        height
        url
      }
      logo {
        alternativeText
        width
        height
        url
        size
      }
      settings {
        title
        description
        metaTitle
        metaDescription
        metaImage {
          url
        }
      }
    }
  }  
  `);

  return data.sponsors.map((sponsor: Sponsor) => ({
    ...sponsor,
    logo: {
      ...serializeImage(sponsor?.logo)
    },
    cardImage: {
      ...serializeImage(sponsor?.cardImage),
      sizes: '400px, (min-width: 1280px) 350px'
    }
  }));
}

export async function getSponsor(slug: string): Promise<Sponsor> {
  const data = await fetchCmsAPI(`
  {
    sponsors(where: {slug: "${slug}"}) {
      id
      slug
      name
      tier
      cardImage {
        url
      }
      logo {
        url
      }   
    }
  }  
  `);

  const sponsor = data?.sponsors?.[0] ?? null;

  return {
    ...sponsor,
    cardImage: {
      ...serializeImage(sponsor?.cardImage)
    },
    logo: {
      ...serializeImage(sponsor?.logo)
    }
  };
}
