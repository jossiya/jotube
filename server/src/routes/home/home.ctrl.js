"use strict"
const logger = require("../../config/logger");
const User = require("../../models/User");


const views={
    home: (req, res)=>{
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        // res.render("home/index")
        res.send("Landing");
    },
    
    login: (req,res)=>{
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        // res.render("home/login")
        res.send("로그인 화면")
    },

    register : (req,res)=>{
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        // res.render("home/register")
    }
};


const process={
    login : async(req,res) =>{//req는 프론트에서 로그인 정보
        const user = new User(req.body);
        console.log(user)
        const response = await user.login(req);

        const url = {
            method : "GET",
            path : "login",
            status : response.err ? 400 : 200,
        };
        
            log(response, url);
        return res.status(url.status).json(response)
    
    },

    loguot : (req, res)=>{
        req.session.destroy((err)=>{
            req.session;
          req.session = null;
          res.status(200).send({ success : true})
            });
    },

    register : async(req,res)=>{
        const user = new User(req.body);
        // console.log(user)
        const response = await user.register();
        
        const url = {
            method : "POST",
            path : "register",
            status : response.err ? 409 : 201,
        };

            log(response, url);
        return res.status(url.status).json(response)
    },
    
};

const middleware = {
    auth :async (req, res)=>{
        if(req.session.name===undefined){
           return await res.json({inAuth : false, error : true})}
          else res.status(200).json({
            userName : req.session.name,
            isAdmin :req.session.role === 0 ? false : true ,
            isAuth : true,
            email : req.session.uid,
            role : req.session.role,
            image : req.session.image,
           })
         
    },
}

module.exports={
    views,
    process,
    middleware,
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
