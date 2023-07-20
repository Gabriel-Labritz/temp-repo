export const getPosts = async () => {
  const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsjson = await posts.json();
  const photosJson = await photos.json();

  const postsWithPhotos = postsjson.map((post, index) => {
    return { ...post, cover: photosJson[index].url }
  });

  return postsWithPhotos;
}