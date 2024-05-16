import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from 'react-icons/fa'
import './Posts.css';

import { fetchPostsByCategory } from '../../store/modules/posts/actions/postsAction';
import Post from './Post'
import Navigation from '../Navigation';

const PostsCategory = (props) => {
  const categoryId = props.match.params.categoryId

  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPostsByCategory(categoryId));

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentState = useSelector(state => state)

  const posts = currentState.PostsState.posts
  console.log(posts.length)

  return (
    <div id="page-container">
        <Navigation />
        <div className="container">
        { posts.length ? (posts.map((post) => {
            return (
                <div  className="mt-2 style-card" key={post.id}>
                     <Link to={'/posts/' + post.id} key={post.id}>
                    <Post post={post} key={post.id} />
                  </Link>
                </div>
            );
        })) : (
            <div className="text-center mt-4">
                <div style={{fontSize: "100px"}}><FaFilter /></div>
                <p className="mt-2">Схоже, за обраною категорією ще немає створених тем.</p>
                <p>Натисніть кнопку щоб перейти до інших категорій</p>
                <div className="mt-4">
                    <Link to="/" className="btn btn-primary">Перейти</Link>
                </div>
            </div>
        ) 
        }</div>
    </div>
  )
}

export default PostsCategory