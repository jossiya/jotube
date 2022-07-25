const multer = require("multer");
const Profile= require("../../models/Profile")
const fs=require('fs')

//사진 저장하기
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, pngis allowed'), false);
        }
        cb(null, true)
    }
})
const upload = multer({ storage: storage }).single("file")
const process={
    
    //프로필 이미지 파일경로 저장
    imageuploadfile : (req,res)=>{
        upload(req, res, err => {
            if (err) {
                return res.json({ success: false, err })
            }
            return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
        })
    },
    imagedelete: (req,res)=>{
        
        const imageName=req.body.imageName
        console.log('삭제',imageName)
        if(fs.existsSync('uploads/profile/'+imageName)){
            fs.unlinkSync('uploads/profile/'+imageName)
            return res.json({success : true})
        }else{res.json({success : false})}
    },
    imageupdate : async(req,res)=>{
        const variable={
            FilePath : req.body.FilePath,
            userId : req.body.UserId,
            userImage : req.body.UserImage
        }
        // console.log(fs.existsSync(`${variable.userImage}`))
        if(variable.FilePath===variable.userImage){//사용자가 아무 것도 안하고 적용 눌렀을 때
            const response= await Profile.profileImageSave(variable)
            return res.json({success : response})
        }else if(fs.existsSync(`${variable.userImage}`)){//전에 꺼 찾아서 삭제
            fs.unlinkSync(`${variable.userImage}`)
            const response= await Profile.profileImageSave(variable)
            console.log('오류', response)
            return res.json({success : response})
        }else if(fs.existsSync(`${variable.userImage}`)===false){//전에 파일이 아무 것도 없으면 그냥 사진 올리기
            const response= await Profile.profileImageSave(variable)
            return res.json({success : response})
        }else res.json({success : false, msg : err})

    },

}

module.exports={process}