import { fetchCmsAPI, serializeLink } from '@lib/cms-provider/utils';
import { Link, Global, Page, Settings } from '@lib/types';

export async function getGlobal(): Promise<Global> {
  const data = await fetchCmsAPI(`
    {
      global {
        navigation {
          links {
            text
            url
          }
        }
        edito {
          homeTitle 
          homeSubtitle
          joinTitle
          joinSubtitle
          learnMore
        }
        footer {
          credits
          links {
            text
            url
          }
        }
        eventDate
      }
    }
  `);

  const formattedDate = new Date(data?.global?.eventDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedShortDate = new Date(data?.global?.eventDate).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    ...data.global,
    navigation: {
      links: data?.global?.navigation?.links?.map((link: Link) => serializeLink(link))
    },
    footer: {
      ...data?.global?.footer,
      links: data?.global?.footer?.links?.map((link: Link) => serializeLink(link))
    },
    eventDate: {
      standard: formattedDate,
      short: formattedShortDate
    }
  };
}

async function getPages(): Promise<Page[]> {
  const data = await fetchCmsAPI(`
    {
      pages {
        id
        type
      }
    }
  `);

  return data.pages;
}

export async function getSettings(type: string): Promise<Settings> {
  const pages = await getPages();
  const currentPage = pages.find((page: Page) => page.type === type);

  if (!currentPage) return {};

  const data = await fetchCmsAPI(`
    {
      page(id: ${currentPage.id}) {
        settings {
          metaTitle
          metaDescription
          metaImage {
            url
          }
          title
          description
        }
      }
    }
  `);

  return data.page.settings;
}
