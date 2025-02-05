
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./confiq.js";


let password = document.querySelector("#password")
let email = document.querySelector("#email")
let form = document.querySelector("#form")

form.addEventListener("submit" , (e)=>{
    e.preventDefault()
    console.log(password.value);
    console.log(email.value);
    
   

createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log(user);
    window.location = "index.html"
    
   
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    console.log(errorMessage);
    
  
  });
    email.value = "";
    password.value = ""
    
})