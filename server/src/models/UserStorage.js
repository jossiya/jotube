"use strict"
const db = require("../config/db");
const bcrypt= require("bcrypt");
const saltRounds = 10;

class UserStorage{
    
    static getUserInfo(email,req){
        console.log('login :',email)
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM users3 WHERE email =?;"
            db.query(query,[email], (err, data)=>{
                if(err) reject(`${err}`);
                // console.log(data[0])
                else resolve(data[0])
                // console.log('req.session', req.session);
                //     // 세션 ID
                // const sessionID = req.sessionID;
                // console.log('session id :', sessionID);
                //세션
                if(data[0]!==undefined){
                    req.session.uid=data[0].email;
                    req.session.name=data[0].name;
                    req.session.role=data[0].role;
                    req.session.image=data[0].image;
                    req.session.isLogined=true;
                        req.session.save(()=>{

                        })
                    }
        });
    });
    };

    static save(userInfo){
        return new Promise((resolve, reject)=>{
            const query = "INSERT INTO users3(name, email, password ) VALUES(?, ?, ?);";
            bcrypt.genSalt(saltRounds, (err, salt)=>{
                if(err) return {success : false, err}
                bcrypt.hash(userInfo.password, salt, (err,hash)=>{
                    if(err) return {success : false, err}
                    // console.log(hash)
                    db.query(query,
                        [userInfo.name, userInfo.email, hash], 
                        (err)=>{
                        if(err) reject(`${err}`);
                        else resolve({ success : true})
                    });
                });
            });
                
        });
    }
}

module.exports = UserStorage
//해쉬 적용버전
// static save(userInfo){
//     return new Promise((resolve, reject)=>{
//         const query = "INSERT INTO users2(id, name, psw, belong, email) VALUES(?, ?, ?, ?, ?);";
//         bcrypt.genSalt(saltRounds, (err, salt)=>{
//             if(err) return {success : false, err}
//             bcrypt.hash(userInfo.psw, salt, (err,hash)=>{
//                 if(err) return {success : false, err}
//                 // console.log(hash)
//                 db.query(query,
//                     [userInfo.id, userInfo.name, hash, userInfo.belong, userInfo.email], 
//                     (err)=>{
//                     if(err) reject(`${err}`);
//                     else resolve({ success : true})
//                 });
//             });
//         });
            
//     });
// }
// }

//해쉬 적용 안한거
// static save(userInfo){
//     return new Promise((resolve, reject)=>{
//         const query = "INSERT INTO users2(id, name, psw, belong, email) VALUES(?, ?, ?, ?, ?);";
        
//         db.query(query,
//             [userInfo.id, userInfo.name, userInfo.psw, userInfo.belong, userInfo.email], 
//             (err)=>{
//             if(err) reject(`${err}`);
//             else resolve({ success : true})
//     });
// });
// }