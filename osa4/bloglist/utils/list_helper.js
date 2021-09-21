const lodash = require('lodash');

const dummy = () => 0;

const totalLikes = (blogList) => blogList.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogList) => (
  blogList.reduce((max, blog) => (blog.likes > max.likes ? blog : max))
);

const mostBlogs = (blogList) => {
  const countedByAuthor = lodash.countBy(blogList, (blog) => blog.author);
  const names = lodash.keys(countedByAuthor);
  const numberOfBlogs = lodash.values(countedByAuthor);

  const idxOfMostBlogs = numberOfBlogs.reduce((maxIdx, n, idx, arr) => (
    (n > arr[maxIdx] ? idx : maxIdx)));

  return { author: names[idxOfMostBlogs], blogs: numberOfBlogs[idxOfMostBlogs] };
};

const mostLikes = (blogList) => {
  const groupedByAuthor = lodash.groupBy(blogList, 'author');
  const likesByAuthor = lodash.flatMap(groupedByAuthor, (blogsByAuthorArray) => {
    const numberOfLikes = blogsByAuthorArray.reduce((sum, blog) => sum + blog.likes, 0);
    return { author: blogsByAuthorArray[0].author, likes: numberOfLikes };
  });
  const mostLikedIdx = likesByAuthor.reduce((maxIdx, author, idx, arr) => (
    arr[maxIdx].likes > author.likes ? maxIdx : idx), 0);

  return likesByAuthor[mostLikedIdx];
};
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
