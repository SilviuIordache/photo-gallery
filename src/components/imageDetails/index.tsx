import { useParams } from 'react-router-dom';
import ImageDetails from './ImageDetails';

const ImageDetailsPage = () => {
  const { id } = useParams();

  if (!id) return <div>No photo ID provided</div>;

  return <ImageDetails id={id} />;
};

export default ImageDetailsPage;
