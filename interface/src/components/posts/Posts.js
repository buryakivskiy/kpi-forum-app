import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Posts.css';

import { fetchPosts } from '../../store/modules/posts/actions/postsAction';
import Post from './Post'


const Posts = () => {

  console.log(1)
  const postsSelector = useSelector((state) => state.PostsState);
  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPosts());
  console.log(2)

  useEffect(() => {
    console.log('init')
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(3)

  return (
    <div className="container">{
      postsSelector.posts?.map((post) => {
        return (
          <div  className="mt-2 style-card" key={post.id}>
             <Link to={'/posts/' + post.id} key={post.id}>
              <Post post={post} key={post.id} />
            </Link>
          </div>
        );
      })
    }</div>
  )
}

export default Posts
