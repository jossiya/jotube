"use strict";

const UserStorage = require("./UserStorage")
const bcrypt= require("bcrypt");

class User{
constructor(body){
    this.body= body
}
    async login(req){
        const client = this.body;
        // console.log(client.email)
        // console.log(client.password)
        try{
            const user = await UserStorage.getUserInfo(client.email,req)
            // console.log(user.password)
            // console.log(user.email)
            if(user){
                if (user.email===client.email && bcrypt.compareSync(client.password, user.password) ){
                return {success :true};
                }
                return {success : false, msg : "비밀번호가 틀렸습니다."};
            }
            return { success : false, msg : "존재하지 않는 아이디입니다."}
        }catch(err){
            return { success : false, err }
        };
        
        
    };
    async register(){
        const client = this.body;
        if(client.email,client.name,client.password==="" || client.err===false){
            return {success : false, msg : "사용자 정보를 모두 입력해주세요"}
        }else{
            // console.log(client)
            try{
                const response = await UserStorage.save(client);
                return response;
            }catch(err){
                return { success : false, err }
            }}
           
    }; 
}
module.exports = User;