import axios from 'axios'
import React, { useState } from 'react'
import{Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
function Comment(props) {
  const videoid= useParams()
  const [commentValue, setcommentValue] = useState('')
  
  const handleClick=(e)=>{
    setcommentValue(e.currentTarget.value)
  }
// console.log(props.userFrom)
  const onSubmit=(e)=>{
    e.preventDefault();
    
    const variable={
      content : commentValue,
      writer : props.userFrom,
      videoId : videoid.videoid,
    }
    // console.log(variable.videoId)
    axios.post('/api/comment/saveComment', variable)
    .then(response=>{
      if(response.data.response.success){
        // console.log('commentInfo:',response.data.result)
        props.refreshFunction(response.data.result)
        setcommentValue("")
      }else{
        // console.log('commentInfo:',response.data)
        alert('댓글 저장을 하지 못했습니다.')
      }
    })
  }

  // console.log("코맨트",props.commentList)

if(props&&props.userFrom!==undefined){
  // console.log(props.userFrom)
  return (
    <div>
      <br/>
      <p>댓글</p>
      <hr/>
      {props.commentList&&props.commentList.map((comment, index)=>(
        ((!comment.responseTo&&
        <React.Fragment key={index}>
          <SingleComment  refreshFunction={props.refreshFunction}  comment={comment} userFrom={props.userFrom}/>
          <ReplyComment  refreshFunction={props.refreshFunction} parentCommentId={comment.commentid} commentList={props.commentList} userFrom={props.userFrom}/>
        </React.Fragment>
       
        ))
      ))}

      <SingleComment refreshFunction={props.refreshFunction} userFrom={props.userFrom} commentList={props.commentList}/>

    <Form className ='d-flex' >
      <Form.Control as = 'textarea' className='w-100 br-5'
       value={commentValue} 
       onChange={handleClick} 
       placeholder='코멘트를 입력해주세요.'/>
      <Button variant="outline-dark" style={{width : '15%' ,heigh : '52px'}}
        onClick={onSubmit}>댓글</Button>

    </Form>
    </div>
  )
}else{return null;}
  
}

export default Comment