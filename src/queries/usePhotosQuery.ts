import { useQuery } from '@tanstack/react-query';
import fetchPhotos from '../services/apiMethods/getPhotos';
import { PhotosWithTotalResults, ErrorResponse } from 'pexels';

interface Props {
  query: string;
  per_page?: number;
}

const usePhotosQuery = (props: Props) => {
  return useQuery<PhotosWithTotalResults | ErrorResponse>({
    queryKey: ['photos', props.query],
    queryFn: () => fetchPhotos(props.query, props.per_page),
    staleTime: 1000 * 60 * 8,
  });
};

export default usePhotosQuery;
