const { json } = require('body-parser')
const Comment=require('../../models/Comment')
const process={
    commentSave :async(req,res)=>{
        //저장 밑 불러오기
    const comment=req.body
    const userid= req.session.email
    console.log("리플 코맨츠",userid) 
    try{
        const response=await Comment.save(comment)
        const result = await Comment.saveInfo(userid)
        console.log('최신 결과값:',result)
        console.log("",response)
        return res.json({response , result :result})
    }catch(err){
        return{success : false, err }
    }
    
    },
    commentGet :async(req,res)=>{
        const videoId=req.body.videoid
        console.log('비디오아이디',videoId)
        const comment=await Comment.commentInfo(videoId)
        return res.json({success : true , comments : comment })
    }
}

module.exports={process}