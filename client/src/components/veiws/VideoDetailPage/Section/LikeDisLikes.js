import React, { useEffect, useState } from 'react'
import {Tooltip} from "antd"
import{AiFillLike,AiOutlineLike,AiFillDislike,AiOutlineDislike, } from 'react-icons/ai'
import axios from 'axios'

function LikeDisLikes(props) {


    const [Likes, setLikes] = useState(0)
    const [DisLikes, setDisLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable={ }
    if(props.video){
        variable={
            videoId :props.videoId ,
            userId :props.userId,
        }
    }else{
        variable={
            commentId :props.commentId , 
            userId : props.userId
        }
    }

    //좋아요
    useEffect(() => {

        axios.post('/api/like/getLikes',variable)
        .then(response=>{
            if(response.data.success){
                //좋아요 갯수
                setLikes(response.data.likes.length)

                //좋아요 이미 눌렀는지
                response.data.likes.map(like=>{
                    if(like.userid===props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert('좋아요  상태를 가져오지 못했습니다.')
            }
        })
        axios.post('/api/like/getDisLikes',variable)
        .then(response=>{
            if(response.data.success){
                //싫어요 갯수
                setDisLikes(response.data.dislikes.length)

                //싫어요 이미 눌렀는지
                response.data.dislikes.map(dislike=>{
                    if(dislike.userid===props.userId){
                        setDisLikeAction('disliked')
                    }
                })
            }else{
                alert('싫어요 상태를 가져오지 못했습니다.')
            }
        })
       
    }, [])
    const onLick=(e)=>{
        if(LikeAction===null){
            axios.post('/api/like/upLike', variable)
            .then(response=>{
                if(response.data.success){
                    
                    setLikes(Likes+1)
                    setLikeAction('liked')

                    if(DisLikeAction!==null){
                        setDisLikeAction(null)
                        setDisLikes(DisLikes-1)
                    }
                }else{
                    alert('좋아요에 실패했습니다.')
                }
            })
        }else{
            axios.post('/api/like/unLike', variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes-1)
                    setLikeAction(null)
                }else{
                    alert('좋아요 취소를 실패했습니다.')
                }
            })
        }
    }

    //싫어요
    const onDislike=()=>{
        if(DisLikeAction !== null){
            axios.post('/api/like/unDislike', variable)
            .then(response=>{
                if(response.data.success){
                    setDisLikes(DisLikes-1)
                    setDisLikeAction(null)
                }else{
                    alert('싫어요 취소를 실패 했습니다.')
                }
            })
        }else{
            axios.post('/api/like/upDislike', variable)
            .then(response=>{
                if(response.data.success){
                   setDisLikes(DisLikes+1)
                   setDisLikeAction('dislike')
                   if(LikeAction!==null){
                        setLikeAction(null)
                        setLikes(Likes-1)
                   }
                }else{
                    alert('싫어요 취소를 실패 했습니다.')
                }
            })
        }
    }


    //뷰
    return (
    <div>
        <span onClick={onLick}>
            <Tooltip title="좋아요">
            {LikeAction==='liked'&&<AiFillLike/>}
            {LikeAction!=='liked'&&<AiOutlineLike/>}
            </Tooltip>
            <span style={{paddingLeft : '8px', cursor : 'auto'}}>{Likes}</span>
        </span>&nbsp;&nbsp;
        <span style={{paddingLeft :'8px'}} onClick={onDislike} >
            <Tooltip title="싫어요">
           {DisLikeAction==='dislike'&& <AiFillDislike/>}
            {DisLikeAction!=='dislike'&&<AiOutlineDislike/>}
            </Tooltip>
            <span style={{paddingLeft : '8px', cursor : 'auto'}}>{DisLikes}</span>
        </span>&nbsp;&nbsp;
    </div>
  )
}

export default LikeDisLikes