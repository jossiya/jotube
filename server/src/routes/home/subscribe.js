
const Subscribe =require('../../models/Subscribe')

const process={
    subscribeNumber : async(req,res)=>{
        const userTo=req.body.userTo;
        // console.log('se',userTo)
        const response= await Subscribe.SubscribeInfo(userTo)
        // console.log('위에꺼 결과:',response.length)
        // console.log(response)

        return res.json({success : true, subscribeNumber: response.length})

    },
    subscribed : async(req,res)=>{
        const subscribed=req.body;
        // console.log('seu',subscribed)
        const response= await Subscribe.SubscribeInfos(subscribed.userFrom)
        // console.log(':',response)
        // console.log('결과:',response===undefined)
        // console.log('구독드 결과:',response.userFrom===subscribed.userFrom&&response.userTo===subscribed.userTo)
        // console.log('구독하고 있는 것들',response.userFrom)
        const subscribeTos=[]
            response.map((subscribed,i)=>{
                subscribeTos.push(subscribed.userTo)
            })
            // console.log(subscribeTos)
        if(subscribeTos===undefined||!subscribeTos.includes(subscribed.userTo)){
            result= false
        }else if(subscribeTos&&subscribeTos.includes(subscribed.userTo)){
            result= true
        }return res.json({success : true, subscribed: result})

    },
    unsubscribe:async(req,res)=>{
        const unsubscribe={ userFrom : req.body.userFrom, userTo : req.body.userTo}
        const response=await Subscribe.Unsubscribe(unsubscribe)
        res.json(response)
    },
    subscribe :async (req,res)=>{
        const subscribe= req.body
        const response=await Subscribe.Subscribe(subscribe)
        res.json(response)
        
    }
}

module.exports={
    process,
}