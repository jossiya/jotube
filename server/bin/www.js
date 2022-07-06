"use strict"
const app=require("../app")
const logger = require("../src/config/logger")
const PORT= process.env.PORT || 5000

app.listen(PORT, ()=>{
    logger.info(`${PORT} 포트에서 서버 가동 됐드아!`)
    });