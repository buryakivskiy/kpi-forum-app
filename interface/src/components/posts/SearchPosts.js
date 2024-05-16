import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from 'react-icons/fa'
import './Posts.css';

import { fetchPosts } from '../../store/modules/posts/actions/postsAction';
import Post from './Post'
import Navigation from '../Navigation';


const SearchPosts = ({ location }) => {
  const search = location.search.substring(7);

  const postsSelector = useSelector((state) => state.PostsState);
  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPosts(search));

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const posts = postsSelector.posts

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
                <p className="mt-2">Схоже, за вашим пошуком ще немає створених тем.</p>
                <p>Натисніть кнопку щоб перейти до інших тем</p>
                <div className="mt-4">
                    <Link to="/" className="btn btn-primary">Перейти</Link>
                </div>
            </div>
        ) 
        }</div>
    </div>
  )
}

export default SearchPosts