import { Component } from 'react';
import { getPosts } from '../../utils/get-posts';
import Posts from '../../components/Posts/Posts';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import './Home.css';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    inputValue: ''
  };

  async componentDidMount() {
    await this.getPosts();
  }

  getPosts = async () => {
    const {page, postsPerPage } = this.state;

    const postsWithPhotos = await getPosts();
    this.setState({ 
      posts: postsWithPhotos.slice(page, postsPerPage), // 6
      allPosts: postsWithPhotos 
    });
  }

  handleGetMorePost = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage; 
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts); 

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ inputValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, inputValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = inputValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(inputValue.toLowerCase());
    }): posts;

    return (
      <>
        <section className='container'>
          <div className='search-container'>
            <Input inputValue={inputValue} handleChange={this.handleChange}/>
          </div>
          { filteredPosts.length > 0 && (
            <Posts posts={filteredPosts}/>
          ) }
          { filteredPosts.length === 0 && (
            <p>Não existem posts !</p>
          ) }
          <div className='button-area'>
            { !inputValue && (
              <Button 
               text="Load more posts" 
               getPosts={this.handleGetMorePost}
               disabled={noMorePosts}
             />
            ) }
          </div>
        </section>
      </>
    )
  }
}

export default Home;
