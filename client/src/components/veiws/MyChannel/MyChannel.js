import React from 'react'
import Auth from '../../../hoc/auth'
import{Tabs,Tab,Form} from 'react-bootstrap'
import{List, Avatar} from'antd'
import { useSelector } from "react-redux";
import ChannelHome from './Sections/ChannelHome'
import ChannelVideo from './Sections/ChannelVideo';
import Channel from './Sections/Channel';
import "./MyChannel.css"
import { useParams } from 'react-router-dom';


function MyChannel(props) {

  const uid= useParams()
    const user=useSelector(state=>state.user)

if(user&&user.userData){
    if(user.userData.uid===uid.uid){
      return (
        <div style={{width : "100%", marginTop : "3rem"}}>
            <div>
                <List.Item.Meta style={{width : "100%" , padding : '3rem 6rem'}} 
                              avatar={<Avatar style={{marginLeft : '1rem'}}src={`http://localhost:5000/${user.userData.image}`} size={80}/>}
                              title={<div style={{fontSize: '30px'}}>{user.userData.userName}</div>}
                              description={"구독자 수"}
                            />
        <div style={{width : "100%" , padding : '1rem 6rem'}} >
        <Tabs margin='auto'
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className="mb-3 w-8 tab"

            >
          <Tab eventKey="home" title="홈">
          <ChannelHome userEmail={user.userData.email}/>
          </Tab>
          <Tab eventKey="video" title={"동영상"} >
          <ChannelVideo userEmail={user.userData.email}/>
          </Tab>
          <Tab eventKey="channel" title="채널">
            <Channel/>
          </Tab> 
          </Tabs>
          </div>
            </div>
          </div>
          )
      }else{
        alert("존재하지 않는 페이지 입니다.")
      }
    }else{
        return null;
    }
  
}

export default Auth(MyChannel, true)