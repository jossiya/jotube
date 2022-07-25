
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import {Navbar, Container, Nav, NavDropdown, Offcanvas,Form,FormControl,Button}from 'react-bootstrap'
import {AiOutlineMenu,AiOutlineUpload,AiOutlineHome,AiOutlineCompass,AiFillPlaySquare,AiOutlineLike}from 'react-icons/ai'
import {MdSubscriptions} from 'react-icons/md'
import{List, Avatar} from'antd'
// import styled from 'styled-components'
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
  
  //스타일링
  // const Menubar = styled.div`
  // @media screen and (min-width: 992px) {
  //     display: none;    
  // }`
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  //랜더링 시작
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
              <Nav.Link href="/">Home</Nav.Link>
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
      console.log('유저 정보 있는 네브바',user.userData.image)
      return ( 
          <Navbar key="lg" bg="light" expand="lg" className="mb-3" fixed='top' style={{marginBottom : '1rem'}}>
            <Container fluid >
            <div className='d-flex'>
            {/* <Button variant="light" onClick={handleShow}> */}
            <AiOutlineMenu onClick={handleShow} style={{ margin :"8px"}} size ='2rem'/>
            
            <Offcanvas show={show} onHide={handleClose} style={{width :"20em"}}>
                <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        <img src={Logo} alt="Logo" style={{ width: '150px', marginTop: '-5px' }} />
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav  className="justify-content-end flex-grow-1 pe-3"   >
                          <Nav.Link className='text-secondary' href="/"> <AiOutlineHome style={{marginTop: '-5px' }} size ='18px'/> 홈</Nav.Link>
                          <Nav.Link className='text-secondary' href="/Subscription"><MdSubscriptions style={{marginTop: '-5px' }} size ='18px' /> 구독</Nav.Link>
                          <Nav.Link className='text-secondary' href="/"><AiOutlineCompass style={{marginTop: '-5px' }} size ='18px'/> 탐색</Nav.Link>
                          <NavDropdown.Divider />
                          <Nav.Link className='text-secondary' href="/"><AiFillPlaySquare style={{marginTop: '-5px' }} size ='18px'/> 내 동영상</Nav.Link>
                          <Nav.Link className='text-secondary' href="/"><AiOutlineLike style={{marginTop: '-5px' }} size ='18px'/> 좋아요 한 동영상</Nav.Link>
                          <NavDropdown.Divider />
                          <Offcanvas.Title className='text-secondary' > 구독</Offcanvas.Title>
                        </Nav>
                      </Offcanvas.Body>
            </Offcanvas>
              <Navbar.Brand href="/"><img src={Logo} alt="Logo" style={{ width: '150px', marginLeft:"1rem",marginTop: '-5px' }} /></Navbar.Brand>
              </div>
              <div className='d-flex'>
              <Nav>
              <Nav.Link href="/" onClick={videoUploadHandle}><AiOutlineUpload size="2rem" /></Nav.Link>
              </Nav>
              
              <NavDropdown 
              //개인 정보 관리 
                      title={<Avatar style={{margin: "auto"}}src={`http://localhost:5000/${user.userData.image}`}/>}
                      align={'end'}
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                    <List.Item.Meta
                      avatar={<Avatar style={{marginLeft : '1rem'}} src={`http://localhost:5000/${user.userData.image}`}/>}
                      title={user.userData.userName}
                      description={<a href={`/User/${user.userData.uid}`}>계정관리</a>}
                    />
                    
                    <NavDropdown.Divider />
                      <NavDropdown.Item href={`/MyChannel/${user.userData.uid}`}>내 채널</NavDropdown.Item>
                      <NavDropdown.Item href="/logout" onClick={LogoutHandler}>
                        로그아웃
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#">
                        설정
                      </NavDropdown.Item>
                    </NavDropdown>
                    </div>
            </Container>
          </Navbar>
      );
    }
  } else {
    return null
  }
      
  }

export default NavBar