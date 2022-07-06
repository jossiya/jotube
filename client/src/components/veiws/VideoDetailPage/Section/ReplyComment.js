import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'
function ReplyComment(props) {

    const [childCommentNumber, setchildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState()
    useEffect(() => {
      
        let commentNumber = 0;
        props.commentList.map((comment)=>{
            if(comment.responseTo===props.parentCommentId){
                commentNumber++
                
            }
    })
    setchildCommentNumber(commentNumber)
    }, [props.commentList])
    

    const renderReplyComment=(parentCommentId)=>
        props.commentList.map((comment, index)=>(
        
        <React.Fragment key={index}>
            {console.log('리플 아이디',comment.responseTo)}
            {console.log('flvmf 2',parentCommentId)}
        {comment.responseTo===parentCommentId&&
            <div style={{width : '80%', marginLeft : "40px"}}>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} userFrom={props.userFrom}/>
            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment.commentid} commentList={props.commentList} userFrom={props.userFrom}/>
            </div>
            
        }
        </React.Fragment>
        ))
    const onHandleChange=(e)=>{
        e.preventDefault();
        setOpenReplyComments(!OpenReplyComments)
    }


  return (
    <div>
          {childCommentNumber >0 && 
            <p style={{fontSize : '10px', margin : '0', color : 'gray'}} onClick={onHandleChange}>
            답글 {childCommentNumber} 개 보기
        </p>
        }
        {OpenReplyComments&&
            renderReplyComment(props.parentCommentId)
        }
       
    </div>
  )
}

export default ReplyComment