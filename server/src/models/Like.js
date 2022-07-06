const db = require("../config/db");

class Like{

    //좋아요 프로세스
    static getlike(videoid){
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM liked where videoid=?;';
            db.query(query,[videoid.videoId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(data)
                })
        })
    };
    static getdislike(videoid){
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM disliked where videoid=?;';
            db.query(query,[videoid.videoId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(data)
                })
        })
    };
        static likesave(info){
        return new Promise((resolve,reject)=>{
            const query="INSERT INTO liked(likeid,userid,commentid,videoid) VALUES((REPLACE(UUID(),'-','')), ?, ?, ? );";
            db.query(query,[info.userId,info.commentId,info.videoId,],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    };
    static dislikedelete(info){
        return new Promise((resolve,reject)=>{
            const query="DELETE FROM disliked where videoid=? or commentid=? ";
            db.query(query,[info.videoId,info.commentId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    }
    static likedelete(info){
        return new Promise((resolve,reject)=>{
            const query="DELETE FROM liked where videoid=? or commentid=? ";
            db.query(query,[info.videoId,info.commentId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
            })
        })
    }    
//싫어요 프로세스
    
    static dissave(info){
        return new Promise((resolve,reject)=>{
            const query="INSERT INTO disliked(likeid,userid,commentid,videoid) VALUES((REPLACE(UUID(),'-','')), ?, ?, ? );";
            db.query(query,[info.userId,info.commentId,info.videoId,],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    };
}

module.exports=Like