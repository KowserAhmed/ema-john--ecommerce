import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleGoogleSignin, handleSignout, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

function Login() {
  const [signUp, setsignUp] = useState(false)
  const [userInfo, setuserInfo] = useState({
    isLogin: false,
    name: '',
    email: '',
    password: '',
    photoURL: ''
  })
  // use context api from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } }

  const googleSignin = () => {
    handleGoogleSignin()
      .then(res => {
        handleResponse(res , true)
      }
      )
  }
  const signOut = () => {
    handleSignout()
      .then(res => {
       handleResponse(res , false);
      })
  }

const handleResponse=(res , redirect)=>{
  setLoggedInUser(res)
  setuserInfo(res)
  if(redirect){
    history.replace(from);
  }
  

}




  //  for input form
  const handleBlur = (event) => {
    // console.log(event.target.name ,event.target.value);
    // validated email and password
    let isFormValid = true;

    if (event.target.name === 'email') {

      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }

    if (event.target.name === 'password') {
      const validPass = event.target.value.length > 6;
      const hasNumber = /\d{1}/.test(event.target.value)
      isFormValid = validPass && hasNumber

    }

    if (isFormValid) {
      const userValidation = { ...userInfo }
      userValidation[event.target.name] = event.target.value
      setuserInfo(userValidation);
    }

  }
  const handleSubmit = (event) => {
    // user signUp with email password and name
    if (signUp && userInfo.email && userInfo.password) {
      createUserWithEmailAndPassword(userInfo.name , userInfo.email, userInfo.password)
      .then(res=>{
        handleResponse(res , true)

      })

    }
    //  user signIn with email and password
    if (!signUp && userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res=>{
       handleResponse(res , true)

      })
    }
    event.preventDefault();
  }

  return (
    <div className="App">

      {
        userInfo.isLogin ? <button onClick={handleSignout}> Sign out</button> : <button onClick={googleSignin}> Sign in</button>
      }

      {
        userInfo.isLogin && <div>
          <p>Welcome {userInfo.name}</p>
          <p>loggedin with {userInfo.email}</p>
          <img src={userInfo.photoURL} alt="" />
        </div>
      }
      <br></br>
      <h1>Email: {userInfo.email}</h1>
      <h3>name: {userInfo.name}</h3>
      <p>Pass: {userInfo.password}</p>

      {/* sign up and signin option */}

      <input type="checkbox" onClick={() => setsignUp(!signUp)} name='newUser' id='signup' />
      <label htmlFor="signup">SignUp </label>
      <form action="">
        {signUp && <input type="text" onBlur={handleBlur} placeholder='Name' name='name' />
        }
        <br />
        <input type="email" onBlur={handleBlur} name="email" placeholder="Enter Email" required /><br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Enter Password" required /><br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <p>{userInfo.error}</p>
      {
        (userInfo.success) &&
        <p>User {signUp ? 'Create' : 'Login'} account Successfully</p>

      }
    </div>
  );
}

export default Login;
