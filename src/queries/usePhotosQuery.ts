import { useQuery } from '@tanstack/react-query';
import getPhotos from '../services/apiMethods/getPhotos';
import { Photos, ErrorResponse } from 'pexels';

interface Props {
  query: string;
  per_page?: number;
  page?: number;
}

const usePhotosQuery = (props: Props) => {
  return useQuery<Photos | ErrorResponse>({
    queryKey: ['photos', props.query, props.page],
    queryFn: () => getPhotos(props.query, props.per_page, props.page),
    staleTime: 1000 * 60 * 8,
    gcTime: 1000 * 60 * 30,
  });
};

export default usePhotosQuery;
