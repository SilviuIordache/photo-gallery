import { useNavigate, useParams } from 'react-router-dom';

const ImageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      ImageDetails {id}
    </div>
  );
};

export default ImageDetails;
