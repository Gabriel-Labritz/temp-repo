import PropTypes from 'prop-types';

import './PostCard.css';

function PostCard({ cover, title, body }) {

  return (
    <div className='post'>
      <img src={cover} alt="imagem do post" />
      <div className='post-card'>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  id: PropTypes.number,
  cover: PropTypes.any,
  title: PropTypes.string,
  body: PropTypes.string
}

export default PostCard;