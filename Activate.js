import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import {useHistory} from "react-router-dom"
import { HiOutlineMail } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import actimg from "./undraw_secure_login_pdn4.png"

const Activate = () => {
    const history=useHistory();
    const [values, setValues] = useState({
        email: '',
        code: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };
     async function handleSubmit(e){
        e.preventDefault();
        console.warn("values",values)
        let result = await fetch("https://boiling-shelf-43809.herokuapp.com/user/verifyCode",{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json"
            }
          })
        result= await result.json()
        console.warn("result",result);
        localStorage.setItem("user-info",JSON.stringify(result))
        localStorage.setItem("token",(result.token))
        localStorage.setItem("id",(result.user.id))
        localStorage.setItem("name",(result.user.name))
        localStorage.setItem("email",(result.user.email))
        localStorage.setItem("url",(result.user.url))
        const id = localStorage.getItem("id")
        history.push("/Profile/"+id)
      }
    return (
        // <div>
        //    <h1> activation</h1>
        //    <form onSubmit={(e)=>handleSubmit(e)}>
        //    <input type="email" name="email" placeholder="enter email" onChange={(e)=>handleChange(e)}/>
        //    <input type="text" name="code" placeholder="enter code" onChange={(e)=>handleChange(e)}/>
        //    <button type="submit">submit</button>
        //    </form>
        // </div>
        <>
          <Row className="activate mt-md-5">
            <Col md={6} className="leftside">
            <h2 className="form-title">Activate your acount</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group">
                  <label htmlFor="email">
                  <HiOutlineMail className="iconinput"/>
                  </label>

                  <input type="email"
                     name="email"
                    placeholder="Enter email"
                    onChange={(e)=>handleChange(e)}/>
              </div>

              <div className="form-group">
                  <label htmlFor="code">
                  <MdVerifiedUser className="iconinput"/>
                  </label>

                  <input type="text"
                    name="code"
                    placeholder="Enter code" 
                    onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-group">
               <button type='submit' className="btn btn-primary">
                Submit
              </button> 
              </div>
            </form>
            </Col>
            <Col md={6} className="rightside">
              <img src={actimg} />
            </Col>
          </Row>
        </>
    )
}

export default Activate
