import { useQuery } from '@tanstack/react-query';
import { Photo, ErrorResponse } from 'pexels';
import getPhotoById from '../services/apiMethods/getPhotoById';

interface Props {
  id: string;
}

const usePhotoQuery = (props: Props) => {
  return useQuery<Photo | ErrorResponse>({
    queryKey: ['photo', props.id],
    queryFn: () => getPhotoById(props.id),
    staleTime: 1000 * 60 * 8,
  });
};

export default usePhotoQuery;
