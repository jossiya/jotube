import React from 'react'
import {Form}from'react-bootstrap'
function NickName() {
  return (
    <div>
     <div style={{display : "flex"}}>
        <Form.Label style={{marginTop : "8px"}}>별명</Form.Label>
        <Form.Control type='name'  placeholder='별명' style={{width : "15rem" ,marginLeft: "1rem"}}/>
    </div>
    </div>
  )
}

export default NickName