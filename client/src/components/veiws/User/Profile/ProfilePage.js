import axios from 'axios';
import React,{useEffect, useState} from 'react';
import{Button, Form } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Auth from '../../../../hoc/auth'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NickName from './sections/NickName';

 function ProfilePage(props) {
  // const dispatch=useDispatch()
  const navigate=useNavigate()
  const user= useSelector(state=> state.user)

    const [FilePath, setFilePath] = useState('')
    const [ImageInfo, setImageInfo] = useState('')
    
      //처음 랜더링 유저 사진 띄운 것
      useEffect(() => {
        if(user){
          if(user&&user.userData&&user.userData.email){
            setFilePath(user.userData.image)
            // console.log('dddd',user)
            // console.log('ddd',props.user)
            // console.log('dddddd',FilePath)
            }
        }
      }, [user])
    const onSubmit =(e)=>{
      e.preventDefault();
        const variable={
          FilePath:FilePath,
          UserId : user.userData.uid,
          UserImage : user.userData.image
        }
            axios.post('/api/profile/imageUpdate',variable)
            .then(response=>{
              if(response.data.success){
                navigate("/")
              }else{
                alert("이미지 업데이트에 실패했습니다.")
              }
            })
    }
      
      const onDrop =(files)=>{
        let formData = new FormData();
        const config = {
          header : {'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0])
        console.log(files)

        axios.post('/api/profile/uploadfiles',formData,config)
        .then(response=>{
          if(response.data.success){
            console.log(response.data)
    
            let variable={
              url : response.data.url,
              fileName : response.data.fileName
            }
            // console.log('몰라',response.data.url)
            setFilePath(response.data.url)
            setImageInfo(response.data)
    
          }else{
            alert('비디오 업로드를 실패했습니다.')
          }
        })
      }
      
     const imageDelete=(e)=>{
      
      
      const imageName={imageName :ImageInfo.fileName}
      console.log(imageName)
      axios.post("/api/profile/imageDelete", imageName)
      .then(response=>{
        if(response.data.success){
          setFilePath(null)
          alert('선택이 취소되었습니다.')
        }else{
          alert("올라온 이미지가 없습니다.")
        }
      })
     } 
     if(user){
      if(user&&user.userData&&user.userData.email){
      return (
        <div >
            {/* 사진 올리는 곳 */}
            <div style={{maxWidth: '700px', margin: '5rem auto'}}>
            <Form onSubmit={onSubmit} style={{}} >
            <div style={{display : 'flex',flexDirection : 'column'}}>
            {/* 드랍존 */}
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxSize={1000000000000}
              
              >
                {({getRootProps,getInputProps})=>(
                  <div style={{width: '8rem', height: '8rem', border: '1px solid lightgray',
                   display: 'flex', alignItems: 'center', justifyContent: 'center' ,borderRadius : "100px" }}
                  {...getRootProps()}>
                    {!FilePath&&"이미지 넣는 곳"}
                    {FilePath&&<img style={{width: '8rem', height: '8rem', border: '1px solid lightgray',
                   display: 'flex', alignItems: 'center', justifyContent: 'center' ,borderRadius : "100px" }} 
                      src={`http://localhost:5000/${FilePath}` } alt="사진"></img>}
                    <input {...getInputProps()} />
                    
                  </div>
                )}
                </Dropzone>
                <Button tpye="delete" style={{width : "5rem",marginTop:"1rem", marginLeft : '1.5rem'}} onClick={imageDelete}>삭제</Button>
              <hr/>
              <br/>
              {/* 닉네임 변경 */}
              <NickName/>
                  <br/>
                  <hr/>
                {/* 정보전송 */}
                <Button tpye="submit" style={{width : "5rem", margin : "auto"}} onClick={onSubmit}>적용</Button>
              </div>
              </Form>
            </div>
        </div>
      )
    }else{
      return null
    }
  }else{
    return null;
  }
  
}

export default Auth(ProfilePage, true);