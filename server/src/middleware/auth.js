const ctrl=require("../routes/home/home.ctrl");

let auth= (req, res, next)=>{
    ctrl.middleware.auth
    next()
}

module.exports = { auth }