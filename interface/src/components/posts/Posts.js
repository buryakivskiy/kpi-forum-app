import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Posts.css';

import { fetchPosts } from '../../store/modules/posts/actions/postsAction';
import Post from './Post'


const Posts = () => {

  const postsSelector = useSelector((state) => state.PostsState);
  const dispatch = useDispatch();

  // console.log("this is the post state: ", postsSelector)

  const getPosts = () => dispatch(fetchPosts());

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let posts = postsSelector.posts.map((post) => {
    return (
      <div  className="mt-2 style-card" key={post.id}>
        <Link to={'/posts/' + post.id} key={post.id}>
          <Post post={post} key={post.id} />
        </Link>
      </div>
    );
  })

  const post = {
    id: 1,
    author: {
      username: "Serhiy",
    },
    created_at: "21.09.2002",
    title: "New Post!!!",
    content: "DAfdsfsfsdfsfdsfdsff",
  };

  return (
    <div className="container">
      {(<div  className="mt-2 style-card" key={1}>
        <Link to={'/posts/' + 1} key={1}>
          <Post post={post} key={1} />
        </Link>
      </div>)}
    </div>
  )
}

export default Posts
