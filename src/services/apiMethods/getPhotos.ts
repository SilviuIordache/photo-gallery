import client from '../client/photoClient';

export default async function getPhotos(query: string) {
  try {
    const result = await client.photos.search({ query, per_page: 1 });
    return result;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}
