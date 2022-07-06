"use strict";
const express = require("express")
const router = express.Router();
const ctrl=require("./home.ctrl");
const video =require("./video")
const subscribe=require('./subscribe')
const comment = require('./comment')
const like = require('./like')
// const {auth} = require("../../middleware/auth")

router.get("/", ctrl.views.home);
router.get("/login", ctrl.views.login);
router.get("/logout",ctrl.process.loguot);
router.get("/register",ctrl.views.register);

router.get("/video/getVideo",video.proccess.getvideos);


//사용자 인증 라우터
router.get("/auth",ctrl.middleware.auth)

//기능
router.post("/login", ctrl.process.login);
router.post("/register",ctrl.process.register)
router.post("/video/uploadfiles",video.proccess.videouploadfile)
router.post('/video/thumbnail',video.proccess.thumdnail)
router.post('/video/uploadVideo',video.proccess.uploadvideo)
router.post('/video/getVideoDetail',video.proccess.getvideo)
router.post('/subscribe/subscribeNumber',subscribe.proccess.subscribeNumber)
router.post('/subscribe/subscribed',subscribe.proccess.subscribed)
router.post('/subscribe/unSubscribe',subscribe.proccess.unsubscribe)
router.post('/subscribe/Subscribe',subscribe.proccess.subscribe)
router.post('/video/getSubscriptionVideo',video.proccess.getSubscriptionVideo)
router.post('/comment/saveComment',comment.proccess.commentSave)
router.post('/comment/getComment',comment.proccess.commentGet)
router.post('/like/getLikes',like.proccess.likeget )
router.post('/like/getDisLikes',like.proccess.dislikeget )
router.post('/like/upLike',like.proccess.uplike)
router.post('/like/unLike',like.proccess.unlike)
router.post('/like/unDislike',like.proccess.undislike)
router.post('/like/upDislike',like.proccess.upDislike)


module.exports = router;