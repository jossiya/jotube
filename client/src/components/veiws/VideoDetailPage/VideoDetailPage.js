import React, { useEffect, useState } from 'react'
import Auth from '../../../hoc/auth'
import{Row, Col, List, Avatar} from'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
import Comment from './Section/Comment'
import LikeDisLikes from './Section/LikeDisLikes'
import { useSelector,shallowEqual } from 'react-redux'

function VideoDetailPage(props) {

  const { user} = useSelector(
    (state) => ({
      user: state.user.userData
    }),
    shallowEqual
  );

    const videoid= useParams()
    const variable={
        videoid :videoid
    }
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    
    useEffect(() => {
      axios.post('/api/video/getVideoDetail',variable)
      .then(response=>{
        if(response.data.success){
            console.log('detail:',response.data)
            
            setVideoDetail(response.data.video)
        }else{

            alert('영상을 받아오지 못했습니다.')
        }
      });

      axios.post('/api/comment/getComment',variable)
      .then(response=>{
        if(response.data.success){
          setComments(response.data.comments)
          // console.log(response.data.comments)
        }else{
          alert('코맨트 정보를 가져오지 못했습니다.')
        }
    })
    
    },[])
    const refreshFunction=(newComment)=>{
      setComments(Comments.concat(newComment))
    }

    if (user) {
      // console.log('프롭스 이메일:',props.user.email)
     if(VideoDetail.writer) {

      const subscribeButton= VideoDetail.writer !==props.user.email && <Subscribe userTo={VideoDetail.writer} userFrom={props.user.email} />
    
      // console.log('디테일 정보:',VideoDetail)
      return(
        <Row gutter={[16, 16]}>
            <Col lg={19} xs={24}>
              
            <div style={{width:'100%',padding : '3rem 2rem',marginTop :'1rem' }} >
            <video  style={{ width: '98%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls autoPlay loop={true} muted={false}></video>
            <div>{VideoDetail.title}</div>
                <List.Item 
                    actions={[<LikeDisLikes video userId={props.user.email} videoId={videoid}/>,subscribeButton]}
                >
                <a></a>
                <List.Item.Meta
                avatar={<Avatar src={`http://localhost:5000/${VideoDetail.image}`}/>}
                title={<a href={"#"}>{VideoDetail.name}</a>}
                description={VideoDetail.description}
                />
                </List.Item>
                {/* Comments */}
                 <Comment refreshFunction={refreshFunction} commentList={Comments} userFrom={props.user.email} />
                
            </div>
            </Col>
            <Col lg={5} xs={24}>
                <SideVideo/>
            </Col>
    
        </Row>
      )
    }
    else {
      return (
          <div>Loading...</div>
      )
  }
    } else {
      return null
  }
    

  
    
}

export default Auth(VideoDetailPage, null)