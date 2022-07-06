"use strict"
const {createLogger, transports, format}= require("winston");
const {combine, timestamp, printf, simple, colorize, label}=format;

const printFormat=  printf(({ timestamp,label ,level,message })=>{
    return `${timestamp} [${label}] ${level} : ${message}`
});

const printLogFormat = {
        file : combine(
        label({
            label : "업로드 홈페이지 만들기"
        }),
        // colorize(), 파일로 저장할 떄는 컬러 안 넣는다.
        timestamp({format : "YYYY-MM-DD HH:mm:dd"}),
        printFormat,
        ),
        console : combine(
            colorize(),
            simple()
        )
    }
    const opts = {
        file : new transports.File({
            filename : "access.log",
            dirname : "./logs",
            level : "info",
            format : printLogFormat.file
        }),
        console :new transports.Console({
            level : "info",
            format : printLogFormat.console
        }) ,
    }
const logger = createLogger({
    transports :[opts.file],
})

if (process.env.NODE_ENV !== "production"){
        logger.add(opts.console);
}

module.exports = logger;