import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "./confiq.js";

let password = document.querySelector("#password");
let email = document.querySelector("#email");
let form = document.querySelector("#form");
let userProfilePicUrl = "";

let myWidget = cloudinary.createUploadWidget({
  cloudName: 'doaxl2ygz',
  uploadPreset: 'bloging-app'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('Done! Here is the image info: ', result.info);
    userProfilePicUrl = result.info.secure_url;
    console.log("Profile Image URL:", userProfilePicUrl); // Debugging
  }
});

document.getElementById("upload_widget").addEventListener("click", function (e) {
  e.preventDefault();
  myWidget.open();
}, false);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log("User created:", user);

    // Save user data to Firestore
    const docRef = await addDoc(collection(db, "users"), {
      email: email.value,
      password: password.value, // Note: Storing passwords in Firestore is not recommended
      profileImage: userProfilePicUrl,
      uid: user.uid,
    });
    console.log("Document written with ID: ", docRef.id);

    // Clear form fields
    email.value = "";
    password.value = "";
    userProfilePicUrl = "";

    alert("Registration successful!");
    window.location = "index.html"; // Redirect after successful registration
  } catch (error) {
    console.error("Error during registration: ", error.message);
    alert("Error during registration: " + error.message);
  }
});
  
    


