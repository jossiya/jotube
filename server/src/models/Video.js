const VideoInfo = require('./VideoInfo')

class Video{
    constructor(body){
        this.body=body
    }
    async videoupload(){
       const Info=this.body
        console.log(Info)
      try{
        const response=await VideoInfo.save(Info)
       return response
      }catch(err){
        return { success : false, err}
      } 
    }

}


module.exports = Video