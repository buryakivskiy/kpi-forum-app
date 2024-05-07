import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import "./Auth.css";
import Navigation from '../Navigation'
import { SignIn } from '../../store/modules/auth/actions/authAction';




const Login = () => {

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const userLogin = (credentials) => dispatch(SignIn(credentials))


  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    userLogin({
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
          <CardHeader>Увійти</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <div className="mb-2">
            { currentState.loginError ? (
              <small className="color-red">{currentState.loginError}</small>
              ) : (
                ""
            )}
          </div>
          <FormGroup>
            <Label>Електронна пошта</Label>
            <Input type="email" name="email" placeholder="Введіть вашу пошту" onChange={handleChange} />
            { currentState.loginError && currentState.loginError.Required_email ? (
              <small className="color-red">{currentState.loginError.Required_email}</small>
              ) : (
                ""
            )}
            { currentState.loginError && currentState.loginError.Invalid_email ? (
              <small className="color-red">{ currentState.loginError.Invalid_email }</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Пароль</Label>
            <Input type="password" name="password" placeholder="Введіть пароль" onChange={handleChange}/>
            { currentState.loginError && currentState.loginError.Required_password ? (
              <small className="color-red">{ currentState.loginError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.loginError && currentState.loginError.Invalid_password ? (
              <small className="color-red">{ currentState.loginError.Invalid_password }</small>
              ) : (
                ""
              )}
              { currentState.loginError && currentState.loginError.Incorrect_password ? (
              <small className="color-red">{ currentState.loginError.Incorrect_password }</small>
              ) : (
                ""
              )}
            </FormGroup>

            { currentState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Заходжу в акаунт...
              </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
                disabled={ user.email === "" || user.password === ""  }
              >
                Увійти
            </Button>
            )}
            </form>
            <div className="mt-2" style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                <small><Link to="/signup" style={{color: "#007bff"}}>Бажаєте створити акаунт?</Link></small>
              </div>
            </div>
           
            </CardBody>
          </Card>
        </div>
        

        </div>
    );
}

export default Login

