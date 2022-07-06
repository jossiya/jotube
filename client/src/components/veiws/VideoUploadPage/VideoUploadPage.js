import React, {useState}from 'react'
import Auth from '../../../hoc/auth'
import{Alert,Button, Form } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { BsPlus} from "react-icons/bs";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";



const PrivateOptions=[
  {value : 0, labele:"Private"},
  {value : 1, labele:"Public"}
];
const CategoryOptions=[
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function VideoUploadPage(props) {
  const navigate=useNavigate();

 const user = useSelector(state=>state.user)

  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState("Film & Animation")
  const [FilePath, setFilePath] = useState('')
  const [Duration, setDuration] = useState('')
  const [ThumbnailPath, setThumbnailPath] = useState('')

  const onTitleChange=(e)=>{
    setVideoTitle(e.currentTarget.value)
  }

  const onDescriptionChange=(e)=>{
    setDescription(e.currentTarget.value)
  }

  const onPrivateChange=(e)=>{
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange=(e)=>{
    setCategory(e.currentTarget.value)
  }
  const onDrop =(files)=>{
    let formData = new FormData();
    const config = {
      header : {'content-type' : 'multipart/form-data'}
    }
    formData.append("file", files[0])
    console.log(files)
    axios.post('/api/video/uploadfiles',formData,config)
    .then(response=>{
      if(response.data.success){
        console.log(response.data)

        let variable={
          url : response.data.url,
          fileName : response.data.fileName
        }

        setFilePath(response.data.url)
        
        axios.post('/api/video/thumbnail', variable)
        .then(response=>{
          if(response.data.success){
            setDuration(response.data.fileDuration)
            setThumbnailPath(response.data.url)
          }else{
            alert('썸네일 생성에 실패했습니다.')
          }
        })


      }else{
        alert('비디오 업로드를 실패했습니다.')
      }
    })
    
  }
 const  onSubmit = (e)=>{
  e.preventDefault();
  const variable={
    writer : user.userData.email,
    title: VideoTitle,
    description: Description,
    privacy: Private,
    filePath: FilePath,
    category: Category, 
    duration: Duration ,
    thumbnail:ThumbnailPath ,


  }
    axios.post('/api/video/uploadVideo', variable)
    .then(response=>{
      if(response.data.success){
        
        <Alert color="success">
          성공적으로 업로드가 되었습니다.
      </Alert>
        setTimeout(() => {
          navigate('/')
        }, 3000);
        
      }else{
        alert('비디오 업로드에 실패 했습니다.')
      }
    })
 }

  return (
    <div style={{maxWidth: '700px', margin: '5rem auto'}}>
      <div style={{textAlign : 'center', marginBottom : '2rem'}}>
          <h1> Upload Video</h1>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{display : 'flex', justifyContent: 'space-between'}}>
        {/* 드랍존 */}
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={1000000000000}
          >
            {({getRootProps,getInputProps})=>(
              <div style={{width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              {...getRootProps()}>
                <input {...getInputProps()} />
                <BsPlus style={{fontSize:'3rem'}}/>
              </div>
            )}

          </Dropzone>

          {/* 썸네일 */}
              {ThumbnailPath &&
              <div>
              <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
            </div>
            }
        </div>
        <br/>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="title" value={VideoTitle} onChange={onTitleChange}  />
        <small id="titleerror" className="text-danger form-text">
                  
                </small>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Description" value={Description} onChange={onDescriptionChange}  />
        <small id="titleerror" className="text-danger form-text">

        </small>
        <br/>
          <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index)=>(
          <option key={index} value={item.value}>{item.labele}</option>
          ))}
          </select>
          <br/>
          <br/>
          <select onChange={onCategoryChange}>
            {CategoryOptions.map((item, index)=>(
              <option key={index} value={item.value}>{item.label}</option>
            ))}
          </select>
          <br/>
          <br/>
          <Button type='primary' size='large' onClick={onSubmit} >
              업로드
          </Button>

                
      </Form>
    </div>
  )
}

export default Auth(VideoUploadPage, true)