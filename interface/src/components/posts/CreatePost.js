import React, { useState, useEffect } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "./Posts.css";
import Navigation from '../Navigation'
import { createPost } from '../../store/modules/posts/actions/postsAction';
import { fetchCategories } from "../../store/modules/categories/actions/categoriesAction";



const CreatePost = () => {

  const currentState = useSelector((state) => state);

  const [post, setPost] = useState({
    title:'',
    description: '',
    categoryId: 4,
  });
  const dispatch = useDispatch()

  const categories = currentState.CategoriesState.categoryItems

  const addPost = (postDetails) => dispatch(createPost(postDetails))
  const getCategories = () => dispatch(fetchCategories())

  useEffect(() => {
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      categoryId: Number(post.categoryId),
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
          <FormGroup>
                <Label>Категорія</Label>
                <Input type="select" name="categoryId" onChange={handleChange}>
                  <option value={4}>Виберіть категорію</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Input>
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
