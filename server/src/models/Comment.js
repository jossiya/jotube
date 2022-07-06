const db = require("../config/db");
class Comment{
    static save(comment){
        return new Promise((resolve, reject)=>{
            const query = "INSERT INTO comment(commentid,content, writer,responseTo,videoId ) VALUES((REPLACE(UUID(),'-','')),? ,? ,? ,? );";
                    db.query(query,
                        [comment.content, comment.writer, comment.responseTo, comment.videoId], 
                        (err,data)=>{
                        if(err) reject(`${err}`);
                        else resolve({ success : true, data})
                    });
                });
            };
            static saveInfo(id){
                // SELECT *,MAX(commentid) FROM comment ;
               return new Promise((resolve, reject)=>{
                    const query = "SELECT * FROM comment where writer=? order by in_date desc ";
                            db.query(query,[id], 
                                (err,data)=>{
                                if(err) reject(`${err}`);
                                else resolve(data[0])
                            });
                        });
                    };

        static commentInfo(videoid){
            console.log(videoid)
            return new Promise((resolve, reject)=>{
                const query = "select * from comment left outer join users3 on users3.email=comment.writer where videoId in (?);";
                        db.query(query,
                            [videoid.videoid], 
                            (err,data)=>{
                            if(err) reject(`${err}`);
                            else resolve(data)
                        });
                    });
                };
        }

    module.exports=Comment