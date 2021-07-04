import React ,{useEffect,useState} from 'react';
import {Link, useHistory} from "react-router-dom"
import axios from "axios"
import validateInfo from './validateInfo';
import useForm from './useForm';
import styles from './Form.module.css';
import GoogleLogin from 'react-google-login';
import Navbar from "./Navbar"
import Nav from "./Nav"
import Pimg from"./blank-profile-picture-973460_1280.png"
import { HiOutlineCamera } from "react-icons/hi";
import "./signup.css"
import signimg from "./undraw_Access_account_re_8spm.png"
import { Card, Col, Row } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

const FormSignup = ({ submitForm }) => {
const history=useHistory();
const [profileimg, setProfileimg] = useState(Pimg);
const [errors, setErrors] = useState({});
const [file, setFile] = useState(null);
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
  const handleChangeFile=(e)=>{
      // console.log(e.target.files)
      // console.log(e.target.files[0])
      let files=e.target.files[0]
      setFile(files)
  }
  
  const imageHandler=(e)=>{
    const reader=new FileReader();
    reader.onload=()=>{
      if(reader.readyState === 2){
        setProfileimg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  async function handleSubmitsign (e) {
    e.preventDefault();
    setErrors(validateInfo(values))
    setDataIsCorrect(true);
    console.log(file)

    let email=values.email
    let password=values.password
    let name=values.name
    let confirmPassword=values.confirmPassword
    let item={name,email,password,confirmPassword}
    const formData = new FormData();
    console.warn("item",item)
    formData.append('name',name)
    formData.append("email",email)
    formData.append("password",password)
    formData.append("confirmPassword",confirmPassword)
    formData.append("",file)
    console.warn("form",formData)
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      
      let result = await axios({
        method:"POST",
        url:"https://boiling-shelf-43809.herokuapp.com/user/signup",
        data:formData
      }).then(res=>{
        console.log(res)
        console.log(res.data)
        if(res.data.msg=="done sign up"){
          history.push("/Activate")
        }else{
          console.log("failed sign up")
        }
      })
      .catch(err=>console.log(err))
        
    }
    
  };
  
  
  const responseGoogle=(response)=>{
      console.log(response);
     console.log(response.profileObj);
  }
  return (
    <>
 {/* <div className={styles.formcontentright}>
      <form onSubmit={handleSubmitsign} className="form" noValidate>
        <h1>
         Create Account 
        </h1>
        <div className={styles.uploadsection}>
        <div className={styles.imgholder}>
          <img src={profileimg} alt="" id="img" className={styles.imgProfile}/>
        </div>

        <input type="file" name="file" id="inputfile" accept="image/*"
          onChange={(e)=>{
            imageHandler(e)
            handleChangeFile(e) 
          }
          }
          />

        <label htmlFor="inputfile" className={styles.label}>
          <HiOutlineCamera className={styles.uplaodicon}/>
        </label>
        </div>
        <div className={styles.forminputs}> */}
        
      

          {/* <label className={styles.formlabel}>Username</label>
          <input
          multiple
            className={styles.forminput}
            type='text'
            name='name'
            placeholder='Enter your username'
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
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
        <div className={styles.forminputs}>
          <label className={styles.formlabel}>Confirm Password</label>
          <input
            className={styles.forminput}
            type='password'
            name='confirmPassword'
            placeholder='Confirm your password'
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button className={styles.forminputbtn} type='submit'>
          Sign up
        </button> */}
       
        {/* <h2><span>or</span></h2>
        <div className={styles.GoogleLogin}>
          
          <GoogleLogin
          clientId=""
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          />
          
      </div> */}
      {/* </form>
      
    </div> */}
<Row className="signup mt-5">
              <Col md={6} className="leftside">
              <h2 className="form-title">Sign up</h2>
              <form onSubmit={handleSubmitsign} className="register-form">

              <div className="form-group">
               <div className="uploadsection">
                <div className="imgholder">
                  <img src={profileimg} alt="" id="img" className="imgProfile"/>
                </div>

                <input type="file" name="file" id="inputfile" accept="image/*"
                  onChange={(e)=>{
                    imageHandler(e)
                    handleChangeFile(e) 
                  }
                  }
            />

              <label htmlFor="inputfile" className="label">
                <HiOutlineCamera className="uplaodicon"/>
              </label>
        </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">
                <FaUser className="iconinput"/>
                </label>
                <input
         
                  // className={styles.forminput}
                  type='text'
                  name='name'
                  placeholder='Enter your name'
                  value={values.name}
                  onChange={handleChange}
                />
                 {errors.name && <p>{errors.name}</p>}
              </div>

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
                <label htmlFor="cpassword">
                <RiLockPasswordFill className="iconinput"/>
                </label>
                <input
              
                  // className={styles.forminput}
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm your password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              </div>

              <div className="form-group">
               <button type='submit' className="btn btn-primary">
                Sign up
              </button> 
                <p style={{marginTop:"10px"}}>
                Already have an acount ?
                  <Link to="/FormLogin" style={{color:"black",textDecoration:"none"}}> login </Link></p>
              </div>
            </form>
              </Col>

              <Col md={6} className="rightside">
                
                <img src={signimg} />
             
              </Col>
            </Row>
            
            
         
    
    </>
   
  );
};

export default FormSignup;