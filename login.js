
import { signInWithEmailAndPassword ,  signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./confiq.js";
const provider = new GoogleAuthProvider()

let password = document.querySelector("#password")
let email = document.querySelector("#email")
let form = document.querySelector("#form")
let btn = document.querySelector("#btn")

form.addEventListener("submit" , (e)=>{
    e.preventDefault()
    console.log(password.value);
    console.log(email.value);
    

signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
   const user = userCredential.user;
   window.location = "home.html"
    console.log(user);

    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
    email.value = "";
    password.value = ""
    
})

btn.addEventListener("click" , ()=>{
  
    signInWithPopup(auth, provider)
    .then((result) => {
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user);
      
    
    }).catch((error) => {
     
 
      const errorMessage = error.message;
      console.log(errorMessage);
      
   
    });


})