import React, { useEffect, useState } from 'react'
// import {Row,Col,}from 'antd'
import {Card,Row,Col} from 'react-bootstrap'
import axios from 'axios';
// const Meta = Card;
function ChannelHome(props) {
  const [Video, setVideo] = useState([])

  useEffect(() => {
    const variable={
      userEmail : props.userEmail
    }
    axios.post('/api/mychannel/video',variable)
    .then(response=>{
      if(response.data.success){
        console.log(response.data)
        console.log(response.data.myVideos)
        setVideo(response.data.myVideos)
      }else{
        alert('내 채널에 동영상을 받아오지 못했습니다.')
      }
    })
  }, [])

  const renderCards = Video.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
     return <Col key={index} sm ={6}lg={2} md={{ span: 4}} xs={6}>
         <a href={`/video/${video.videoid}`} style={{textDecoration:'none', color :"black" }} >
            {/* <div  style={{ position: 'relative' }}>
            <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
            
            <div className=" duration"
                style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                fontWeight:'500', lineHeight:'12px' }}>
                <span>{minutes} : {seconds}</span>
            </div>
            </div>
            <div></div>{video.title} */}
            <Card border="light"  >
            <Card.Img variant="top" src={`http://localhost:5000/${video.thumbnail}`}/>
            <div className=" duration"
                style={{ bottom: '60PX', right:0, position: 'absolute', margin: '0px', 
                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                fontWeight:'500', lineHeight:'12px' }}>
                <span>{minutes} : {seconds}</span>
            </div>
            <Card.Body>
            <Card.Title style={{fontSize : "1rem"}}>{video.title} </Card.Title>
            </Card.Body>
          </Card>
            {/* <Meta 
            title={video.title}
            /> */}
          </a>
        </Col>
        })
  console.log(Video)
  return (
    <div>
        <div className='d-flex justify-content-between'>
          <div>
            업로드한 비디오
          </div>
        </div>
        <br/>
        <br/>
        <Row>
        {renderCards}
        </Row>
    </div>
  )
}

export default ChannelHome