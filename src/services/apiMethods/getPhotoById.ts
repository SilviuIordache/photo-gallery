import client from '../client/photoClient';

export default async function getPhotoById(
  id: string  
) {
  try {
    const result = await client.photos.show({ id });
    return result;
  } catch (error) {   
    console.error('Error fetching photos:', error);
    throw error;
  }
}
