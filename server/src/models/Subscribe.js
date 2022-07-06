const db = require("../config/db");
class Subscribe{
    static SubscribeInfo(userTo){
        return new Promise((resolve, reject)=>{
                const query = "select * from subscriber WHERE userTo =?;"
                db.query(query, [userTo], (err, data)=>{
                    if(err) {reject(`${err}`);
               
                    }else resolve(data)
                    // console.log('위에 데이터',data)
            })
        });
    }
    static SubscribeInfos(user){
        // console.log('',user)
        return new Promise((resolve, reject)=>{
                const query = "select * from subscriber WHERE userFrom =?;"
                db.query(query, [user], (err, data)=>{
                    if(err) {reject(`${err}`);
               
                    }else resolve(data)
                    // console.log("아래꺼",data)
            })
        });
    }
    static Unsubscribe(user){
        return new Promise((resolve, reject)=>{
            const query = "delete from subscriber where userTo=? and userFrom=?;"
            db.query(query, [user.userTo,user.userFrom], (err, data)=>{
                if(err) {reject(`${err}`);
           
                }else resolve({ success : true})
                
        })
    });
    }

    static Subscribe(user){
        return new Promise((resolve, reject)=>{
            const query = "insert into subscriber(userTo,userFrom) values(?,?);"
            db.query(query, [user.userTo,user.userFrom], (err, data)=>{
                if(err) {reject(`${err}`);
           
                }else resolve({ success : true})
        })
    });
    }
}

module.exports=Subscribe