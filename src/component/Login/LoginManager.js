import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';

export const initializeLoginFramework = () => {
  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
  } 
}
// signin with google

export const handleGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const { displayName, email, photoURL } = res.user;
      const userLogin = {
        isLogin: true,
        name: displayName,
        email: email,
        photoURL: photoURL,
        success:true
      }
      return userLogin;

    })
    .catch(err => console.log(err))
}
// signout as you login with google account
export const handleSignout = () => {
  return firebase.auth().signOut().then(res => {
    const signoutInfo = {
      isLogin: false,
      name: '',
      email: '',
      photoURL: '',
      success: false,
      error: ''

    }
    return signoutInfo;
  })
    .catch(err => console.log(err))
}
export const createUserWithEmailAndPassword = (name ,email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo =res.user
      newUserInfo.error = ''
      newUserInfo.success = true
      updateUserName(name);
      return newUserInfo;

    })
    .catch((error) => {
      const errorMessage = {}
      errorMessage.error = error.message
      errorMessage.success = false
      return errorMessage
    });
}

export const signInWithEmailAndPassword = (email , password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo =res.user
      newUserInfo.error = ''
      newUserInfo.success = true;
      return newUserInfo;

    })
    .catch((error) => {
      const errorMessage = {}
      errorMessage.error = error.message
      errorMessage.success = false
      return errorMessage;
    });
}
const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(() => {
    console.log('user name update successfully');
  }).catch((error) => {
    // An error occurred
    console.log(error);
  });
}