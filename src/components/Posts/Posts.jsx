import PropTypes from 'prop-types';
import PostCard from "../PostCard/PostCard";

import './Posts.css';

function Posts({ posts }) {
  return (
    <div className='posts'>
      { posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            cover={post.cover}
          />
        );
      }) }
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts;