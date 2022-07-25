const logger = require("../../config/logger");
const multer = require("multer");
const  ffmpeg =require("fluent-ffmpeg");
const VideoInfo=require("../../models/VideoInfo")
const Video =require('../../models/Video')
const Subscribe =require('../../models/Subscribe')


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4'|| ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
const upload = multer({ storage: storage }).single("file")



const process={
    videouploadfile : (req, res)=>{

        const url = {
            method : "POST",
            path : "uploadfiles",
            status : res.err ? 409 : 201,
        };

        upload(req, res, err => {
            if (err) {
                return res.json({ success: false, err })
            }
            return res.status(url.status).json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
        })

    },
    thumdnail : (req,res)=>{
        //썸네일 생성하고 비디오 러닝타임 가져오기
        let thumbsFilePath ="";
        let fileDuration ="";
    
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    //썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
    },
    uploadvideo :async (req,res)=>{
        const video= new Video(req.body)
        const response = await video.videoupload()
        console.log(response)
        
        const url = {
            method : "POST",
            path : "uploadvideo",
            status : response.err ? 409 : 201,
        };

            log(response, url);
        return res.status(url.status).json(response)
    },
    getvideos : async(req,res)=>{
        try{const videos = await VideoInfo.videoInfos()
        // console.log('sever :' , videos)
        return res.json({success : true , videos})
        }catch(err){
            return { success : false, err }
        }
    },
    getvideo : async(req,res)=>{
        const videoid=req.body.videoid
        // console.log('server :',videoid)

       try{ const video = await VideoInfo.videoInfo(videoid.videoid)
        // console.log(video)
        return res.json({success : true , video})
    }catch(err){
        return { success : false, err }
    }
    },
    getSubscriptionVideo :async(req,res)=>{
        const userFrom = req.body.userFrom
        const response= await Subscribe.SubscribeInfos(userFrom)
        // console.log('구독한 사람 누구:',response)
        const subscribeTos=[]
            response.map((subscribed,i)=>{
                subscribeTos.push(subscribed.userTo)
            })
            console.log('구독한 영상:',subscribeTos)
            const subresponse=await VideoInfo.subvideoInfos(subscribeTos)
            // console.log(subresponse)
            return res.json({success : true, subresponse : subresponse})
    },
    getMyVideos : async(req,res)=>{
        const email =req.body.userEmail
        const response= await VideoInfo.myVideos(email)
        return res.json({success : true, myVideos : response})
    },
}

module.exports={
    process,
}
//로그 
const log =(response, url)=> {
    if(response.err){
        logger.error(
            `${url.method} /${url.path} ${url.status} Response : "${response.success} ${response.err}"`
    )}else{
        logger.info(`${url.method} /${url.path} ${url.status} Response : "${response.success} ${response.msg || ""}"`)
    };
};