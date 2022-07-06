import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector,shallowEqual } from 'react-redux'


function Subscribe(props){ 

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    const user=useSelector(state=>state.user)
    //    const userData = useSelector(
    //     (state) => 
    //     ({
    //         userData: state.user['userData'],
    //     }),
    //     shallowEqual
    //   );
    
    // if(userData['userData'] != undefined) {
    //     console.log('유저정보 1 :', userData['userData']['email'])
    // }
        
    
    //console.log('유저정보이메일:',userData)

    useEffect(() => {
      let variable = { userTo : props.userTo}
    //   console.log('userTo:',variable)
       axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setSubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('구독자 수 정보 받지 못했슈')
            }
        })

        if(user['userData'] !== undefined) {
            console.log('유저정보 1 :', user['userData']['email'])
            let subscribeVariable = {userFrom : user['userData']['email'], userTo : props.userTo,}
            console.log("dds",subscribeVariable)
        axios.post('/api/subscribe/subscribed',subscribeVariable )
        .then(response=>{
            if(response.data.success){
                setSubscribed(response.data.subscribed)
                console.log(response.data.subscribed)
            }else{
                alert('정보를 받아오지 못했습니다.')
            }
        })
        }  
    },[])



    const onSubscribe=()=>{

        let subscribeVariable={
            userFrom : user['userData']['email'], userTo : props.userTo
        }
        if(Subscribed){

            axios.post('/api/subscribe/unSubscribe', subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber-1)
                    setSubscribed(!Subscribed)

                }else{
                    alert('구독 취소하는 데 실패했슈')
                }
            })
        }else{

            axios.post('/api/subscribe/Subscribe', subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber+1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('구독 하는 데 실패 했슈')
                }
            })
        }
    }
    
  return (
    <div>
    <button 
            onClick={onSubscribe}
            style={{
                backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeNumber} {Subscribed ? '구독중' : '구독'}
            </button>
        </div>
  )

}


export default Subscribe