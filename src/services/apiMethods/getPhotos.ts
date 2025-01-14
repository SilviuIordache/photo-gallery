import client from '../client/photoClient';

export default async function fetchPhotos(query: string, per_page?: number) {
  try {
    const result = await client.photos.search({ query, per_page });
    return result;
  } catch (error) {   
    console.error('Error fetching photos:', error);
    throw error;
  }
}
