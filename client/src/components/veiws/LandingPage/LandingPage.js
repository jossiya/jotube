import moment from 'moment'
import axios from 'axios';
import React,{useEffect, useState} from 'react';
// import { useSelector } from 'react-redux';
import Auth from '../../../hoc/auth'
// import {Row,Col} from'react-bootstrap'
import{Card,Avatar,Row,Col,Typography}from 'antd'
const { Title } = Typography;
const { Meta } = Card;


function LandingPage(props) {
  
  const [Video, setVideo] = useState([])

  
  useEffect(()=>{
    axios.get('/api/video/getVideo')
    .then(response=>{
      console.log(response.data)
      if(response.data.success){
        setVideo(response.data.videos)
  
      }else{
        alert('비디오를 가져올 수 없습니다.')
      }
    })
  },[])
  
  const renderCards = Video.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return <Col key={index} lg={6} md={8} xs={24}>
        
            <a href={`/video/${video.videoid}`} >
            <div  style={{ position: 'relative' }}>
            <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
            <div className=" duration"
                style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                fontWeight:'500', lineHeight:'12px' }}>
                <span>{minutes} : {seconds}</span>
            </div>
            </div>
            </a>
        <br />
        <Meta
            avatar={
                <Avatar src={`http://localhost:5000/${video.image}`} />
            }
            title={video.title}
        />
        <span>{video.name} </span><br />
        <span style={{ marginLeft: '3rem ' }}> {video.views}</span>
        <span> {moment(video.createdAt).format("MM월 DD일 YY년")} </span>
    </Col>

})



return (
    <div className='landig_page' style={{ width: '85% ', margin: '6rem auto ' } }>
        <Title level={2} > 조튜브 </Title>
        <hr />

        <Row gutter={[16, 16]}>

          
            {renderCards}
        
        </Row>
    </div>
)
}

export default Auth(LandingPage, null);