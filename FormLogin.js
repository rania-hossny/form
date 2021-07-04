import React ,{useEffect,useState} from 'react';
import validateInfo from './validateInfo';
import useForm from './useForm';
import styles from './Form.module.css';
import {Link, Redirect,useHistory} from "react-router-dom"
import Navbar from "./Navbar"
import "./signup.css"
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import Nav from "./Nav"
import { Col, InputGroup, Row } from 'react-bootstrap';
import imglogin from "./undraw_Hello_re_3evm.png"


const FormLogin = ({ submitForm }) => {
  const history =useHistory();
  const [errors, setErrors] = useState({});
const [dataIsCorrect,setDataIsCorrect]=useState(false);
useEffect(()=>{
  if(localStorage.getItem("user-info")){
    // let user=JSON.parse(localStorage.getItem("user-info"))
    // const { id} = user;
    const id = localStorage.getItem("id")
    history.push("/Profile/"+id)
  }
})
  const { handleChange, values } = useForm(
    submitForm
    // validate
  );

  async function handleSubmitlogin (e) {
    e.preventDefault();
    setErrors(validateInfo(values))
    // console.warn(values.email,values.password);
    let email=values.email
    let password=values.password
    let item={email,password}
    setDataIsCorrect(true);
    console.warn(item);
    console.warn(errors)
    console.warn(dataIsCorrect)
    
    if (Object.keys(errors).length === 2){
      let result = await fetch("https://boiling-shelf-43809.herokuapp.com/user/signin",{
        method:"POST",
        body:JSON.stringify(item),
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
      const id = localStorage.getItem("id")
      history.push("/Profile/"+id)
    }
    
  }
  return (
    <>
    
{/* <div className={styles.formcontentright}>
   
      <form onSubmit={handleSubmitlogin} noValidate>
          
        <h1>
        Welcome to  <div className={styles.logo}>
                ma<p>T</p>es
              </div> to work Togather
        </h1>
        
        <div className={styles.forminputs}>
          <label className={styles.formlabel}>Email</label>
          <input
            className={styles.forminput}
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className={styles.forminputs}>
          <label className={styles.formlabel}>Password</label>
          <input
            className={styles.forminput}
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        
        <button className={styles.forminputbtn} type='submit'>
        login
        </button>
       
        
</form>
          
      </div> */}

        <Row className="login mt-md-5">
          <Col md={6} className="leftside">
          <h2 className="form-title">login</h2>

          <form onSubmit={handleSubmitlogin} noValidate className="login-form">
          <div className="form-group">
                <label htmlFor="email">
                <HiOutlineMail className="iconinput"/>
                </label>
                <input
         
            // className={styles.forminput}
            
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
           {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                <RiLockPasswordFill className="iconinput"/>
                </label>
                <input
                  
                  // className={styles.forminput}
                  
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={values.password}
                  onChange={handleChange}
                  />
                  {errors.password && <p>{errors.password}</p>}
              </div>

              <div className="form-group">
               <button type='submit' className="btn btn-primary">
                login
              </button> 
                <p style={{marginTop:"10px"}}>
                Don't have acount ?
                  <Link to="/Form" style={{color:"black",textDecoration:"none"}}> Sign up</Link></p>
              </div>
          </form>
          </Col>
          <Col Col md={6} className="rightside">
            <img src={imglogin} />
          </Col>
        </Row>
    </>
      
   
  );
};

export default FormLogin;