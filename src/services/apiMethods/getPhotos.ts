import client from '../client/photoClient';

export default async function getPhotos(
  query: string,
  per_page?: number,
  page?: number
) {
  try {
    let result;

    if (query) {
      result = await client.photos.search({ query, per_page, page });
    } else {
      result = await client.photos.curated({ per_page, page });
    }

    return result;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}
