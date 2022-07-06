
const Like=require('../../models/Like')
const proccess={
    //좋아요
    likeget : async(req,res)=>{
        let variable={}
        if(req.body.videoId){
            variable ={videoId : req.body.videoId.videoid,
                userId : req.body.userId,
            }
        }else{
            variable={commentId : req.body.commentId,
                userId : req.body.userId,}
        }
        const likes=await Like.getlike(variable)
        res.json({success : true , likes})
    },
    uplike : async(req,res)=>{
        let variable={}
        if(req.body.videoId){
            variable ={videoId : req.body.videoId.videoid,
                userId : req.body.userId,
            }
        }else{
            variable={commentId : req.body.commentId,
                userId : req.body.userId,}
        }
        //좋아요 클릭 시 클릭 정보 넣음
        const response=await Like.likesave(variable)
        //싫어요가 이미 눌려 있다면, 싫어요를 1 줄여준다.
        const DislikeDelete=await Like.dislikedelete(variable)
        res.json({success :response||DislikeDelete||response })
    },
    unlike : async(req,res)=>{
        let variable={}
        if(req.body.videoId){
            variable ={videoId : req.body.videoId.videoid,
                userId : req.body.userId,
            }
        }else{
            variable={commentId : req.body.commentId,
                userId : req.body.userId,}
        }
        const response=await Like.likedelete(variable)
        res.json({success :response })
        
    },
//싫어요
dislikeget : async(req,res)=>{
    let variable={}
        if(req.body.videoId){
            variable ={videoId : req.body.videoId.videoid,
                userId : req.body.userId,
            }
        }else{
            variable={commentId : req.body.commentId,
                userId : req.body.userId,}
        }
    const dislikes=await Like.getdislike(variable)
    res.json({success : true , dislikes})

},
    undislike : async(req,res)=>{
        let variable={}
        if(req.body.videoId){
            variable ={videoId : req.body.videoId.videoid,
                userId : req.body.userId,
            }
        }else{
            variable={commentId : req.body.commentId,
                userId : req.body.userId,}
        }
        const response= await Like.dislikedelete(variable)
        res.json({success :response })
    },
    upDislike : async(req,res)=>{
        let variable={}
        if(req.body.videoId){
            variable ={videoId : req.body.videoId.videoid,
                userId : req.body.userId,
            }
        }else{
            variable={commentId : req.body.commentId,
                userId : req.body.userId,}
        }
        
        //싫어요 클릭 시 클릭 정보 넣음
        const response=await Like.dissave(variable)
        //좋아요가 이미 눌려 있다면, 싫어요를 1 줄여준다.
        const LikeDelete=await Like.likedelete(variable)
        res.json({success :response||LikeDelete||response })
    }
}

module.exports={proccess}