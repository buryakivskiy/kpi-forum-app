import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "./Posts.css";
import Navigation from '../Navigation'
import { createPost } from '../../store/modules/posts/actions/postsAction';



const CreatePost = () => {

  const currentState = useSelector((state) => state);

  const [post, setPost] = useState({
    title:'',
    description: '',
  });
  const dispatch = useDispatch()

  const addPost = (postDetails) => dispatch(createPost(postDetails))

  const handleChange = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addPost({
      title: post.title,
      description: post.description,
    });
  }

  if(!currentState.Auth.isAuthenticated){
    return <Redirect to='/login' />
  }
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div className="post-style container App">
        <Card className="card-style">
          <CardHeader>Створити тему</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>Заголовок</Label>
            <Input type="text" name="title" placeholder="Введіть заголовок"  onChange={handleChange}/>
            { currentState.PostsState.postsError && currentState.PostsState.postsError.titleRequired ? (
              <small className="color-red"> Це поле обовʼязкове</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Зміст</Label>
            <Input type="textarea" cols="30" rows="6" name="description" id="" placeholder="Введіть коротки опис вашого питання/проблеми" onChange={handleChange} />
            { currentState.PostsState.postsError && currentState.PostsState.postsError.descriptionRequired ? (
              <small className="color-red">Це поле обовʼязкове</small>
              ) : (
                ""
              )}
            </FormGroup>

            { currentState.PostsState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Створення...
            </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
              >
              Створити тему
            </Button>
            )}
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default CreatePost
