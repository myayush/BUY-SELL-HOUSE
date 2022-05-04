import {useState} from 'react'
import { toast } from 'react-toastify'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
function SignIn() {
  const [formData,setFormData]= useState({
    email: '',
    password: ''
})


const {email,password} = formData
const navigate= useNavigate()

const onChange = (e) => {
  setFormData((prevState)=>(
    {
      ...prevState,
      [e.target.id]: e.target.value,
    }
  ))
}

const onSubmit = async () => { 
  try {
    const  auth = getAuth()
  const userCredential = await signInWithEmailAndPassword(auth,email,password)
    
  if(userCredential.user){navigate('/')}
    
  } catch (error) {
   toast.error('Wrong user credentials')
  } 
}

  return (
    <>
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back!</p>
      </header>

        <input type="email" className="emailInput" placeholder="Email" id="email" 
        onChange={onChange}/>

        <div className="passwordInputDiv">
          <input type ='text'
          className ="passwordInput" placeholder='password' id="password"
          onChange={onChange} />
        </div>
        <div className="signInBar">
          <p className="signInText">
            Sign In
          </p>
          <button className="signInButton" onClick={onSubmit}>
          </button>
        </div>
        <div className='ga'>
        <OAuth/>
        <Link to= '/sign-up' className='registerLink'>
            Sign Up Instead
        </Link>
        </div> 
    </div> 
    </>
  )
}
export default SignIn;
