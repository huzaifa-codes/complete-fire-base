import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./confiq.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// collection, getDocs, query, where 
const loginBtn = document.querySelector('#login-btn');
const loginUser = document.querySelector('#login-user');
const userName = document.querySelector('#user-profile-name');
const userProfileImage = document.querySelector('#user-profile-img');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log("Authenticated User UID:", uid);

        try {
            let userData = await getDataFromFirestore(uid);
            console.log("User Data from Firestore:", userData);

            if (userData) {
                loginBtn.classList.add('d-none');
                loginUser.classList.remove('d-none');
            
                userProfileImage.src = userData.profileImage || "default-image-url";
            } else {
                console.log("No user data found in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        window.location = "index.html";
    }
});

async function getDataFromFirestore(uid) {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        let user = null;
        querySnapshot.forEach((doc) => {
            user = doc.data();
        });

        return user;

    } catch (error) {
        console.error("Error in getDataFromFirestore:", error);
        
    }
}