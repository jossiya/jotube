const db = require("../config/db");

class VideoInfo{
    static videoInfos(){
        return new Promise((resolve, reject)=>{
            const query = "select * from users3,video WHERE email=writer order by title asc;";
            db.query(query, (err, data)=>{
                if(err) {reject(`${err}`);
                // console.log(data)
            }
                else resolve(data)
              
            })
        });
    }
    static videoInfo(videoid){
        // console.log('query:',videoid)
        return new Promise((resolve, reject)=>{
            const query = "select * from users3,video WHERE videoid =?;"
            db.query(query, [videoid], (err, data)=>{
                if(err) {reject(`${err}`);
               
                }else resolve(data[0])
                // console.log(data[0])}
            })
        });
    }
    static subvideoInfos(user){
        console.log('쿼리:',user)
        return new Promise((resolve, reject)=>{
            // const query = "select * from video WHERE writer in (?) order by title asc;";
            const query="select * from video left outer join users3 on users3.email=video.writer where email in (?) order by title asc; "
            db.query(query,[user],(err, data)=>{
                if(err) {reject(`${err}`);
                // console.log(data)
            }
                else resolve(data)
              
            })
        });
    }
    




    static save(videoInfo){
        return new Promise((resolve,reject)=>{
            const query = "INSERT INTO video(videoid, writer, title, description, privacy, filePath, category, views, duration, thumbnail) VALUES((REPLACE(UUID(),'-','')), ?, ?, ?,? ,? ,? ,? ,? ,? );";
        db.query(query,
            [videoInfo.writer,videoInfo.title, videoInfo.description, videoInfo.privacy, videoInfo.filePath, videoInfo.category, videoInfo.views, videoInfo.duration, videoInfo.thumbnail], 
            (err)=>{
            if(err) reject(`${err}`);
            else resolve({ success : true})
        });
        })
        
    }
}
module.exports=VideoInfo