import React from 'react'
import ProfilePage from "./Profile/ProfilePage"
import {Tabs,Tab}from"react-bootstrap"
import Auth from "../../../hoc/auth"
function User() {
  return (
    <div style={{marginTop : "5rem",Width: "80%"}}>
      <div style={{width : "100%" , padding : '1rem 6rem'}} >
        <Tabs margin='auto'
          defaultActiveKey="Profile"
          transition={false}
          id="noanim-tab-example"
          className="mb-3 w-8 tab"

            >
          <Tab eventKey="Profile" title="프로필">
          <ProfilePage/>
          </Tab>
          <Tab eventKey="security" title="보안" >
            계정 설정 바꾸는 곳
          </Tab> 
          </Tabs>
          </div>
    </div>
  )
}

export default Auth(User,true)