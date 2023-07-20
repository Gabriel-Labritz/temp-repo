import { useEffect, useState, useCallback } from 'react';
import { getPosts } from '../../utils/get-posts';
import Posts from '../../components/Posts/Posts';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import './Home.css';

function Home() {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [inputValue, setInputValue] = useState('');

  const handleGetPosts = useCallback(async (page, postsPerPage) => {
    const postsWithPhotos = await getPosts();

    setPosts(postsWithPhotos.slice(page, postsPerPage));
    setAllPosts(postsWithPhotos);
  }, [])

  const handleGetMorePost = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  }

  useEffect(() => {
    handleGetPosts(0, postsPerPage);
  }, [handleGetPosts, postsPerPage]);

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = inputValue ? allPosts.filter(post => {
    return post.title.toLowerCase().includes(inputValue.toLowerCase());
  }) : posts;

  return (
    <>
      <section className='container'>
        <div className='search-container'>
          <Input inputValue={inputValue} handleChange={handleChange} />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <p>Não existem posts !</p>
        )}
        <div className='button-area'>
          {!inputValue && (
            <Button
              text="Load more posts"
              getPosts={handleGetMorePost}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
