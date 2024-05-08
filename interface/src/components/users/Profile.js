import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, CardBody, Col, Row, Form, CustomInput, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { updateUserAvatar, updateUser, deleteUser } from '../../store/modules/auth/actions/authAction';
import Default from '../../Assets/default.png'
import  './Profile.css'
import Message from '../utils/Message';




import Navigation from "../Navigation"

const Profile = () => {

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
    setModal(!modal);
  } 

  const currentUserState = useSelector((state) => state.Auth);
  
  const AuthID = currentUserState.currentUser ? currentUserState.currentUser.id : ""

  const dispatch = useDispatch()

  const userUpdate = (userDetails) => dispatch(updateUser(userDetails, clearInput))
  const deleteAccount = id => dispatch(deleteUser(id))

  const [user, setUser] = useState({
    username: currentUserState.currentUser.username,
    firstName: currentUserState.currentUser.firstName,
    lastName: currentUserState.currentUser.lastName,
    patronymic: currentUserState.currentUser.patronymic,
  })

  const clearInput = () => {
    setUser({
      ...user,
      current_password: "",
      new_password: ""
    })
  }

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  let imagePreview = (<img className="img_style" src={Default} alt="profile"/>);

  //incase someone visits the route manually
  if(!currentUserState.isAuthenticated){
    return <Redirect to='/login' />
  }

  const submitUser = (e) => {
    e.preventDefault()
    userUpdate({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic
    })
  }

  const shutDown = (e) => {
    e.preventDefault()
    deleteAccount(AuthID)
  }

  return (
    <Fragment>
      <Navigation />
      <div className="post-style container">
        <div className="card-style">
          <div className="text-center">
            <h4>Редагувати профіль</h4>
          </div>
          <Row className="mt-1">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                { currentUserState.authSuccessImage != null && currentUserState.avatarError == null ? (
                  <Message msg={currentUserState.authSuccessImage} />
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <CardBody>
            <div className="text-center mb-3">
                {imagePreview}
            </div>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
          <div style={{margin: "10px 0px 10px"}}>Пошта: <strong>{currentUserState.currentUser.email}</strong></div>
          </Col>
        </Row>

        <Form onSubmit={submitUser}>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">Нікнейм</Label>
                <Input type="text" name="username" value={user.username} onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">Імʼя</Label>
                <Input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">Прізвище</Label>
                <Input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">По батькові</Label>
                <Input type="text" name="patronymic" value={user.patronymic} onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                { currentUserState.isUpdatingUser ? (
                  <Button
                    color="primary"
                    type="submit"
                    block
                    disabled
                  >
                    Регагування...
                </Button>
                ) : (
                  <Button
                    color="primary"
                    type="submit"
                    block
                  >
                  Редагувати
                </Button>
                )}
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <Row className="mt-3">
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <FormGroup>
              <Button onClick={toggle}
                color="danger"
                type="submit"
                block
              >
              Видалити акаунт
              </Button>
            </FormGroup>
          </Col>
        </Row>
        </CardBody>

        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-center">Ви впевнені, що хочете видалити ваш акаунт?</ModalHeader>
        <ModalBody toggle={toggle} className="text-center">Це також видалить ваші теми, коментарі.</ModalBody>
        <ModalFooter>
        { currentUserState.isLoading ? (
              <button className="btn btn-danger"
                disabled
              >
                Видалення...
            </button>
            ) : (
              <button className="btn btn-danger"
                onClick={shutDown}
                type="submit"
              >
              Видалити
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Скасувати</Button>
        </ModalFooter>
      </Modal>
      </div>
    </div>
    
  </Fragment>
  )
}

export default Profile