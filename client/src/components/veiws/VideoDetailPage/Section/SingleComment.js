import React, { useState } from 'react'
import {Comment, Avatar} from 'antd';
import{Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import LikeDisLikes from './LikeDisLikes'
import axios from 'axios';


function SingleComment(props) {

    // console.log('싱글',props.comment)
    const videoid= useParams()
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue]= useState("")
    const onClickOpenReply=()=>{
        setOpenReply(!OpenReply)
    }

   const CommentHandle=(e)=>{
    setCommentValue(e.currentTarget.value)
   }
   const onSubmit=(e)=>{
    e.preventDefault();
    console.log("아이고:",props.comment.commentid)
    const variable={
        content : CommentValue,
        writer : props.userFrom,
        videoId : videoid.videoid,
        responseTo : props.comment.commentid
      }
      console.log(variable.videoId)
      axios.post('/api/comment/saveComment', variable)
      .then(response=>{
        if(response.data.response.success){
          props.refreshFunction(response.data.result)
          setCommentValue("")
          setOpenReply(false)
          console.log('최근 결과 값:',response.data.result)
        }else{
          alert('댓글 저장을 하지 못했습니다.')
        }
      })
   }
   
      const actions=[props.comment&&<LikeDisLikes  userId={props.userFrom} commentId={props.comment.commentid}/>,
    <span onClick={onClickOpenReply} key='comment-basic-reply-to'>댓글</span>
 ]

  //  console.log('싱글',props.comment)
  if(props.comment){
    return (
   
        <div>
            <Comment
                actions={actions}
                author={props.comment.name}
                avatar={<Avatar src={props.comment.image} alt ='댓글'/>}
                content={<p>{props.comment.content}</p>}
            />
       {OpenReply&&  <Form className ='d-flex' onSubmit={onSubmit}>
          <Form.Control as = 'textarea' className='w-100 br-5'
           value={CommentValue}
           onChange={CommentHandle}
           placeholder='코멘트를 입력해주세요.'/>
          <Button variant="outline-dark" style={{width : '15%' ,heigh : '52px'} } onClick={onSubmit}
            >댓글</Button>
    
        </Form>
        }
        </div>
      )
  }else{return null;}
}

export default SingleComment