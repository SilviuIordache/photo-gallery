import { useNavigate } from 'react-router-dom';
import usePhotoQuery from '../../queries/usePhotoQuery';
import { Photo } from 'pexels';

interface Props {
  id: string;
}

const ImageDetails = (props: Props) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = usePhotoQuery({ id: props.id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !('src' in data)) return <div>No photo found</div>;
  const photo = data as Photo;

  return (
    <div>
      <div className="flex justify-between items-start">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md fixed top-0 left-0 m-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <img
          src={photo.src.large}
          alt={photo.alt || ''}
          className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
        />

        <div className="text-start">
          <p className="text-sm text-gray-500">
            Author: <a href={photo.url}>{photo.photographer}</a>
          </p>

          <div>
            <h1 className="text-sm text-gray-500">{photo.alt}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
