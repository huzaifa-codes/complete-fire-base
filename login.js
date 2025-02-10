import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./confiq.js"; 

let password = document.querySelector("#password");
let email = document.querySelector("#email");
let form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Trim input values to remove any extra spaces
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    // Basic validation
    if (!emailValue || !passwordValue) {
        alert("Please fill in all fields.");
        return;
    }

    // Sign in with Firebase
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            window.location.href = "home.html"; // Redirect to home page
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error signing in:", errorMessage);
            alert("Error signing in: " + errorMessage); // Show error message to the user
        });

    // Clear input fields
    email.value = "";
    password.value = "";
});
// btn.addEventListener("click" , ()=>{
  
//     signInWithPopup(auth, provider)
//     .then((result) => {
      
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//      console.log(credential);
     

//       const user = result.user;
//       console.log(user);
      
    
//     }).catch((error) => {
     
 
//       const errorMessage = error.message;
//       console.log(errorMessage);
      
   
//     });


// })