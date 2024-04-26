import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import "./Auth.css";
import Navigation from '../Navigation'
import { SignUp } from '../../store/modules/auth/actions/authAction';



const Register = () => {

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    username:'',
    firstName:'',
    lastName:'',
    patronymic: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addUser({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      email: user.email,
      password: user.password
    });
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

    return (
      <div className="App" id="page-container">
        <div>
          <Navigation />
        </div>
        <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Вітаємо на IPZE-FORUM</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <div className="mb-2">
            { currentState.signUpError ? (
              <small className="color-red">{currentState.signUpError}</small>
              ) : (
                ""
            )}
          </div>
          <FormGroup>
            <Label>Нікнейм</Label>
            <Input type="text" name="username" placeholder="Введіть нікнейм"  onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label>Імʼя</Label>
            <Input type="text" name="firstName" placeholder="Введіть імʼя"  onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label>Прізвище</Label>
            <Input type="text" name="lastName" placeholder="Введіть прізвище"  onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label>По батькові</Label>
            <Input type="text" name="patronymic" placeholder="Введіть по батькові"  onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label>Електронна пошта</Label>
            <Input type="email" name="email" placeholder="Введіть пошту" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
            <Label>Пароль</Label>
            <Input type="password" name="password" placeholder="Введіть пароль" onChange={handleChange}/>
            </FormGroup>
            { currentState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Реєстрація...
            </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
                disabled={ user.username === "" || user.email === "" || user.password === ""  }
              >
                Зареєструвати
            </Button>
            )}
            </form>
            <div className="mt-2">
              <small>Уже маєте акаунт? <Link to="/login">Увійти</Link></small>
            </div>
            </CardBody>
          </Card>
        </div>
        
      </div>
    );
}

export default Register
