
import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import {Navbar, Container, Nav, NavDropdown}from 'react-bootstrap'
import axios from 'axios';
// import {YoutubeOutlined}from '@ant-design/icons'

import { useNavigate } from 'react-router-dom';
const Logo = require('../../../assets/images/jotube.png');
// import Auth from "../../../hoc/auth"

function NavBar(state) {
  const user = useSelector(state => state.user)
  const navigate=useNavigate()
  //logout
  
  const  LogoutHandler=(e)=>{
    e.preventDefault();
      axios.get('/api/logout')
      .then(response=>{
        if(response.status === 200){
          navigate("/login")
        }else {
          alert('로그아웃 오류')
        }
      })

 }
  const loUnReroad=(e)=>{
    e.preventDefault();
    navigate('/login')
  }
  const regiUnReroad=(e)=>{
    e.preventDefault();
    navigate('/register')
  }
  const videoUploadHandle=(e)=>{
    e.preventDefault();
    navigate('/video/upload')
  }
  if (user.userData) {
    console.log(user.userData.email)
  if (user.userData&&!user.userData['isAuth']) {
    console.log('유저정보 없는 네브바')
    return (
      
      <Navbar  collapseOnSelect expand="lg" bg="light"  text='primary' fixed="top">
      <Container fluid style={{   }}>
          <Navbar.Brand href="/"><img src={Logo} alt="Logo" style={{ width: '150px', marginTop: '-5px' }} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/video">Video</Nav.Link>
              <Nav.Link href="/Subscription">Subscribe</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#/login" onClick={loUnReroad}>로그인</Nav.Link>
              <Nav.Link  href="#/register" onClick={regiUnReroad}>
                회원가입
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );  
    }
    else{
      console.log('유저 정보 있는 네브바')
      return ( 
        <Navbar collapseOnSelect expand="lg"  bg="light"  variant="light"  text='primary' fixed="top" style={{ }} >
         <Container  fluid>
            <Navbar.Brand href="/" ><img src={Logo} alt="Logo" style={{ width: '150px', marginTop: '-5px' }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" style={{ }}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Subscription">Subscribe</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
              <Nav.Link  href="/video/upload" onClick={videoUploadHandle}>
                업로드
              </Nav.Link>
                <Nav.Link  href="#" onClick={LogoutHandler} >
                  로그아웃
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </Container >
        </Navbar>
        
      );
        
    }
  } else {
    return null
  }
      
  }

export default NavBar