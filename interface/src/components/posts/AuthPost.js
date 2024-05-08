import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import './Posts.css';
import Default from '../../Assets/default.png'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'
import EditPost from './EditPost';
import DeletePost from './DeletePost'



const AuthPost = ({ post }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser.id

  const $imagePreview = (<img className="img_style_post" src={Default} alt="no one 2"/>);
  
  return (
    <Card className="style-card-main">
      <CardBody className="style-card-body">
      <CardTitle>
        <span>
          <span className="mr-2">
            {$imagePreview}
          </span>
          <span href="" style={{fontWeight: 'bold'}}>{post.user.username}</span>
        </span>
        <span style={{float: 'right'}}>
          <Moment fromNow>{post.created_at}</Moment>
        </span>
        </CardTitle>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{post.description}</CardText>
        <div className="style-fav">
        { authID ? (
            <>
              <Likes postID={post.id} />
              <Comments postID={post.id} />
            </>
            ) : ""}
          { authID === post.user.id ? (
            <div className="ml-auto">
              <span style={{marginRight: "20px"}}>
                <EditPost post={post} />
              </span>
              <span>
                <DeletePost postID={post.id} />
              </span>
            </div>
          ) : ""}
        </div>
      </CardBody>
    </Card>
  )
}

export default AuthPost