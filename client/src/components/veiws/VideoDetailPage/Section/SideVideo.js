import axios from 'axios'
import React, { useEffect, useState } from 'react'

function SideVideo() {

    
    const [sideVideos, setsideVideos] = useState([])
    
  useEffect(()=>{
    axios.get('/api/video/getVideo')
    .then(response=>{
      // console.log(response.data)
      if(response.data.success){
        setsideVideos(response.data.videos)
  
      }else{
        alert('비디오를 가져올 수 없습니다.')
      }
    })
  },[])
    
  const renderSideVideo=sideVideos.map((video,index)=>{
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
   return <div key={index} style={{display:'flex', marginBottom:'1rem', padding:'0 2rem'}}>
        <div style={{width:'40%', marginBottom:'1rem'}}>
            <a href={`/video/${video.videoid}`}>
                <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt='thumnail'/>
            </a>
        </div>    
        <div style={{width:'50%', marginLeft:'1rem'}}>
            <a href={`/video/${video.videoid}`}style={{display:'flex', flexDirection:'column', textDecorationLine:'none', color:'gray'}}>
                <span style={{fontSize:'1rem', color:'black'}}>{video.title}</span>
                <span>{video.name}</span>
                <span>{video.views} views </span>
                <span>{minutes} : {seconds} </span>
            </a>
        </div>
    </div>
  })

  return (
    <React.Fragment>
        <div style={{marginTop:'4rem'}}>
            {renderSideVideo}
            </div>
        
    </React.Fragment>
    
    
  )
}

export default SideVideo