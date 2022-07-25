"use strict";
const express = require("express")
const router = express.Router();
const ctrl=require("./home.ctrl");
const video =require("./video")
const subscribe=require('./subscribe')
const comment = require('./comment')
const like = require('./like')
const profile = require('./profile')
// const {auth} = require("../../middleware/auth")

//!!기본 라우팅 페이지 용!!
router.get("/", ctrl.views.home);
router.get("/login", ctrl.views.login);
router.get("/logout",ctrl.process.loguot);
router.get("/register",ctrl.views.register);

router.get("/video/getVideo",video.process.getvideos);


//사용자 인증 라우터
router.get("/auth",ctrl.middleware.auth)

//!기능!
router.post("/login", ctrl.process.login);
router.post("/register",ctrl.process.register)
// 비디오쪽
router.post("/video/uploadfiles",video.process.videouploadfile)
router.post('/video/thumbnail',video.process.thumdnail)
router.post('/video/uploadVideo',video.process.uploadvideo)
router.post('/video/getVideoDetail',video.process.getvideo)
// 내 채널 쪽
router.post('/mychannel/video',video.process.getMyVideos)
// 비디오 디테일페이지쪽
router.post('/subscribe/subscribeNumber',subscribe.process.subscribeNumber)
router.post('/subscribe/subscribed',subscribe.process.subscribed)
router.post('/subscribe/unSubscribe',subscribe.process.unsubscribe)
router.post('/subscribe/Subscribe',subscribe.process.subscribe)
router.post('/video/getSubscriptionVideo',video.process.getSubscriptionVideo)
router.post('/comment/saveComment',comment.process.commentSave)
router.post('/comment/getComment',comment.process.commentGet)
router.post('/like/getLikes',like.process.likeget )
router.post('/like/getDisLikes',like.process.dislikeget )
router.post('/like/upLike',like.process.uplike)
router.post('/like/unLike',like.process.unlike)
router.post('/like/unDislike',like.process.undislike)
router.post('/like/upDislike',like.process.upDislike)
// 내 프로필 쪽

router.post('/profile/uploadfiles',profile.process.imageuploadfile)
router.post('/profile/imageUpdate',profile.process.imageupdate)
router.post('/profile/imageDelete',profile.process.imagedelete)

module.exports = router;